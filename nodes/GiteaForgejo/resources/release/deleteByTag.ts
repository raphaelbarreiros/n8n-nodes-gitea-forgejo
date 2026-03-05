import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReleaseDeleteByTag = {
	operation: ['deleteByTag'],
	resource: ['release'],
};

export const releaseDeleteByTagDescription: INodeProperties[] = [
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		default: '',
		required: true,
		description: 'Release tag name (for example v1.2.0)',
		displayOptions: {
			show: showOnlyForReleaseDeleteByTag,
		},
	},
];
