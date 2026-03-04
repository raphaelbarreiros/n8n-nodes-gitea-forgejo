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

type OrganizationSearchItem = {
	name: string;
	username?: string;
	full_name?: string;
	website?: string;
};

export async function getOwners(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const page = paginationToken ? Number(paginationToken) : 1;
	const limit = 100;

	const userQs: IDataObject = { page, limit };

	if (filter) {
		userQs.q = filter;
	}

	const [userResponse, organizationResponse] = await Promise.all([
		giteaApiRequest.call(this, 'GET', '/users/search', userQs) as Promise<UserSearchResponse>,
		giteaApiRequest.call(this, 'GET', '/orgs', { page, limit }) as Promise<
			OrganizationSearchItem[]
		>,
	]);

	const users = userResponse.data ?? [];
	const filterValue = filter?.trim().toLowerCase();

	const organizations = (organizationResponse ?? []).filter((organization) => {
		if (!filterValue) {
			return true;
		}

		const terms = [organization.name, organization.username, organization.full_name].filter(
			(term): term is string => Boolean(term),
		);

		return terms.some((term) => term.toLowerCase().includes(filterValue));
	});

	const results: INodeListSearchItems[] = [
		...users.map((user) => ({
			name: `${user.login} (User)`,
			value: user.login,
			url: user.html_url,
		})),
		...organizations.map((organization) => {
			const ownerName = organization.username || organization.name;
			const details = organization.full_name?.trim();

			return {
				name: details ? `${ownerName} - ${details} (Organization)` : `${ownerName} (Organization)`,
				value: ownerName,
				url: organization.website,
			};
		}),
	];

	const seen = new Set<string>();
	const uniqueResults = results.filter((item) => {
		const key = String(item.value);

		if (seen.has(key)) {
			return false;
		}

		seen.add(key);
		return true;
	});

	const nextPaginationToken =
		users.length === limit || (organizationResponse ?? []).length === limit
			? String(page + 1)
			: undefined;

	return { results: uniqueResults, paginationToken: nextPaginationToken };
}
