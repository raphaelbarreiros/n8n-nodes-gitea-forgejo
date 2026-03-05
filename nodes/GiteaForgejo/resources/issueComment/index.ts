import type { INodeProperties } from 'n8n-workflow';
import { issueSelect, ownerSelect, repositorySelect } from '../../shared/descriptions';
import { issueCommentGetManyDescription } from './getAll';
import { issueCommentCreateDescription } from './create';
import { issueCommentExtraDescription } from './extra';

const showOnlyForIssueComments = {
	resource: ['issueComment'],
};

export const issueCommentDescription: INodeProperties[] = [
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
			show: {
				...showOnlyForIssueComments,
				operation: ['create', 'getAll'],
			},
		},
	},
	...issueCommentGetManyDescription,
	...issueCommentCreateDescription,
	...issueCommentExtraDescription,
];
