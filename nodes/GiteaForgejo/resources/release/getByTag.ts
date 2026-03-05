import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReleaseGetByTag = {
	operation: ['getByTag'],
	resource: ['release'],
};

export const releaseGetByTagDescription: INodeProperties[] = [
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		default: '',
		required: true,
		description: 'Release tag name (for example v1.2.0)',
		displayOptions: {
			show: showOnlyForReleaseGetByTag,
		},
	},
];
