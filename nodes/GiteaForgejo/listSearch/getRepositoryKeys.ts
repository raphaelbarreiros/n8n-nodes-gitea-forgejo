import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { giteaApiRequest } from '../shared/transport';

type RepositoryKeySearchItem = {
	id: number;
	title: string;
	key: string;
	url?: string;
};

export async function getRepositoryKeys(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const owner = this.getCurrentNodeParameter('owner', { extractValue: true }) as string;
	const repository = this.getCurrentNodeParameter('repository', { extractValue: true }) as string;

	if (!owner || !repository) {
		return { results: [] };
	}

	const page = paginationToken ? Number(paginationToken) : 1;
	const limit = 100;
	const qs: IDataObject = {
		page,
		limit,
	};

	const response = (await giteaApiRequest.call(
		this,
		'GET',
		`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/keys`,
		qs,
	)) as RepositoryKeySearchItem[];

	const normalizedFilter = filter?.trim().toLowerCase();
	const filtered = normalizedFilter
		? (response ?? []).filter(
				(item) =>
					item.title.toLowerCase().includes(normalizedFilter) ||
					item.key.toLowerCase().includes(normalizedFilter),
			)
		: response;

	const results: INodeListSearchItems[] = (filtered ?? []).map((item) => ({
		name: `${item.title} (#${item.id})`,
		value: item.id,
		url: item.url,
	}));

	const nextPaginationToken = response.length === limit ? String(page + 1) : undefined;

	return { results, paginationToken: nextPaginationToken };
}
