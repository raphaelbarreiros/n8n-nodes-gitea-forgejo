import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCommitStatusGetCombinedByRef = {
	operation: ['getCombinedByRef'],
	resource: ['commitStatus'],
};

export const commitStatusGetCombinedByRefDescription: INodeProperties[] = [
	{
		displayName: 'Reference',
		name: 'reference',
		type: 'string',
		required: true,
		default: '',
		description: 'Branch, tag, or commit reference',
		displayOptions: {
			show: showOnlyForCommitStatusGetCombinedByRef,
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: showOnlyForCommitStatusGetCombinedByRef,
		},
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		description: 'Page number of results to return (1-based)',
		displayOptions: {
			show: showOnlyForCommitStatusGetCombinedByRef,
		},
		routing: {
			send: {
				type: 'query',
				property: 'page',
			},
		},
	},
];
