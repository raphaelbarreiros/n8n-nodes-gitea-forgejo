import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';
import { giteaApiRequest } from '../shared/transport';

type WebhookSearchItem = {
	id: number;
	type?: string;
	config?: {
		url?: string;
	};
};

export async function getWebhooks(
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
		`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/hooks`,
		qs,
	)) as WebhookSearchItem[];

	const normalizedFilter = filter?.trim().toLowerCase();
	const filtered = normalizedFilter
		? (response ?? []).filter((item) => {
				const typeValue = item.type?.toLowerCase() ?? '';
				const urlValue = item.config?.url?.toLowerCase() ?? '';
				return typeValue.includes(normalizedFilter) || urlValue.includes(normalizedFilter);
			})
		: response;

	const results: INodeListSearchItems[] = (filtered ?? []).map((item) => ({
		name: `${item.type || 'webhook'} (#${item.id})`,
		value: item.id,
		url: item.config?.url,
	}));

	const nextPaginationToken = (response ?? []).length === limit ? String(page + 1) : undefined;

	return { results, paginationToken: nextPaginationToken };
}
