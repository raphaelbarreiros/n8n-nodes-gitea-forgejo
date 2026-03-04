import type {
	IDataObject,
	IExecuteFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

export async function giteaApiRequest(
	this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	qs: IDataObject = {},
	body: IDataObject | undefined = undefined,
) {
	const credentials = await this.getCredentials('giteaForgejoApi');
	const serverUrl = String(credentials.serverUrl ?? '').replace(/\/$/, '');

	const options: IHttpRequestOptions = {
		method,
		qs,
		body,
		url: `${serverUrl}/api/v1${resource}`,
		json: true,
	};

	return this.helpers.httpRequestWithAuthentication.call(this, 'giteaForgejoApi', options);
}
