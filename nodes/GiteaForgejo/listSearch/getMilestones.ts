import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { giteaApiRequest } from '../shared/transport';

type MilestoneSearchItem = {
	id: number;
	title: string;
	html_url?: string;
};

export async function getMilestones(
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
		state: 'all',
	};

	const response = (await giteaApiRequest.call(
		this,
		'GET',
		`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/milestones`,
		qs,
	)) as MilestoneSearchItem[];

	const normalizedFilter = filter?.trim().toLowerCase();
	const filtered = normalizedFilter
		? (response ?? []).filter((item) => item.title.toLowerCase().includes(normalizedFilter))
		: response;

	const results: INodeListSearchItems[] = (filtered ?? []).map((item) => ({
		name: `${item.title} (#${item.id})`,
		value: item.id,
		url: item.html_url,
	}));

	const nextPaginationToken = response.length === limit ? String(page + 1) : undefined;

	return { results, paginationToken: nextPaginationToken };
}
