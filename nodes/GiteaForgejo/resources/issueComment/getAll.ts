import type { INodeProperties } from 'n8n-workflow';

const showOnlyForIssueCommentGetMany = {
	operation: ['getAll'],
	resource: ['issueComment'],
};

export const issueCommentGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForIssueCommentGetMany,
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
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				...showOnlyForIssueCommentGetMany,
				returnAll: [false],
			},
		},
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
		default: 1,
		displayOptions: {
			show: showOnlyForIssueCommentGetMany,
		},
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
			show: showOnlyForIssueCommentGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Updated Before',
				name: 'before',
				type: 'dateTime',
				default: '',
				description: 'Only show comments updated before this time',
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
				description: 'Only show comments updated at or after this time',
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
