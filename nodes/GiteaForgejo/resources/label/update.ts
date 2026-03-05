import type { INodeProperties } from 'n8n-workflow';
import { labelIdSelect } from '../../shared/descriptions';

const showOnlyForLabelUpdate = {
	operation: ['update'],
	resource: ['label'],
};

export const labelUpdateDescription: INodeProperties[] = [
	{
		...labelIdSelect,
		displayOptions: {
			show: showOnlyForLabelUpdate,
		},
	},
	{
		displayName: 'Set Archived',
		name: 'setArchived',
		type: 'boolean',
		default: false,
		description: 'Whether to update the archived state of the label',
		displayOptions: {
			show: showOnlyForLabelUpdate,
		},
	},
	{
		displayName: 'Archived',
		name: 'isArchived',
		type: 'boolean',
		default: false,
		description: 'Whether this label should be archived',
		displayOptions: {
			show: {
				...showOnlyForLabelUpdate,
				setArchived: [true],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'is_archived',
			},
		},
	},
	{
		displayName: 'Set Color',
		name: 'setColor',
		type: 'boolean',
		default: false,
		description: 'Whether to update the label color',
		displayOptions: {
			show: showOnlyForLabelUpdate,
		},
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		default: '#f29513',
		description: 'Label color in hex (leading # is OK; it will be removed before sending)',
		displayOptions: {
			show: {
				...showOnlyForLabelUpdate,
				setColor: [true],
			},
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
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		description: 'A description for the label',
		displayOptions: {
			show: showOnlyForLabelUpdate,
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
		displayName: 'Set Exclusive',
		name: 'setExclusive',
		type: 'boolean',
		default: false,
		description: 'Whether to update the exclusive state of the label',
		displayOptions: {
			show: showOnlyForLabelUpdate,
		},
	},
	{
		displayName: 'Exclusive',
		name: 'exclusive',
		type: 'boolean',
		default: false,
		description: 'Whether this label should be exclusive',
		displayOptions: {
			show: {
				...showOnlyForLabelUpdate,
				setExclusive: [true],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'exclusive',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'The new name of the label',
		displayOptions: {
			show: showOnlyForLabelUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'name',
				value: '={{$value || undefined}}',
			},
		},
	},
];
