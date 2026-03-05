/**
 * verify_routing.mjs — v3
 * Cross-checks getOperations.ts <-> method routing <-> URL routing.
 * Uses brace-counting to find block boundaries (indentation-agnostic).
 */
import { readFileSync } from 'fs';

const opsFile = readFileSync('./nodes/GiteaForgejo/loadOptions/getOperations.ts', 'utf-8');
const nodeFile = readFileSync('./nodes/GiteaForgejo/GiteaForgejo.node.ts', 'utf-8');

// ── helpers ───────────────────────────────────────────────────────────────────

/** Given a string and the index of an opening '{', find the matching closing '}' index. */
function matchingClose(str, openIdx) {
	let depth = 0;
	for (let i = openIdx; i < str.length; i++) {
		if (str[i] === '{') depth++;
		else if (str[i] === '}') {
			depth--;
			if (depth === 0) return i;
		}
	}
	return -1;
}

/**
 * Given a block that is an object literal body (content between outer { }),
 * extract top-level keys and their own sub-object bodies.
 * Returns Map<key, bodyString>
 */
function extractTopLevelKeys(block) {
	const result = new Map();
	// Match key: { ... } pairs at top level (brace-balanced)
	const keyRe = /(\w+)\s*:\s*\{/g;
	let m;
	while ((m = keyRe.exec(block)) !== null) {
		const key = m[1];
		const openIdx = m.index + m[0].length - 1; // index of the '{'
		// Check depth at this point - only top-level keys have depth 0 before this '{'
		let depth = 0;
		for (let i = 0; i < m.index; i++) {
			if (block[i] === '{') depth++;
			else if (block[i] === '}') depth--;
		}
		if (depth === 0) {
			const closeIdx = matchingClose(block, openIdx);
			if (closeIdx !== -1) {
				result.set(key, block.slice(openIdx + 1, closeIdx));
			}
		}
	}
	return result;
}

// ── 1. Parse getOperations.ts ─────────────────────────────────────────────────
// Structure: const operationsByResource: Record<...> = { resource: [...], ... }
const declaredOps = {};

// Find the outer object: `= {` after `operationsByResource`
const opsObjStart = opsFile.indexOf('const operationsByResource');
const opsObjOpenBrace = opsFile.indexOf('{', opsObjStart);
const opsObjCloseBrace = matchingClose(opsFile, opsObjOpenBrace);
const opsObjBody = opsFile.slice(opsObjOpenBrace + 1, opsObjCloseBrace);

// Extract each resource: [...] section (arrays, not objects)
const resArrayRe = /^\t(\w+):\s*\[/gm;
const resArrayMatches = [...opsObjBody.matchAll(resArrayRe)];
for (let i = 0; i < resArrayMatches.length; i++) {
	const resource = resArrayMatches[i][1];
	const start = resArrayMatches[i].index;
	const end = i + 1 < resArrayMatches.length ? resArrayMatches[i + 1].index : opsObjBody.length;
	const block = opsObjBody.slice(start, end);
	declaredOps[resource] = new Set();
	const valRe = /value:\s*['"](\w+)['"]/g;
	let vm;
	while ((vm = valRe.exec(block)) !== null) {
		declaredOps[resource].add(vm[1]);
	}
}

// ── 2. Parse method routing table ────────────────────────────────────────────
const methodOps = {};
const methodExprStart = nodeFile.indexOf('const operationRequestMethodExpression');
const methodExprEnd = nodeFile.indexOf('}[$parameter.resource] ?? {})[$value]', methodExprStart);
// The outer object starts after `({`
const methodObjOpen = nodeFile.indexOf('({', methodExprStart) + 1; // index of the `{`
const methodObjBody = nodeFile.slice(methodObjOpen + 1, methodExprEnd);
const methodResources = extractTopLevelKeys(methodObjBody);

for (const [res, body] of methodResources) {
	methodOps[res] = new Set();
	const opRe = /(\w+)\s*:\s*'(?:GET|POST|PUT|PATCH|DELETE)'/g;
	let om;
	while ((om = opRe.exec(body)) !== null) {
		methodOps[res].add(om[1]);
	}
}

// ── 3. Parse URL routing table ───────────────────────────────────────────────
const urlOps = {};
const urlExprStart = nodeFile.indexOf('const operationRequestUrlExpression');
const urlExprEnd = nodeFile.indexOf('}[$parameter.resource] ?? {})[$value]', urlExprStart);
const urlObjOpen = nodeFile.indexOf('({', urlExprStart) + 1;
const urlObjBody = nodeFile.slice(urlObjOpen + 1, urlExprEnd);
const urlResources = extractTopLevelKeys(urlObjBody);

for (const [res, body] of urlResources) {
	urlOps[res] = new Set();
	// op keys: word followed by ': ' then a string/concatenation/expression
	// Values can start with: quote, backtick, slash, or $parameter (ternary expressions)
	const opRe = /(\w+)\s*:\s*(?:['`/]|\$parameter)/g;
	let om;
	while ((om = opRe.exec(body)) !== null) {
		urlOps[res].add(om[1]);
	}
}

// ── 4. Compare ────────────────────────────────────────────────────────────────
let errors = 0;
let warnings = 0;

const allResources = new Set([
	...Object.keys(declaredOps),
	...Object.keys(methodOps),
	...Object.keys(urlOps),
]);

for (const res of [...allResources].sort()) {
	const declared = declaredOps[res] ?? new Set();
	const method = methodOps[res] ?? new Set();
	const url = urlOps[res] ?? new Set();

	// declared but missing from routing → BREAKS at runtime
	for (const op of [...declared].sort()) {
		if (!method.has(op)) {
			console.error(`❌ [${res}.${op}] declared in getOperations but MISSING from METHOD routing`);
			errors++;
		}
		if (!url.has(op)) {
			console.error(`❌ [${res}.${op}] declared in getOperations but MISSING from URL routing`);
			errors++;
		}
	}

	// in routing but not declared → stale entries
	for (const op of [...method].sort()) {
		if (!declared.has(op)) {
			console.warn(`⚠️  [${res}.${op}] in method routing but NOT in getOperations (stale)`);
			warnings++;
		}
	}
}

// ── 5. Summary ────────────────────────────────────────────────────────────────
console.log('\n── Per-resource operation counts ──────────────────────────────────');
for (const res of [...allResources].sort()) {
	const d = (declaredOps[res] ?? new Set()).size;
	const m = (methodOps[res] ?? new Set()).size;
	const u = (urlOps[res] ?? new Set()).size;
	const ok = d === m && d === u ? '✅' : '❌';
	console.log(
		`${ok} ${res.padEnd(22)} declared=${String(d).padStart(3)}  method=${String(m).padStart(3)}  url=${String(u).padStart(3)}`,
	);
}

const totalDeclared = [...Object.values(declaredOps)].reduce((a, s) => a + s.size, 0);
console.log(`\nResources: ${allResources.size}  |  Total declared ops: ${totalDeclared}`);

if (errors === 0) {
	console.log('✅ No routing gaps — every declared operation has method + URL entries.');
} else {
	console.error(`❌ ${errors} routing gap(s) found — will BREAK at runtime`);
}
if (warnings > 0) {
	console.warn(`⚠️  ${warnings} stale routing entry(s) not in getOperations (harmless)`);
}
process.exit(errors > 0 ? 1 : 0);
