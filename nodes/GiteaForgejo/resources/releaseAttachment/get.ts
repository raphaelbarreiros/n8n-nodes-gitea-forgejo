import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReleaseAttachmentGet = {
	operation: ['get'],
	resource: ['releaseAttachment'],
};

export const releaseAttachmentGetDescription: INodeProperties[] = [
	{
		displayName: 'Simplify',
		name: 'simple',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: showOnlyForReleaseAttachmentGet,
		},
		description: 'Whether to return a simplified version of the response instead of the raw data',
		routing: {
			output: {
				postReceive: [
					{
						type: 'set',
						properties: {
							value:
								'={{ $parameter.simple ? { id: $responseItem.id, name: $responseItem.name, size: $responseItem.size, downloadUrl: $responseItem.browser_download_url } : $responseItem }}',
						},
					},
				],
			},
		},
	},
];
