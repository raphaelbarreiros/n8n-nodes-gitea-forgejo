import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { giteaApiRequest } from '../shared/transport';

type RepositorySearchItem = {
	name: string;
	full_name: string;
	html_url: string;
};

export async function getRepositories(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const owner = this.getCurrentNodeParameter('owner', { extractValue: true }) as string;

	if (!owner) {
		return { results: [] };
	}

	const page = paginationToken ? Number(paginationToken) : 1;
	const limit = 100;
	const qs: IDataObject = { page, limit };

	let response: RepositorySearchItem[] = [];

	try {
		response = (await giteaApiRequest.call(
			this,
			'GET',
			`/users/${encodeURIComponent(owner)}/repos`,
			qs,
		)) as RepositorySearchItem[];
	} catch {
		try {
			response = (await giteaApiRequest.call(
				this,
				'GET',
				`/orgs/${encodeURIComponent(owner)}/repos`,
				qs,
			)) as RepositorySearchItem[];
		} catch {
			// ignore errors and return an empty list
		}
	}

	const filterValue = filter?.trim().toLowerCase();
	const repositories = (response ?? []).filter((item) => {
		if (!filterValue) {
			return true;
		}

		return (
			item.name.toLowerCase().includes(filterValue) ||
			item.full_name.toLowerCase().includes(filterValue)
		);
	});

	const results: INodeListSearchItems[] = repositories.map((item) => ({
		name: item.full_name,
		value: item.name,
		url: item.html_url,
	}));

	const nextPaginationToken = response.length === limit ? String(page + 1) : undefined;

	return { results, paginationToken: nextPaginationToken };
}
