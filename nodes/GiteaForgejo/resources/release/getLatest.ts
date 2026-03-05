import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReleaseGetLatest = {
	operation: ['getLatest'],
	resource: ['release'],
};

export const releaseGetLatestDescription: INodeProperties[] = [
	{
		displayName: 'Notice',
		name: 'noticeGetLatest',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForReleaseGetLatest,
		},
		description:
			'Returns the most recent non-draft, non-pre-release release ordered by created date',
	},
];
