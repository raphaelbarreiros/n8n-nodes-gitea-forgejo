import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';

export const notificationDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['getRepoList', 'readRepoList'],
			},
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['getRepoList', 'readRepoList'],
			},
		},
	},
	{
		displayName: 'Notification ID',
		name: 'notificationId',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['getThread', 'readThread'],
			},
		},
		description: 'ID of the notification thread',
	},
	// additionalFields for getList / getRepoList
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['getList', 'getRepoList'],
			},
		},
		options: [
			{
				displayName: 'All',
				name: 'all',
				type: 'boolean',
				default: false,
				description: 'Whether to show notifications marked as read',
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
				description: 'Only show notifications updated before this time (ISO 8601 format)',
				routing: {
					request: {
						qs: {
							before: '={{$value || undefined}}',
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
				},
				default: 50,
				description: 'Max number of results to return',
				routing: {
					request: {
						qs: {
							limit: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number of results to return',
				routing: {
					request: {
						qs: {
							page: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Since',
				name: 'since',
				type: 'string',
				default: '',
				description: 'Only show notifications updated after this time (ISO 8601 format)',
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
				description: 'Comma-separated list of status types to filter (e.g. unread,read,pinned)',
				routing: {
					request: {
						qs: {
							'status-types': '={{$value.split(",").map(s => s.trim())}}',
						},
					},
				},
			},
			{
				displayName: 'Subject Type',
				name: 'subjectType',
				type: 'string',
				default: '',
				description:
					'Comma-separated list of subject types to filter (e.g. issue,pull,commit,repository)',
				routing: {
					request: {
						qs: {
							'subject-type': '={{$value.split(",").map(s => s.trim())}}',
						},
					},
				},
			},
		],
	},
	// additionalFields for readList / readRepoList
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['readList', 'readRepoList'],
			},
		},
		options: [
			{
				displayName: 'All',
				name: 'all',
				type: 'boolean',
				default: false,
				description: 'Whether to mark all notifications as read',
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
				description: 'Describes the last point that notifications were checked (ISO 8601 format)',
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
				description:
					'Comma-separated list of status types to mark as read (e.g. unread,read,pinned)',
				routing: {
					request: {
						qs: {
							'status-types': '={{$value.split(",").map(s => s.trim())}}',
						},
					},
				},
			},
			{
				displayName: 'To Status',
				name: 'toStatus',
				type: 'string',
				default: '',
				description: 'Status to mark notifications as (e.g. read)',
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
	// additionalFields for readThread
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['notification'],
				operation: ['readThread'],
			},
		},
		options: [
			{
				displayName: 'To Status',
				name: 'toStatus',
				type: 'string',
				default: '',
				description: 'Status to mark the thread as (e.g. read)',
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
];
