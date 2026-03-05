import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export async function executeMiscellaneousGetNodeInfo(
	this: IExecuteFunctions,
): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];
	const credentials = await this.getCredentials<{ serverUrl: string }>('giteaForgejoApi');
	const baseURL = `${credentials.serverUrl.replace(/\/$/, '')}/api/v1`;

	for (let i = 0; i < items.length; i++) {
		try {
			const response = await this.helpers.httpRequestWithAuthentication.call(
				this,
				'giteaForgejoApi',
				{
					baseURL,
					method: 'GET',
					url: '/nodeinfo',
					json: true,
				},
			);

			returnData.push({
				json: response as IDataObject,
				pairedItem: { item: i },
			});
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({
					json: {
						error:
							error instanceof Error ? error.message : `Unknown error: ${JSON.stringify(error)}`,
					},
					pairedItem: { item: i },
				});
				continue;
			}

			throw error;
		}
	}

	return [returnData];
}
