import type { INodeProperties } from 'n8n-workflow';

const showOnlyForIssueCreate = {
	operation: ['create'],
	resource: ['issue'],
};

export const issueCreateDescription: INodeProperties[] = [
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForIssueCreate,
		},
		description: 'The title of the issue',
		routing: {
			send: {
				type: 'body',
				property: 'title',
			},
		},
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		displayOptions: {
			show: showOnlyForIssueCreate,
		},
		description: 'Issue body content',
		routing: {
			send: {
				type: 'body',
				property: 'body',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Assignees',
		name: 'assignees',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueCreate,
		},
		description: 'Comma-separated usernames to assign to the issue',
		placeholder: 'alice,bob',
		routing: {
			send: {
				type: 'body',
				property: 'assignees',
				value:
					'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : undefined}}',
			},
		},
	},
	{
		displayName: 'Label IDs',
		name: 'labels',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueCreate,
		},
		description: 'Comma-separated label IDs to add to the issue',
		placeholder: '1,2,5',
		routing: {
			send: {
				type: 'body',
				property: 'labels',
				value:
					'={{$value ? $value.split(",").map((entry) => Number(entry.trim())).filter((entry) => Number.isFinite(entry)) : undefined}}',
			},
		},
	},
	{
		displayName: 'Milestone ID',
		name: 'milestone',
		type: 'number',
		typeOptions: {
			minValue: -1,
		},
		default: -1,
		displayOptions: {
			show: showOnlyForIssueCreate,
		},
		description: 'Milestone ID to attach, if any',
		routing: {
			send: {
				type: 'body',
				property: 'milestone',
				value: '={{$value >= 0 ? $value : undefined}}',
			},
		},
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: showOnlyForIssueCreate,
		},
		description: 'Set a due date for the issue (RFC 3339)',
		routing: {
			send: {
				type: 'body',
				property: 'due_date',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Reference',
		name: 'ref',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueCreate,
		},
		description: 'Reference branch or commit for this issue',
		routing: {
			send: {
				type: 'body',
				property: 'ref',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Create as Closed',
		name: 'closed',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForIssueCreate,
		},
		description: 'Whether to create the issue in closed state',
		routing: {
			send: {
				type: 'body',
				property: 'closed',
			},
		},
	},
];
