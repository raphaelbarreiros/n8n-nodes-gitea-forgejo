import type { INodeProperties } from 'n8n-workflow';
import { issueSelect, ownerSelect, repositorySelect } from '../../shared/descriptions';
import { issueCommentGetManyDescription } from './getAll';
import { issueCommentCreateDescription } from './create';

const showOnlyForIssueComments = {
	resource: ['issueComment'],
};

export const issueCommentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForIssueComments,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many comments on an issue',
				description: 'Get many comments on an issue',
				routing: {
					request: {
						method: 'GET',
						url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues/{{$parameter.issue}}/comments',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create an issue comment',
				description: 'Create a comment on an issue',
				routing: {
					request: {
						method: 'POST',
						url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues/{{$parameter.issue}}/comments',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForIssueComments,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForIssueComments,
		},
	},
	{
		...issueSelect,
		displayOptions: {
			show: showOnlyForIssueComments,
		},
	},
	...issueCommentGetManyDescription,
	...issueCommentCreateDescription,
];
