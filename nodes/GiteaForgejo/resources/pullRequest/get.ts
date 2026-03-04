import type { INodeProperties } from 'n8n-workflow';
import { pullRequestSelect } from '../../shared/descriptions';

const showOnlyForPullRequestGet = {
	operation: ['get'],
	resource: ['pullRequest'],
};

export const pullRequestGetDescription: INodeProperties[] = [
	{
		...pullRequestSelect,
		displayOptions: {
			show: showOnlyForPullRequestGet,
		},
	},
];
