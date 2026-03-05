import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPullRequestGetMany = {
	operation: ['getAll'],
	resource: ['pullRequest'],
};

export const pullRequestGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForPullRequestGetMany,
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
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				...showOnlyForPullRequestGetMany,
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
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				...showOnlyForPullRequestGetMany,
				returnAll: [false],
			},
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
		default: {},
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForPullRequestGetMany,
		},
		options: [
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'string',
				placeholder: '1,2,3',
				default: '',
				description: 'Comma-separated label IDs',
				routing: {
					request: {
						qs: {
							labels:
								'={{$value ? $value.split(",").map((entry) => Number(entry.trim())).filter((entry) => Number.isFinite(entry)) : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Milestone ID',
				name: 'milestone',
				type: 'number',
				default: 0,
				description: 'Include only pull requests attached to this milestone ID',
				routing: {
					request: {
						qs: {
							milestone: '={{$value > 0 ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Poster',
				name: 'poster',
				type: 'string',
				placeholder: 'Username',
				default: '',
				description: 'Filter pulls by author username',
				routing: {
					request: {
						qs: {
							poster: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Least Comments', value: 'leastcomment' },
					{ name: 'Least Recently Updated', value: 'leastupdate' },
					{ name: 'Most Comments', value: 'mostcomment' },
					{ name: 'Oldest', value: 'oldest' },
					{ name: 'Priority', value: 'priority' },
					{ name: 'Recently Closed', value: 'recentclose' },
					{ name: 'Recently Updated', value: 'recentupdate' },
				],
				default: 'recentupdate',
				description: 'Sort pull requests by this criteria',
				routing: {
					request: {
						qs: {
							sort: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				options: [
					{ name: 'Open', value: 'open' },
					{ name: 'Closed', value: 'closed' },
					{ name: 'All', value: 'all' },
				],
				default: 'open',
				description: 'Filter pull requests by state',
				routing: {
					request: {
						qs: {
							state: '={{$value}}',
						},
					},
				},
			},
		],
	},
];
