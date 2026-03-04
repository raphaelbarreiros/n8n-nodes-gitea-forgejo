import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { giteaApiRequest } from '../shared/transport';

type UserSearchItem = {
	login: string;
	html_url: string;
};

type UserSearchResponse = {
	data: UserSearchItem[];
	ok: boolean;
};

export async function getUsers(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? Number(paginationToken) : 1;
	const limit = 100;
	const qs: IDataObject = { page, limit };

	if (filter) {
		qs.q = filter;
	}

	const response = (await giteaApiRequest.call(this, 'GET', '/users/search', qs)) as UserSearchResponse;
	const users = response.data ?? [];

	const results: INodeListSearchItems[] = users.map((item) => ({
		name: item.login,
		value: item.login,
		url: item.html_url,
	}));

	const nextPaginationToken = users.length === limit ? String(page + 1) : undefined;

	return { results, paginationToken: nextPaginationToken };
}
