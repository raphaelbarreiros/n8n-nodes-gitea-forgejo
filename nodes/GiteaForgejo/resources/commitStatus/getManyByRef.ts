import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCommitStatusGetManyByRef = {
	operation: ['getManyByRef'],
	resource: ['commitStatus'],
};

export const commitStatusGetManyByRefDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForCommitStatusGetManyByRef,
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
		displayName: 'Reference',
		name: 'reference',
		type: 'string',
		required: true,
		default: '',
		description: 'Branch, tag, or commit reference',
		displayOptions: {
			show: showOnlyForCommitStatusGetManyByRef,
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				...showOnlyForCommitStatusGetManyByRef,
				returnAll: [false],
			},
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
			show: {
				...showOnlyForCommitStatusGetManyByRef,
				returnAll: [false],
			},
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
			show: showOnlyForCommitStatusGetManyByRef,
		},
		default: {},
		options: [
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'string',
				default: '',
				description: 'Sort order accepted by API (for example oldest or recentupdate)',
				routing: {
					request: {
						qs: {
							sort: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				options: [
					{
						name: 'All',
						value: '',
					},
					{
						name: 'Error',
						value: 'error',
					},
					{
						name: 'Failure',
						value: 'failure',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Success',
						value: 'success',
					},
					{
						name: 'Warning',
						value: 'warning',
					},
				],
				default: '',
				description: 'Filter statuses by state',
				routing: {
					request: {
						qs: {
							state: '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
];
