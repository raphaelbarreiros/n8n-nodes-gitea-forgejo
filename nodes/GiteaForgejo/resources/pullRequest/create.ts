import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPullRequestCreate = {
	operation: ['create'],
	resource: ['pullRequest'],
};

export const pullRequestCreateDescription: INodeProperties[] = [
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		description: 'The title of the pull request',
		displayOptions: {
			show: showOnlyForPullRequestCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'title',
			},
		},
	},
	{
		displayName: 'Head Branch',
		name: 'head',
		type: 'string',
		required: true,
		default: '',
		description: 'Branch or commit SHA to merge from',
		displayOptions: {
			show: showOnlyForPullRequestCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'head',
			},
		},
	},
	{
		displayName: 'Base Branch',
		name: 'base',
		type: 'string',
		required: true,
		default: '',
		description: 'Target branch to merge into',
		displayOptions: {
			show: showOnlyForPullRequestCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'base',
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
		description: 'Pull request description',
		displayOptions: {
			show: showOnlyForPullRequestCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'body',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Assignee',
		name: 'assignee',
		type: 'string',
		default: '',
		description: 'Username of the assignee',
		displayOptions: {
			show: showOnlyForPullRequestCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'assignee',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Assignees',
		name: 'assignees',
		type: 'string',
		default: '',
		placeholder: 'alice,bob',
		description: 'Comma-separated usernames to assign to the pull request',
		displayOptions: {
			show: showOnlyForPullRequestCreate,
		},
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
		placeholder: '1,2,3',
		description: 'Comma-separated label IDs to tag the pull request',
		displayOptions: {
			show: showOnlyForPullRequestCreate,
		},
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
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		description: 'Milestone ID to attach to this pull request',
		displayOptions: {
			show: showOnlyForPullRequestCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'milestone',
				value: '={{$value > 0 ? $value : undefined}}',
			},
		},
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'dateTime',
		default: '',
		description: 'Set a due date for the pull request',
		displayOptions: {
			show: showOnlyForPullRequestCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'due_date',
				value: '={{$value || undefined}}',
			},
		},
	},
];
