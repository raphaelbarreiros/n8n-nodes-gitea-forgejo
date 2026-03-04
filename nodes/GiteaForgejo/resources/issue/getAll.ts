import type { INodeProperties } from 'n8n-workflow';

const showOnlyForIssueGetMany = {
	operation: ['getAll'],
	resource: ['issue'],
};

export const issueGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForIssueGetMany,
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
				...showOnlyForIssueGetMany,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
			output: {
				maxResults: '={{$value}}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForIssueGetMany,
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
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForIssueGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Search',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Search string',
				routing: {
					request: {
						qs: {
							q: '={{$value || undefined}}',
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
						name: 'Open',
						value: 'open',
					},
					{
						name: 'Closed',
						value: 'closed',
					},
					{
						name: 'All',
						value: 'all',
					},
				],
				default: 'open',
				description: 'Issue state to filter on',
				routing: {
					request: {
						qs: {
							state: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Any',
						value: '',
					},
					{
						name: 'Issues',
						value: 'issues',
					},
					{
						name: 'Pull Requests',
						value: 'pulls',
					},
				],
				default: '',
				description: 'Filter by issue type',
				routing: {
					request: {
						qs: {
							type: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Updated Before',
				name: 'before',
				type: 'dateTime',
				default: '',
				description: 'Only show issues updated before this time',
				routing: {
					request: {
						qs: {
							before: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Updated Since',
				name: 'since',
				type: 'dateTime',
				default: '',
				description: 'Only show issues updated at or after this time',
				routing: {
					request: {
						qs: {
							since: '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
];
