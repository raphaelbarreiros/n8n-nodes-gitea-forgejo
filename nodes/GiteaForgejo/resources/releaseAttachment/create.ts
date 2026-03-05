import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';

const showOnlyForReleaseAttachmentCreate = {
	operation: ['create'],
	resource: ['releaseAttachment'],
};

const showOnlyForReleaseAttachmentCreateBinary = {
	operation: ['create'],
	resource: ['releaseAttachment'],
	releaseAttachmentSource: ['binary'],
};

const showOnlyForReleaseAttachmentCreateExternal = {
	operation: ['create'],
	resource: ['releaseAttachment'],
	releaseAttachmentSource: ['externalUrl'],
};

export const releaseAttachmentCreateDescription: INodeProperties[] = [
	{
		displayName: 'Attachment Name',
		name: 'attachmentName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForReleaseAttachmentCreate,
		},
		description: 'Optional display name for the attachment',
	},
	{
		displayName: 'Source',
		name: 'releaseAttachmentSource',
		type: 'options',
		displayOptions: {
			show: showOnlyForReleaseAttachmentCreate,
		},
		options: [
			{
				name: 'Binary File',
				value: 'binary',
			},
			{
				name: 'External URL',
				value: 'externalUrl',
			},
		],
		default: 'binary',
		description: 'Whether to upload a binary file or register an external URL',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		displayOptions: {
			show: showOnlyForReleaseAttachmentCreateBinary,
		},
		default: 'data',
		required: true,
		description: 'Name of the binary property that contains the file to upload',
	},
	{
		displayName: 'External URL',
		name: 'externalUrl',
		type: 'string',
		displayOptions: {
			show: showOnlyForReleaseAttachmentCreateExternal,
		},
		default: '',
		required: true,
		placeholder: 'https://example.com/my-asset.zip',
		description: 'External URL to attach instead of uploading a file',
	},
];

export async function executeReleaseAttachmentCreate(
	this: IExecuteFunctions,
): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const credentials = await this.getCredentials<{ serverUrl: string }>('giteaForgejoApi');
	const baseURL = `${credentials.serverUrl.replace(/\/$/, '')}/api/v1`;

	for (let i = 0; i < items.length; i++) {
		try {
			const owner = this.getNodeParameter('owner', i) as string;
			const repository = this.getNodeParameter('repository', i) as string;
			const releaseId = this.getNodeParameter('releaseId', i) as string;
			const source = this.getNodeParameter('releaseAttachmentSource', i) as
				| 'binary'
				| 'externalUrl';
			const attachmentName = this.getNodeParameter('attachmentName', i, '') as string;

			const formData = new FormData();

			if (source === 'binary') {
				const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
				const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
				const binaryBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
				const mimeType = binaryData.mimeType || 'application/octet-stream';
				const filename = binaryData.fileName || 'attachment';
				const blob = new Blob([new Uint8Array(binaryBuffer)], { type: mimeType });

				formData.append('attachment', blob, filename);
			} else {
				const externalUrl = this.getNodeParameter('externalUrl', i) as string;
				formData.append('external_url', externalUrl);
			}

			const response = await this.helpers.httpRequestWithAuthentication.call(
				this,
				'giteaForgejoApi',
				{
					baseURL,
					body: formData as unknown as IDataObject,
					headers: {
						Accept: 'application/json',
					},
					json: false,
					method: 'POST',
					qs: attachmentName ? { name: attachmentName } : undefined,
					url: `/repos/${owner}/${repository}/releases/${releaseId}/assets`,
				},
			);

			returnData.push(...this.helpers.returnJsonArray(response as IDataObject));
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({
					json: {
						error:
							error instanceof Error ? error.message : `Unknown error: ${JSON.stringify(error)}`,
					},
					pairedItem: {
						item: i,
					},
				});
				continue;
			}

			throw error;
		}
	}

	return [returnData];
}
