import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { giteaApiRequest } from '../shared/transport';

type IssueSearchItem = {
	number: number;
	title: string;
	html_url: string;
};

export async function getIssues(
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

	if (filter) {
		qs.q = filter;
	}

	const response = (await giteaApiRequest.call(
		this,
		'GET',
		`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/issues`,
		qs,
	)) as IssueSearchItem[];

	const results: INodeListSearchItems[] = (response ?? []).map((item) => ({
		name: `#${item.number} ${item.title}`,
		value: item.number,
		url: item.html_url,
	}));

	const nextPaginationToken = response.length === limit ? String(page + 1) : undefined;

	return { results, paginationToken: nextPaginationToken };
}
