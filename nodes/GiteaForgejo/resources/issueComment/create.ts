import type { INodeProperties } from 'n8n-workflow';

const showOnlyForIssueCommentCreate = {
	operation: ['create'],
	resource: ['issueComment'],
};

export const issueCommentCreateDescription: INodeProperties[] = [
	{
		displayName: 'Comment',
		name: 'body',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForIssueCommentCreate,
		},
		description: 'The comment text',
		routing: {
			send: {
				type: 'body',
				property: 'body',
			},
		},
	},
];
