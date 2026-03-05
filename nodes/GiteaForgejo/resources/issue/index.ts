import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { issueGetManyDescription } from './getAll';
import { issueGetDescription } from './get';
import { issueCreateDescription } from './create';
import { issueExtraDescription } from './extra';

const showOnlyForIssueWithRepository = {
	resource: ['issue'],
	operation: [
		'addBlock',
		'addDependency',
		'addReaction',
		'addSubscription',
		'addTime',
		'checkSubscription',
		'create',
		'createAttachment',
		'delete',
		'deleteAttachment',
		'deleteBlock',
		'deleteDependency',
		'deleteReaction',
		'deleteStopwatch',
		'deleteSubscription',
		'deleteTime',
		'get',
		'getAll',
		'getAttachment',
		'getAttachments',
		'getBlocks',
		'getDependencies',
		'getReactions',
		'getSubscriptions',
		'getTimeline',
		'getTimes',
		'movePin',
		'pin',
		'resetTime',
		'startStopwatch',
		'stopStopwatch',
		'unpin',
		'update',
		'updateAttachment',
		'updateDeadline',
	],
};

export const issueDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForIssueWithRepository,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForIssueWithRepository,
		},
	},
	...issueGetManyDescription,
	...issueGetDescription,
	...issueCreateDescription,
	...issueExtraDescription,
];
