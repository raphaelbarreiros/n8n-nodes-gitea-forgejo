import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCommitStatusCreate = {
	operation: ['create'],
	resource: ['commitStatus'],
};

export const commitStatusCreateDescription: INodeProperties[] = [
	{
		displayName: 'SHA',
		name: 'sha',
		type: 'string',
		required: true,
		default: '',
		description: 'Commit SHA to set status for',
		displayOptions: {
			show: showOnlyForCommitStatusCreate,
		},
	},
	{
		displayName: 'State',
		name: 'state',
		type: 'options',
		required: true,
		options: [
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
		default: 'pending',
		description: 'State of the commit status',
		displayOptions: {
			show: showOnlyForCommitStatusCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'state',
			},
		},
	},
	{
		displayName: 'Context',
		name: 'context',
		type: 'string',
		default: '',
		description: 'A string label to differentiate this status context',
		displayOptions: {
			show: showOnlyForCommitStatusCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'context',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'Description for this status update',
		displayOptions: {
			show: showOnlyForCommitStatusCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'description',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Target URL',
		name: 'targetUrl',
		type: 'string',
		default: '',
		placeholder: 'https://ci.example.com/build/123',
		description: 'URL with more details about this status',
		displayOptions: {
			show: showOnlyForCommitStatusCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'target_url',
				value: '={{$value || undefined}}',
			},
		},
	},
];
