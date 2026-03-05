import type { INodeProperties } from 'n8n-workflow';
import { issueSelect } from '../../shared/descriptions';

const showOnlyForIssueByNumber = {
	operation: [
		'addBlock',
		'addDependency',
		'addReaction',
		'addSubscription',
		'addTime',
		'checkSubscription',
		'createAttachment',
		'deleteBlock',
		'deleteDependency',
		'delete',
		'deleteAttachment',
		'deleteReaction',
		'deleteStopwatch',
		'deleteSubscription',
		'deleteTime',
		'getAttachment',
		'getAttachments',
		'getBlocks',
		'getDependencies',
		'getReactions',
		'getSubscriptions',
		'getTimeline',
		'getTimes',
		'movePin',
		'pin',
		'resetTime',
		'startStopwatch',
		'stopStopwatch',
		'unpin',
		'update',
		'updateAttachment',
		'updateDeadline',
	],
	resource: ['issue'],
};

const showOnlyForIssueGetDependencies = {
	operation: ['getDependencies'],
	resource: ['issue'],
};

const showOnlyForIssueGetBlocks = {
	operation: ['getBlocks'],
	resource: ['issue'],
};

const showOnlyForIssueGetReactions = {
	operation: ['getReactions'],
	resource: ['issue'],
};

const showOnlyForIssueAttachmentById = {
	operation: ['deleteAttachment', 'getAttachment', 'updateAttachment'],
	resource: ['issue'],
};

const showOnlyForIssueCreateAttachment = {
	operation: ['createAttachment'],
	resource: ['issue'],
};

const showOnlyForIssueAttachmentUpdate = {
	operation: ['updateAttachment'],
	resource: ['issue'],
};

const showOnlyForIssueGetSubscriptions = {
	operation: ['getSubscriptions'],
	resource: ['issue'],
};

const showOnlyForIssueDependencyMutation = {
	operation: ['addBlock', 'addDependency', 'deleteBlock', 'deleteDependency'],
	resource: ['issue'],
};

const showOnlyForIssueReactionMutation = {
	operation: ['addReaction', 'deleteReaction'],
	resource: ['issue'],
};

const showOnlyForIssueSubscriptionMutation = {
	operation: ['addSubscription', 'deleteSubscription'],
	resource: ['issue'],
};

const showOnlyForIssueAddTime = {
	operation: ['addTime'],
	resource: ['issue'],
};

const showOnlyForIssueDeleteTime = {
	operation: ['deleteTime'],
	resource: ['issue'],
};

const showOnlyForIssueGetTimeline = {
	operation: ['getTimeline'],
	resource: ['issue'],
};

const showOnlyForIssueGetTimes = {
	operation: ['getTimes'],
	resource: ['issue'],
};

const showOnlyForIssueSearch = {
	operation: ['search'],
	resource: ['issue'],
};

const showOnlyForIssueMovePin = {
	operation: ['movePin'],
	resource: ['issue'],
};

const showOnlyForIssueUpdate = {
	operation: ['update'],
	resource: ['issue'],
};

const showOnlyForIssueUpdateDeadline = {
	operation: ['updateDeadline'],
	resource: ['issue'],
};

