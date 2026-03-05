import type { INodeProperties } from 'n8n-workflow';
import {
	showOnlyForRepositoryGetActionRuns,
	showOnlyForRepositoryGetActionSecrets,
	showOnlyForRepositoryGetActionTasks,
	showOnlyForRepositoryGetActionVariables,
	showOnlyForRepositoryGetMany,
	showOnlyForRepositoryGetActivityFeeds,
	showOnlyForRepositoryMigrate,
	showOnlyForRepositoryGetPushMirrors,
	showOnlyForRepositoryGetManyCommits,
	showOnlyForRepositoryGetManyForks,
	showOnlyForRepositoryGetNotifications,
	showOnlyForRepositoryGetManyTags,
	showOnlyForRepositoryGetManyTopics,
	showOnlyForRepositoryGetManyUsers,
	showOnlyForRepositoryMarkNotifications,
	showOnlyForRepositorySearch,
	showOnlyForRepositoryGetTrackedTimes,
} from './constants';

export const repositoryListDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAllActionTasks',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetActionTasks,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
				type: 'query',
				property: 'limit',
				value: '50',
			},
			operations: {
				pagination: {
					type: 'generic',
					properties: {
						continue: '={{ Array.isArray($response.body) && $response.body.length === 50 }}',
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
		name: 'limitActionTasks',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetActionTasks,
				returnAllActionTasks: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 50,
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
		name: 'pageActionTasks',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetActionTasks,
				returnAllActionTasks: [false],
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
		displayName: 'Return All',
		name: 'returnAllPushMirrors',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetPushMirrors,
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
		name: 'limitPushMirrors',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetPushMirrors,
				returnAllPushMirrors: [false],
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
		name: 'pagePushMirrors',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetPushMirrors,
				returnAllPushMirrors: [false],
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
		displayName: 'Return All',
		name: 'returnAllActivityFeeds',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetActivityFeeds,
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
		name: 'limitActivityFeeds',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetActivityFeeds,
				returnAllActivityFeeds: [false],
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
		name: 'pageActivityFeeds',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetActivityFeeds,
				returnAllActivityFeeds: [false],
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
		displayName: 'Date',
		name: 'activityFeedsDate',
		type: 'string',
		default: '',
		placeholder: 'e.g. 2026-01-31',
		displayOptions: {
			show: showOnlyForRepositoryGetActivityFeeds,
		},
		description: 'Date of activities to return (YYYY-MM-DD)',
		routing: {
			request: {
				qs: {
					date: '={{$value || undefined}}',
				},
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAllActionRuns',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetActionRuns,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
				type: 'query',
				property: 'limit',
				value: '50',
			},
			operations: {
				pagination: {
					type: 'generic',
					properties: {
						continue: '={{ Array.isArray($response.body) && $response.body.length === 50 }}',
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
		name: 'limitActionRuns',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetActionRuns,
				returnAllActionRuns: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 50,
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
		name: 'pageActionRuns',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetActionRuns,
				returnAllActionRuns: [false],
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
		name: 'actionRunFilters',
		type: 'collection',
		default: {},
		displayOptions: {
			show: showOnlyForRepositoryGetActionRuns,
		},
		options: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'string',
				default: '',
				placeholder: 'push,workflow_dispatch',
				description: 'Comma-separated workflow event names to include',
				routing: {
					request: {
						qs: {
							event:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Head SHA',
				name: 'headSha',
				type: 'string',
				default: '',
				description: 'Only include workflow runs with this head SHA',
				routing: {
					request: {
						qs: {
							head_sha: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Run Number',
				name: 'runNumber',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				description: 'Only include the workflow run with this run number',
				routing: {
					request: {
						qs: {
							run_number: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				placeholder: 'running,success',
				description: 'Comma-separated statuses to include',
				routing: {
					request: {
						qs: {
							status:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : undefined}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Return All',
		name: 'returnAllActionSecrets',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetActionSecrets,
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
		name: 'limitActionSecrets',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetActionSecrets,
				returnAllActionSecrets: [false],
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
		name: 'pageActionSecrets',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetActionSecrets,
				returnAllActionSecrets: [false],
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
		displayName: 'Return All',
		name: 'returnAllActionVariables',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetActionVariables,
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
		name: 'limitActionVariables',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetActionVariables,
				returnAllActionVariables: [false],
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
		name: 'pageActionVariables',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetActionVariables,
				returnAllActionVariables: [false],
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
		displayName: 'Return All',
		name: 'returnAllNotifications',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetNotifications,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
				type: 'query',
				property: 'limit',
				value: '50',
			},
			operations: {
				pagination: {
					type: 'generic',
					properties: {
						continue: '={{ Array.isArray($response.body) && $response.body.length === 50 }}',
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
		name: 'limitNotifications',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetNotifications,
				returnAllNotifications: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 50,
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
		name: 'pageNotifications',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetNotifications,
				returnAllNotifications: [false],
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
		name: 'notificationFilters',
		type: 'collection',
		default: {},
		displayOptions: {
			show: showOnlyForRepositoryGetNotifications,
		},
		options: [
			{
				displayName: 'All',
				name: 'all',
				type: 'boolean',
				default: false,
				description: 'Whether to include notifications already marked as read',
				routing: {
					request: {
						qs: {
							all: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Before',
				name: 'before',
				type: 'string',
				default: '',
				placeholder: 'e.g. 2025-01-31T23:59:59Z',
				description: 'Only include notifications updated before this RFC 3339 timestamp',
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
				type: 'string',
				default: '',
				placeholder: 'e.g. 2025-01-01T00:00:00Z',
				description: 'Only include notifications updated after this RFC 3339 timestamp',
				routing: {
					request: {
						qs: {
							since: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Status Types',
				name: 'statusTypes',
				type: 'string',
				default: '',
				placeholder: 'unread,pinned',
				description: 'Comma-separated notification status types to include',
				routing: {
					request: {
						qs: {
							'status-types':
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Subject Types',
				name: 'subjectTypes',
				type: 'string',
				default: '',
				placeholder: 'issue,pull',
				description: 'Comma-separated subject types to include',
				routing: {
					request: {
						qs: {
							'subject-type':
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : undefined}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Mark Options',
		name: 'markNotificationOptions',
		type: 'collection',
		default: {},
		displayOptions: {
			show: showOnlyForRepositoryMarkNotifications,
		},
		options: [
			{
				displayName: 'All',
				name: 'all',
				type: 'boolean',
				default: false,
				description: 'Whether to mark all notifications in this repository',
				routing: {
					request: {
						qs: {
							all: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Last Read At',
				name: 'lastReadAt',
				type: 'string',
				default: '',
				placeholder: 'e.g. 2025-01-31T10:15:00Z',
				description: 'Only mark notifications updated at or before this RFC 3339 timestamp',
				routing: {
					request: {
						qs: {
							last_read_at: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Status Types',
				name: 'statusTypes',
				type: 'string',
				default: '',
				placeholder: 'unread',
				description: 'Comma-separated notification status types to target',
				routing: {
					request: {
						qs: {
							'status-types':
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'To Status',
				name: 'toStatus',
				type: 'options',
				default: 'read',
				options: [
					{
						name: 'Pinned',
						value: 'pinned',
					},
					{
						name: 'Read',
						value: 'read',
					},
					{
						name: 'Unread',
						value: 'unread',
					},
				],
				description: 'Status to mark matched notifications as',
				routing: {
					request: {
						qs: {
							'to-status': '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Return All',
		name: 'returnAllForks',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetManyForks,
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
		name: 'limitForks',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetManyForks,
				returnAllForks: [false],
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
		name: 'pageForks',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetManyForks,
				returnAllForks: [false],
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
		displayName: 'Return All',
		name: 'returnAllCommits',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetManyCommits,
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
		name: 'limitCommits',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetManyCommits,
				returnAllCommits: [false],
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
		name: 'pageCommits',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetManyCommits,
				returnAllCommits: [false],
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
		name: 'commitFilters',
		type: 'collection',
		default: {},
		displayOptions: {
			show: showOnlyForRepositoryGetManyCommits,
		},
		options: [
			{
				displayName: 'Files',
				name: 'files',
				type: 'boolean',
				default: true,
				description: 'Whether to include affected files for each commit',
				routing: {
					request: {
						qs: {
							files: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Not',
				name: 'not',
				type: 'string',
				default: '',
				description: 'Exclude commits matching this ref specifier',
				routing: {
					request: {
						qs: {
							not: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				default: '',
				placeholder: 'e.g. src/index.ts',
				description: 'Filter commits touching this file or directory path',
				routing: {
					request: {
						qs: {
							path: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'SHA',
				name: 'sha',
				type: 'string',
				default: '',
				placeholder: 'e.g. main',
				description: 'Branch or commit SHA to start listing from',
				routing: {
					request: {
						qs: {
							sha: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Stat',
				name: 'stat',
				type: 'boolean',
				default: true,
				description: 'Whether to include diff stats for each commit',
				routing: {
					request: {
						qs: {
							stat: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Verification',
				name: 'verification',
				type: 'boolean',
				default: true,
				description: 'Whether to include commit signature verification info',
				routing: {
					request: {
						qs: {
							verification: '={{$value}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Return All',
		name: 'returnAllUsers',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetManyUsers,
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
		name: 'limitUsers',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetManyUsers,
				returnAllUsers: [false],
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
		name: 'pageUsers',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetManyUsers,
				returnAllUsers: [false],
			},
		},
		description: 'Page number of results to return (1-based)',
		routing: {
			send: {
				type: 'query',
				property: 'page',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAllTopics',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetManyTopics,
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
		name: 'limitTopics',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetManyTopics,
				returnAllTopics: [false],
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
		name: 'pageTopics',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetManyTopics,
				returnAllTopics: [false],
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
		displayName: 'Return All',
		name: 'returnAllTags',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetManyTags,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
				type: 'query',
				property: 'limit',
				value: '50',
			},
			operations: {
				pagination: {
					type: 'generic',
					properties: {
						continue: '={{ Array.isArray($response.body) && $response.body.length === 50 }}',
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
		name: 'limitTags',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetManyTags,
				returnAllTags: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 50,
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
		name: 'pageTags',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetManyTags,
				returnAllTags: [false],
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
		displayName: 'Return All',
		name: 'returnAllTimes',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetTrackedTimes,
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
		name: 'limitTimes',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetTrackedTimes,
				returnAllTimes: [false],
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
		name: 'pageTimes',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetTrackedTimes,
				returnAllTimes: [false],
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
		name: 'trackedTimeFilters',
		type: 'collection',
		default: {},
		displayOptions: {
			show: showOnlyForRepositoryGetTrackedTimes,
		},
		options: [
			{
				displayName: 'Before',
				name: 'before',
				type: 'string',
				default: '',
				placeholder: 'e.g. 2025-01-31T10:15:00Z',
				description: 'Only show tracked times updated before this RFC 3339 timestamp',
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
				type: 'string',
				default: '',
				placeholder: 'e.g. 2025-01-01T00:00:00Z',
				description: 'Only show tracked times updated after this RFC 3339 timestamp',
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
				placeholder: 'e.g. octocat',
				description: 'Only show tracked times for one user',
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
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetMany,
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
				...showOnlyForRepositoryGetMany,
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
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetMany,
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
		displayName: 'Return All',
		name: 'returnAllRepositorySearch',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositorySearch,
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
						continue:
							'={{ Array.isArray($response.body?.data) && $response.body.data.length === 100 }}',
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
		name: 'limitRepositorySearch',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		displayOptions: {
			show: {
				...showOnlyForRepositorySearch,
				returnAllRepositorySearch: [false],
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
		name: 'pageRepositorySearch',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForRepositorySearch,
				returnAllRepositorySearch: [false],
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
		displayName: 'Search Filters',
		name: 'repositorySearchFilters',
		type: 'collection',
		default: {},
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForRepositorySearch,
		},
		options: [
			{
				displayName: 'Archived',
				name: 'archived',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'False', value: 'false' },
					{ name: 'True', value: 'true' },
				],
				description: 'Filter by archived repositories',
				routing: {
					request: {
						qs: {
							archived: '={{$value === "" ? undefined : $value === "true"}}',
						},
					},
				},
			},
			{
				displayName: 'Exclusive',
				name: 'exclusive',
				type: 'options',
				default: '',
				options: [
					{ name: 'Default', value: '' },
					{ name: 'False', value: 'false' },
					{ name: 'True', value: 'true' },
				],
				description: 'If UID is set, whether to return only repositories owned by that user',
				routing: {
					request: {
						qs: {
							exclusive: '={{$value === "" ? undefined : $value === "true"}}',
						},
					},
				},
			},
			{
				displayName: 'Include Description',
				name: 'includeDesc',
				type: 'options',
				default: '',
				options: [
					{ name: 'Default', value: '' },
					{ name: 'False', value: 'false' },
					{ name: 'True', value: 'true' },
				],
				description: 'Whether to include repository descriptions in keyword matching',
				routing: {
					request: {
						qs: {
							includeDesc: '={{$value === "" ? undefined : $value === "true"}}',
						},
					},
				},
			},
			{
				displayName: 'Is Private',
				name: 'isPrivate',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Private', value: 'true' },
					{ name: 'Public', value: 'false' },
				],
				description: 'Filter by public/private repositories',
				routing: {
					request: {
						qs: {
							is_private: '={{$value === "" ? undefined : $value === "true"}}',
						},
					},
				},
			},
			{
				displayName: 'Keyword',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Search keyword',
				routing: {
					request: {
						qs: {
							q: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				default: '',
				options: [
					{ name: 'Any', value: '' },
					{ name: 'Collaborative', value: 'collaborative' },
					{ name: 'Fork', value: 'fork' },
					{ name: 'Mirror', value: 'mirror' },
					{ name: 'Source', value: 'source' },
				],
				description: 'Repository mode filter',
				routing: {
					request: {
						qs: {
							mode: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				default: '',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Default', value: '' },
					{ name: 'Descending', value: 'desc' },
				],
				description: 'Sort direction',
				routing: {
					request: {
						qs: {
							order: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Priority Owner ID',
				name: 'priorityOwnerId',
				type: 'number',
				default: 0,
				description: 'Owner ID to prioritize in search results',
				routing: {
					request: {
						qs: {
							priority_owner_id: '={{$value > 0 ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Private',
				name: 'private',
				type: 'options',
				default: '',
				options: [
					{ name: 'Default', value: '' },
					{ name: 'False', value: 'false' },
					{ name: 'True', value: 'true' },
				],
				description: 'Whether to include private repositories',
				routing: {
					request: {
						qs: {
							private: '={{$value === "" ? undefined : $value === "true"}}',
						},
					},
				},
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				default: '',
				options: [
					{ name: 'Alpha', value: 'alpha' },
					{ name: 'Created', value: 'created' },
					{ name: 'Default', value: '' },
					{ name: 'Forks', value: 'forks' },
					{ name: 'Git Size', value: 'git_size' },
					{ name: 'ID', value: 'id' },
					{ name: 'LFS Size', value: 'lfs_size' },
					{ name: 'Size', value: 'size' },
					{ name: 'Stars', value: 'stars' },
					{ name: 'Updated', value: 'updated' },
				],
				description: 'Sort order attribute',
				routing: {
					request: {
						qs: {
							sort: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Starred By User ID',
				name: 'starredBy',
				type: 'number',
				default: 0,
				description: 'Search repositories starred by this user ID',
				routing: {
					request: {
						qs: {
							starredBy: '={{$value > 0 ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'number',
				default: 0,
				description: 'Team ID filter',
				routing: {
					request: {
						qs: {
							team_id: '={{$value > 0 ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Template',
				name: 'template',
				type: 'options',
				default: '',
				options: [
					{ name: 'Default', value: '' },
					{ name: 'False', value: 'false' },
					{ name: 'True', value: 'true' },
				],
				description: 'Whether to include template repositories',
				routing: {
					request: {
						qs: {
							template: '={{$value === "" ? undefined : $value === "true"}}',
						},
					},
				},
			},
			{
				displayName: 'Topic Match',
				name: 'topic',
				type: 'options',
				default: '',
				options: [
					{ name: 'Default', value: '' },
					{ name: 'False', value: 'false' },
					{ name: 'True', value: 'true' },
				],
				description: 'Whether keyword should match repository topics',
				routing: {
					request: {
						qs: {
							topic: '={{$value === "" ? undefined : $value === "true"}}',
						},
					},
				},
			},
			{
				displayName: 'UID',
				name: 'uid',
				type: 'number',
				default: 0,
				description: 'User ID to scope repository ownership or contributions',
				routing: {
					request: {
						qs: {
							uid: '={{$value > 0 ? $value : undefined}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Migrate Options',
		name: 'repositoryMigrateOptions',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: showOnlyForRepositoryMigrate,
		},
		description: 'Migrate repository payload matching MigrateRepoOptions',
		routing: {
			request: {
				body: '={{Object.keys($value || {}).length ? $value : undefined}}',
			},
		},
	},
];
