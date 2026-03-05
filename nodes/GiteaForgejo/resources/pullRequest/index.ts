import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { pullRequestGetManyDescription } from './getAll';
import { pullRequestGetDescription } from './get';
import { pullRequestCreateDescription } from './create';
import { pullRequestExtraDescription } from './extra';
import { pullRequestUpdateDescription } from './update';
import { pullRequestMergeDescription } from './merge';

const showOnlyForPullRequests = {
	resource: ['pullRequest'],
};

export const pullRequestDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForPullRequests,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForPullRequests,
		},
	},
	...pullRequestGetManyDescription,
	...pullRequestGetDescription,
	...pullRequestCreateDescription,
	...pullRequestExtraDescription,
	...pullRequestUpdateDescription,
	...pullRequestMergeDescription,
];
