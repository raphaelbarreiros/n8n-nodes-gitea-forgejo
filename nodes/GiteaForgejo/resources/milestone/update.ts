import type { INodeProperties } from 'n8n-workflow';
import { milestoneIdSelect } from '../../shared/descriptions';

const showOnlyForMilestoneUpdate = {
	operation: ['update'],
	resource: ['milestone'],
};

export const milestoneUpdateDescription: INodeProperties[] = [
	{
		...milestoneIdSelect,
		displayOptions: {
			show: showOnlyForMilestoneUpdate,
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		description: 'Milestone description',
		displayOptions: {
			show: showOnlyForMilestoneUpdate,
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
		displayName: 'Due On',
		name: 'dueOn',
		type: 'dateTime',
		default: '',
		description: 'Due date for the milestone (RFC 3339)',
		displayOptions: {
			show: showOnlyForMilestoneUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'due_on',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'State',
		name: 'state',
		type: 'options',
		options: [
			{
				name: 'Closed',
				value: 'closed',
			},
			{
				name: 'Open',
				value: 'open',
			},
		],
		default: 'open',
		description: 'State of the milestone',
		displayOptions: {
			show: showOnlyForMilestoneUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'state',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		description: 'Title of the milestone',
		displayOptions: {
			show: showOnlyForMilestoneUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'title',
				value: '={{$value || undefined}}',
			},
		},
	},
];
