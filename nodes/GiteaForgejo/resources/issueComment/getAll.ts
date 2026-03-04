import type { INodeProperties } from 'n8n-workflow';

const showOnlyForIssueCommentGetMany = {
	operation: ['getAll'],
	resource: ['issueComment'],
};

export const issueCommentGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForIssueCommentGetMany,
		},
		default: {},
		options: [
			{
				displayName: 'Updated Before',
				name: 'before',
				type: 'dateTime',
				default: '',
				description: 'Only show comments updated before this time',
				routing: {
					request: {
						qs: {
							before: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Updated Since',
				name: 'since',
				type: 'dateTime',
				default: '',
				description: 'Only show comments updated at or after this time',
				routing: {
					request: {
						qs: {
							since: '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
];
