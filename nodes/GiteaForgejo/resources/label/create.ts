import type { INodeProperties } from 'n8n-workflow';

const showOnlyForLabelCreate = {
	operation: ['create'],
	resource: ['label'],
};

export const labelCreateDescription: INodeProperties[] = [
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		required: true,
		default: '#f29513',
		description: 'Label color in hex (leading # is OK; it will be removed before sending)',
		displayOptions: {
			show: showOnlyForLabelCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'color',
				value: '={{$value ? $value.replace(/^#/, "") : undefined}}',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'The name of the label',
		displayOptions: {
			show: showOnlyForLabelCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'A description for the label',
		displayOptions: {
			show: showOnlyForLabelCreate,
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
		displayName: 'Exclusive',
		name: 'exclusive',
		type: 'boolean',
		default: false,
		description: 'Whether this label should be exclusive',
		displayOptions: {
			show: showOnlyForLabelCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'exclusive',
			},
		},
	},
	{
		displayName: 'Archived',
		name: 'isArchived',
		type: 'boolean',
		default: false,
		description: 'Whether this label should be archived',
		displayOptions: {
			show: showOnlyForLabelCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'is_archived',
			},
		},
	},
];
