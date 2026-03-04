import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GiteaForgejoApi implements ICredentialType {
	name = 'giteaForgejoApi';

	displayName = 'Gitea/Forgejo API';

	icon: Icon = {
		light: 'file:../icons/gitea-forgejo.svg',
		dark: 'file:../icons/gitea-forgejo.dark.svg',
	};

	documentationUrl = 'https://forgejo.org/docs/latest/user/api-usage/';

	properties: INodeProperties[] = [
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'string',
			default: 'https://codeberg.org',
			placeholder: 'https://git.example.com',
			required: true,
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=token {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.serverUrl.replace(new RegExp("/$"), "") + "/api/v1"}}',
			url: '/user',
			method: 'GET',
		},
	};
}
