import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReleaseAttachmentDelete = {
	operation: ['delete'],
	resource: ['releaseAttachment'],
};

export const releaseAttachmentDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Delete Permanently',
		name: 'confirmDelete',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: showOnlyForReleaseAttachmentDelete,
		},
		description: 'Whether to permanently delete this release attachment',
	},
];
