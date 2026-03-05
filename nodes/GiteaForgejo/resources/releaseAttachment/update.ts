import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReleaseAttachmentUpdate = {
	operation: ['update'],
	resource: ['releaseAttachment'],
};

export const releaseAttachmentUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForReleaseAttachmentUpdate,
		},
		description: 'Updated display name for the attachment',
		routing: {
			send: {
				type: 'body',
				property: 'name',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Browser Download URL',
		name: 'browserDownloadUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForReleaseAttachmentUpdate,
		},
		description: 'External URL (only valid when editing an external attachment)',
		routing: {
			send: {
				type: 'body',
				property: 'browser_download_url',
				value: '={{$value || undefined}}',
			},
		},
	},
];
