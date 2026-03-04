import type { INodeProperties } from 'n8n-workflow';
import { pullRequestSelect } from '../../shared/descriptions';

const showOnlyForPullRequestMerge = {
	operation: ['merge'],
	resource: ['pullRequest'],
};

export const pullRequestMergeDescription: INodeProperties[] = [
	{
		...pullRequestSelect,
		displayOptions: {
			show: showOnlyForPullRequestMerge,
		},
	},
	{
		displayName: 'Merge Method',
		name: 'mergeMethod',
		type: 'options',
		required: true,
		options: [
			{ name: 'Fast-Forward Only', value: 'fast-forward-only' },
			{ name: 'Mark as Manually Merged', value: 'manually-merged' },
			{ name: 'Merge', value: 'merge' },
			{ name: 'Rebase', value: 'rebase' },
			{ name: 'Rebase with Merge Commit', value: 'rebase-merge' },
			{ name: 'Squash', value: 'squash' },
		],
		default: 'merge',
		description: 'Strategy to use when merging the pull request',
		displayOptions: {
			show: showOnlyForPullRequestMerge,
		},
		routing: {
			send: {
				type: 'body',
				property: 'Do',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Merge Title',
		name: 'mergeTitle',
		type: 'string',
		default: '',
		placeholder: 'Merge pull request #42 from ...',
		description: 'Title to use for the merge commit',
		displayOptions: {
			show: showOnlyForPullRequestMerge,
		},
		routing: {
			send: {
				type: 'body',
				property: 'MergeTitleField',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Merge Message',
		name: 'mergeMessage',
		type: 'string',
		default: '',
		placeholder: 'Merged feature XYZ',
		description: 'Message to use for the merge commit',
		displayOptions: {
			show: showOnlyForPullRequestMerge,
		},
		routing: {
			send: {
				type: 'body',
				property: 'MergeMessageField',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Merge Commit ID',
		name: 'mergeCommitId',
		type: 'string',
		default: '',
		description: 'Override the commit SHA used to merge',
		displayOptions: {
			show: showOnlyForPullRequestMerge,
		},
		routing: {
			send: {
				type: 'body',
				property: 'MergeCommitID',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Delete Branch After Merge',
		name: 'deleteBranchAfterMerge',
		type: 'boolean',
		default: false,
		description: 'Whether to remove the source branch after merging',
		displayOptions: {
			show: showOnlyForPullRequestMerge,
		},
		routing: {
			send: {
				type: 'body',
				property: 'delete_branch_after_merge',
			},
		},
	},
	{
		displayName: 'Force Merge',
		name: 'forceMerge',
		type: 'boolean',
		default: false,
		description: 'Whether to force the merge even if there are conflicts',
		displayOptions: {
			show: showOnlyForPullRequestMerge,
		},
		routing: {
			send: {
				type: 'body',
				property: 'force_merge',
			},
		},
	},
	{
		displayName: 'Merge When Checks Succeed',
		name: 'mergeWhenChecksSucceed',
		type: 'boolean',
		default: false,
		description: 'Whether to merge when required checks pass',
		displayOptions: {
			show: showOnlyForPullRequestMerge,
		},
		routing: {
			send: {
				type: 'body',
				property: 'merge_when_checks_succeed',
			},
		},
	},
	{
		displayName: 'Head Commit ID',
		name: 'headCommitId',
		type: 'string',
		default: '',
		description: 'Specify which head commit to merge',
		displayOptions: {
			show: showOnlyForPullRequestMerge,
		},
		routing: {
			send: {
				type: 'body',
				property: 'head_commit_id',
				value: '={{$value || undefined}}',
			},
		},
	},
];
