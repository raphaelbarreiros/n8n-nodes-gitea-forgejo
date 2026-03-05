import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRepositoryKeyGetMany = {
	operation: ['getAll'],
	resource: ['repositoryKey'],
};

export const repositoryKeyGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryKeyGetMany,
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
				...showOnlyForRepositoryKeyGetMany,
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
			show: showOnlyForRepositoryKeyGetMany,
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
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		displayOptions: {
			show: showOnlyForRepositoryKeyGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Fingerprint',
				name: 'fingerprint',
				type: 'string',
				default: '',
				description: 'Filter keys by fingerprint',
				routing: {
					request: {
						qs: {
							fingerprint: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Key ID',
				name: 'keyId',
				type: 'number',
				default: 0,
				description: 'Filter by repository key ID',
				routing: {
					request: {
						qs: {
							key_id: '={{$value > 0 ? $value : undefined}}',
						},
					},
				},
			},
		],
	},
];
