import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReleaseAttachmentDelete = {
	operation: ['delete'],
	resource: ['releaseAttachment'],
};

export const releaseAttachmentDeleteDescription: INodeProperties[] = [
	{
		displayName:
			'Warning: This action permanently deletes the release attachment and cannot be undone.',
		name: 'confirmDelete',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForReleaseAttachmentDelete,
		},
	},
];
