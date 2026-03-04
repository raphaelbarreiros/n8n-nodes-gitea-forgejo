import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { issueDescription } from './resources/issue';
import { issueCommentDescription } from './resources/issueComment';
import { repositoryDescription } from './resources/repository';
import { userDescription } from './resources/user';
import { getOwners } from './listSearch/getOwners';
import { getUsers } from './listSearch/getUsers';
import { getRepositories } from './listSearch/getRepositories';
import { getIssues } from './listSearch/getIssues';

export class GiteaForgejo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Gitea/Forgejo',
		name: 'giteaForgejo',
		icon: {
			light: 'file:../../icons/gitea-forgejo.svg',
			dark: 'file:../../icons/gitea-forgejo.dark.svg',
		},
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Gitea and Forgejo API',
		defaults: {
			name: 'Gitea/Forgejo',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'giteaForgejoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.serverUrl.replace(new RegExp("/$"), "") + "/api/v1"}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Repository',
						value: 'repository',
					},
					{
						name: 'Issue',
						value: 'issue',
					},
					{
						name: 'Issue Comment',
						value: 'issueComment',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'repository',
			},
			...repositoryDescription,
			...issueDescription,
			...issueCommentDescription,
			...userDescription,
		],
	};

	methods = {
		listSearch: {
			getOwners,
			getUsers,
			getRepositories,
			getIssues,
		},
	};
}
