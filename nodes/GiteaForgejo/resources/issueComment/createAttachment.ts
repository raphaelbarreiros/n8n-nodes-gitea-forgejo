import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeIssueCommentCreateAttachment(
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
			const issueCommentId = this.getNodeParameter('issueCommentId', i) as string;
			const binaryPropertyName = this.getNodeParameter(
				'issueCommentCreateAttachmentBinaryPropertyName',
				i,
			) as string;
			const attachmentName = this.getNodeParameter(
				'issueCommentCreateAttachmentName',
				i,
				'',
			) as string;
			const updatedAt = this.getNodeParameter(
				'issueCommentCreateAttachmentUpdatedAt',
				i,
				'',
			) as string;

			const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
			const binaryBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
			const mimeType = binaryData.mimeType || 'application/octet-stream';
			const filename = binaryData.fileName || 'attachment';

			const formData = new FormData();
			const blob = new Blob([new Uint8Array(binaryBuffer)], { type: mimeType });
			formData.append('attachment', blob, filename);

			const qs: IDataObject = {};
			if (attachmentName) qs.name = attachmentName;
			if (updatedAt) qs.updated_at = updatedAt;

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
					qs: Object.keys(qs).length ? qs : undefined,
					url: `/repos/${owner}/${repository}/issues/comments/${issueCommentId}/assets`,
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
