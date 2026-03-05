import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookGetMany = {
	operation: ['getAll'],
	resource: ['webhook'],
};

export const webhookGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForWebhookGetMany,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
				type: 'query',
				property: 'limit',
				value: '100',
			},
			operations: {
				pagination: {
					type: 'generic',
					properties: {
						continue: '={{ Array.isArray($response.body) && $response.body.length === 100 }}',
						request: {
							qs: {
								page: '={{ Number($request.qs.page ?? 1) + 1 }}',
							},
						},
					},
				},
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForWebhookGetMany,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
			output: {
				maxResults: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForWebhookGetMany,
		},
		default: 1,
		description: 'Page number of results to return (1-based)',
		routing: {
			send: {
				type: 'query',
				property: 'page',
			},
		},
	},
];
