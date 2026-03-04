import type { INodeProperties } from 'n8n-workflow';
import { pullRequestSelect } from '../../shared/descriptions';

const showOnlyForPullRequestUpdate = {
	operation: ['update'],
	resource: ['pullRequest'],
};

export const pullRequestUpdateDescription: INodeProperties[] = [
	{
		...pullRequestSelect,
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
		},
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		description: 'Change the title of the pull request',
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'title',
				value: '={{$value || undefined}}',
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
		description: 'Update the pull request description',
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
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
		displayName: 'State',
		name: 'state',
		type: 'options',
		options: [
			{ name: 'Open', value: 'open' },
			{ name: 'Closed', value: 'closed' },
		],
		default: 'open',
		description: 'Update the pull request state',
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'state',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Base Branch',
		name: 'base',
		type: 'string',
		default: '',
		description: 'Change the target branch',
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'base',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Head Branch',
		name: 'head',
		type: 'string',
		default: '',
		description: 'Change the source branch',
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'head',
				value: '={{$value || undefined}}',
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
		description: 'Attach a milestone to the pull request',
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
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
		displayName: 'Assignee',
		name: 'assignee',
		type: 'string',
		default: '',
		description: 'Assign the pull request to a user',
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
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
		description: 'Comma-separated usernames to assign',
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
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
		description: 'Comma-separated label IDs',
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
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
		displayName: 'Allow Maintainer Edit',
		name: 'allowMaintainerEdit',
		type: 'boolean',
		default: false,
		description: 'Whether to allow maintainers to edit the pull request',
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'allow_maintainer_edit',
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
			show: showOnlyForPullRequestUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'due_date',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Unset Due Date',
		name: 'unsetDueDate',
		type: 'boolean',
		default: false,
		description: 'Whether to remove the deadline from the pull request',
		displayOptions: {
			show: showOnlyForPullRequestUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'unset_due_date',
			},
		},
	},
];
