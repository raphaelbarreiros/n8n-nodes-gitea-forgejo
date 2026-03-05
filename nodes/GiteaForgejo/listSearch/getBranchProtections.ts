import type {
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { giteaApiRequest } from '../shared/transport';

type BranchProtectionSearchItem = {
	name?: string;
	rule_name?: string;
	branch_name?: string;
};

export async function getBranchProtections(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	const owner = this.getCurrentNodeParameter('owner', { extractValue: true }) as string;
	const repository = this.getCurrentNodeParameter('repository', { extractValue: true }) as string;

	if (!owner || !repository) {
		return { results: [] };
	}

	const response = (await giteaApiRequest.call(
		this,
		'GET',
		`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/branch_protections`,
	)) as BranchProtectionSearchItem[];

	const normalizedFilter = filter?.trim().toLowerCase();

	const results: INodeListSearchItems[] = (response ?? [])
		.map((item) => {
			const value = item.rule_name || item.name || item.branch_name || '';
			return {
				name: value,
				value,
			};
		})
		.filter((item) => item.value)
		.filter((item) => !normalizedFilter || item.name.toLowerCase().includes(normalizedFilter));

	return { results };
}