export const issueExtraDescription: INodeProperties[] = [
	{
		...issueSelect,
		displayOptions: {
			show: showOnlyForIssueByNumber,
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAllIssueSearch',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForIssueSearch,
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
		name: 'limitIssueSearch',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		displayOptions: {
			show: {
				...showOnlyForIssueSearch,
				returnAllIssueSearch: [false],
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
		name: 'pageIssueSearch',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForIssueSearch,
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
		displayName: 'Search Filters',
		name: 'issueSearchFilters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		default: {},
		displayOptions: {
			show: showOnlyForIssueSearch,
		},
		options: [
			{
				displayName: 'Assigned To Me',
				name: 'assigned',
				type: 'boolean',
				default: false,
				description: 'Whether to only return issues assigned to the authenticated user',
				routing: {
					request: {
						qs: {
							assigned: '={{$value ? true : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Created By Me',
				name: 'created',
				type: 'boolean',
				default: false,
				description: 'Whether to only return issues created by the authenticated user',
				routing: {
					request: {
						qs: {
							created: '={{$value ? true : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'string',
				default: '',
				placeholder: 'label-a,label-b',
				description: 'Comma-separated label names',
				routing: {
					request: {
						qs: {
							labels: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Mentioning Me',
				name: 'mentioned',
				type: 'boolean',
				default: false,
				description: 'Whether to only return issues mentioning the authenticated user',
				routing: {
					request: {
						qs: {
							mentioned: '={{$value ? true : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Milestones',
				name: 'milestones',
				type: 'string',
				default: '',
				placeholder: 'v1.0,v1.1',
				description: 'Comma-separated milestone names',
				routing: {
					request: {
						qs: {
							milestones: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Owner',
				name: 'owner',
				type: 'string',
				default: '',
				description: 'Filter by repository owner',
				routing: {
					request: {
						qs: {
							owner: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Priority Repository ID',
				name: 'priorityRepoId',
				type: 'number',
				default: 0,
				description: 'Repository ID to prioritize in results',
				routing: {
					request: {
						qs: {
							priority_repo_id: '={{$value > 0 ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Review Requested',
				name: 'reviewRequested',
				type: 'boolean',
				default: false,
				description: 'Whether to only return pull requests requesting your review',
				routing: {
					request: {
						qs: {
							review_requested: '={{$value ? true : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Reviewed By Me',
				name: 'reviewed',
				type: 'boolean',
				default: false,
				description: 'Whether to only return pull requests reviewed by the authenticated user',
				routing: {
					request: {
						qs: {
							reviewed: '={{$value ? true : undefined}}',
						},
					},
				},
			},
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
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				default: 'latest',
				options: [
					{ name: 'Far Due Date', value: 'farduedate' },
					{ name: 'Latest', value: 'latest' },
					{ name: 'Least Comments', value: 'leastcomment' },
					{ name: 'Least Recently Updated', value: 'leastupdate' },
					{ name: 'Most Comments', value: 'mostcomment' },
					{ name: 'Near Due Date', value: 'nearduedate' },
					{ name: 'Oldest', value: 'oldest' },
					{ name: 'Recently Updated', value: 'recentupdate' },
					{ name: 'Relevance', value: 'relevance' },
				],
				description: 'Sort mode',
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
				default: 'open',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Closed', value: 'closed' },
					{ name: 'Open', value: 'open' },
				],
				description: 'Issue state to search for',
				routing: {
					request: {
						qs: {
							state: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Team',
				name: 'team',
				type: 'string',
				default: '',
				description: 'Filter by team (requires owner filter to be an organization)',
				routing: {
					request: {
						qs: {
							team: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: '',
				options: [
					{ name: 'Any', value: '' },
					{ name: 'Issues', value: 'issues' },
					{ name: 'Pull Requests', value: 'pulls' },
				],
				description: 'Issue type to search for',
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
				description: 'Only include issues updated before this time',
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
				description: 'Only include issues updated after this time',
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
	{
		displayName: 'Return All',
		name: 'returnAllIssueBlocks',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForIssueGetBlocks,
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
		name: 'limitIssueBlocks',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				...showOnlyForIssueGetBlocks,
				returnAllIssueBlocks: [false],
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
		name: 'pageIssueBlocks',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForIssueGetBlocks,
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
		displayName: 'Return All',
		name: 'returnAllIssueDependencies',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForIssueGetDependencies,
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
		name: 'limitIssueDependencies',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				...showOnlyForIssueGetDependencies,
				returnAllIssueDependencies: [false],
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
		name: 'pageIssueDependencies',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForIssueGetDependencies,
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
		displayName: 'Return All',
		name: 'returnAllIssueSubscriptions',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForIssueGetSubscriptions,
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
		name: 'limitIssueSubscriptions',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				...showOnlyForIssueGetSubscriptions,
				returnAllIssueSubscriptions: [false],
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
		name: 'pageIssueSubscriptions',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForIssueGetSubscriptions,
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
		displayName: 'Return All',
		name: 'returnAllIssueReactions',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForIssueGetReactions,
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
		name: 'limitIssueReactions',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				...showOnlyForIssueGetReactions,
				returnAllIssueReactions: [false],
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
		name: 'pageIssueReactions',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForIssueGetReactions,
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
		displayName: 'Dependency Issue Index',
		name: 'dependencyIssueIndex',
		type: 'number',
		required: true,
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForIssueDependencyMutation,
		},
		description:
			'Issue number of the related issue to block, unblock, add dependency, or remove dependency',
		routing: {
			send: {
				type: 'body',
				property: 'index',
			},
		},
	},
	{
		displayName: 'Dependency Owner',
		name: 'dependencyIssueOwner',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueDependencyMutation,
		},
		description: 'Owner of the related issue (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'owner',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Dependency Repository',
		name: 'dependencyIssueRepo',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueDependencyMutation,
		},
		description: 'Repository of the related issue (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'repo',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Subscription User',
		name: 'issueSubscriptionUser',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForIssueSubscriptionMutation,
		},
		description: 'Username to subscribe or unsubscribe',
	},
	{
		displayName: 'Reaction',
		name: 'issueReactionContent',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForIssueReactionMutation,
		},
		description:
			'Reaction content (for example: +1, -1, laugh, hooray, confused, heart, rocket, eyes)',
		routing: {
			send: {
				type: 'body',
				property: 'content',
			},
		},
	},
	{
		displayName: 'Attachment ID',
		name: 'issueAttachmentId',
		type: 'number',
		required: true,
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForIssueAttachmentById,
		},
		description: 'ID of the issue attachment',
	},
	{
		displayName: 'Attachment Name',
		name: 'issueCreateAttachmentName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueCreateAttachment,
		},
		description: 'Optional display name for the uploaded attachment',
	},
	{
		displayName: 'Updated At',
		name: 'issueCreateAttachmentUpdatedAt',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: showOnlyForIssueCreateAttachment,
		},
		description: 'Optional RFC 3339 timestamp to set as attachment update time',
	},
	{
		displayName: 'Binary Property',
		name: 'issueCreateAttachmentBinaryPropertyName',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: {
			show: showOnlyForIssueCreateAttachment,
		},
		description: 'Name of the binary property containing the file to upload',
	},
	{
		displayName: 'Attachment Name',
		name: 'issueAttachmentName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueAttachmentUpdate,
		},
		description: 'New attachment name (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'name',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Browser Download URL',
		name: 'issueAttachmentBrowserDownloadUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueAttachmentUpdate,
		},
		description: 'External browser download URL (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'browser_download_url',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Time (Seconds)',
		name: 'issueTimeSeconds',
		type: 'number',
		required: true,
		default: 60,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForIssueAddTime,
		},
		description: 'Tracked time in seconds',
		routing: {
			send: {
				type: 'body',
				property: 'time',
			},
		},
	},
	{
		displayName: 'Created At',
		name: 'issueTimeCreatedAt',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: showOnlyForIssueAddTime,
		},
		description: 'Timestamp for the tracked time entry (optional, RFC 3339)',
		routing: {
			send: {
				type: 'body',
				property: 'created',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'User',
		name: 'issueTimeUserName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueAddTime,
		},
		description: 'Username who spent the time (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'user_name',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Time Entry ID',
		name: 'issueTimeId',
		type: 'number',
		required: true,
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForIssueDeleteTime,
		},
		description: 'ID of the tracked time entry to delete',
	},
	{
		displayName: 'Pin Position',
		name: 'issuePinPosition',
		type: 'number',
		required: true,
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForIssueMovePin,
		},
		description: 'New position for the pinned issue',
	},
	{
		displayName: 'Update Options',
		name: 'issueUpdateOptions',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: showOnlyForIssueUpdate,
		},
		description: 'Issue edit payload matching EditIssueOption',
		routing: {
			request: {
				body: '={{Object.keys($value || {}).length ? $value : undefined}}',
			},
		},
	},
	{
		displayName: 'Due Date',
		name: 'issueDeadlineDueDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForIssueUpdateDeadline,
		},
		description: 'Issue deadline (RFC 3339)',
		routing: {
			send: {
				type: 'body',
				property: 'due_date',
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAllIssueTimeline',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForIssueGetTimeline,
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
		name: 'limitIssueTimeline',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				...showOnlyForIssueGetTimeline,
				returnAllIssueTimeline: [false],
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
		name: 'pageIssueTimeline',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForIssueGetTimeline,
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
		displayName: 'Timeline Filters',
		name: 'issueTimelineFilters',
		type: 'collection',
		default: {},
		displayOptions: {
			show: showOnlyForIssueGetTimeline,
		},
		options: [
			{
				displayName: 'Before',
				name: 'before',
				type: 'dateTime',
				default: '',
				description: 'Only include entries updated before this time',
				routing: {
					request: {
						qs: {
							before: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Since',
				name: 'since',
				type: 'dateTime',
				default: '',
				description: 'Only include entries updated at or after this time',
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
	{
		displayName: 'Return All',
		name: 'returnAllIssueTimes',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForIssueGetTimes,
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
		name: 'limitIssueTimes',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				...showOnlyForIssueGetTimes,
				returnAllIssueTimes: [false],
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
		name: 'pageIssueTimes',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForIssueGetTimes,
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
		displayName: 'Tracked Time Filters',
		name: 'issueTimesFilters',
		type: 'collection',
		default: {},
		displayOptions: {
			show: showOnlyForIssueGetTimes,
		},
		options: [
			{
				displayName: 'Before',
				name: 'before',
				type: 'dateTime',
				default: '',
				description: 'Only include tracked times updated before this time',
				routing: {
					request: {
						qs: {
							before: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Since',
				name: 'since',
				type: 'dateTime',
				default: '',
				description: 'Only include tracked times updated at or after this time',
				routing: {
					request: {
						qs: {
							since: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
				description: 'Only include tracked times for this username',
				routing: {
					request: {
						qs: {
							user: '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
];
