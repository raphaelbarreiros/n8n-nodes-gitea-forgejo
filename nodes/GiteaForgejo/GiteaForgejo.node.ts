import {
	NodeConnectionTypes,
	type IHttpRequestMethods,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { issueDescription } from './resources/issue';
import { issueCommentDescription } from './resources/issueComment';
import { repositoryDescription } from './resources/repository';
import { pullRequestDescription } from './resources/pullRequest';
import { userDescription } from './resources/user';
import { getOperations } from './loadOptions/getOperations';
import { getOwners } from './listSearch/getOwners';
import { getUsers } from './listSearch/getUsers';
import { getRepositories } from './listSearch/getRepositories';
import { getIssues } from './listSearch/getIssues';
import { getPullRequests } from './listSearch/getPullRequests';

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
						name: 'Issue',
						value: 'issue',
					},
					{
						name: 'Issue Comment',
						value: 'issueComment',
					},
					{
						name: 'Pull Request',
						value: 'pullRequest',
					},
					{
						name: 'Repository',
						value: 'repository',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'repository',
			},
			{
				displayName: 'Operation Name or ID',
				name: 'operation',
				type: 'options',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				noDataExpression: true,
				typeOptions: {
					loadOptionsMethod: 'getOperations',
					loadOptionsDependsOn: ['resource'],
				},
				routing: {
					request: {
						method:
							'={{ ({ repository: { get: "GET", getMany: "GET" }, issue: { create: "POST", get: "GET", getAll: "GET" }, issueComment: { create: "POST", getAll: "GET" }, pullRequest: { create: "POST", get: "GET", getAll: "GET", merge: "POST", update: "PATCH" }, user: { get: "GET", getAuthenticated: "GET" } }[$parameter.resource] ?? {})[$value] }}' as unknown as IHttpRequestMethods,
						url: '={{ ({ repository: { get: "/repos/" + $parameter.owner + "/" + $parameter.repository, getMany: ($parameter.ownerType === "organization" ? "/orgs/" + $parameter.owner + "/repos" : "/users/" + $parameter.owner + "/repos") }, issue: { create: "/repos/" + $parameter.owner + "/" + $parameter.repository + "/issues", get: "/repos/" + $parameter.owner + "/" + $parameter.repository + "/issues/" + $parameter.issue, getAll: "/repos/" + $parameter.owner + "/" + $parameter.repository + "/issues" }, issueComment: { create: "/repos/" + $parameter.owner + "/" + $parameter.repository + "/issues/" + $parameter.issue + "/comments", getAll: "/repos/" + $parameter.owner + "/" + $parameter.repository + "/issues/" + $parameter.issue + "/comments" }, pullRequest: { create: "/repos/" + $parameter.owner + "/" + $parameter.repository + "/pulls", get: "/repos/" + $parameter.owner + "/" + $parameter.repository + "/pulls/" + $parameter.pullRequest, getAll: "/repos/" + $parameter.owner + "/" + $parameter.repository + "/pulls", merge: "/repos/" + $parameter.owner + "/" + $parameter.repository + "/pulls/" + $parameter.pullRequest + "/merge", update: "/repos/" + $parameter.owner + "/" + $parameter.repository + "/pulls/" + $parameter.pullRequest }, user: { get: "/users/" + $parameter.username, getAuthenticated: "/user" } }[$parameter.resource] ?? {})[$value] }}',
					},
				},
				default: '',
			},
			...repositoryDescription,
			...issueDescription,
			...issueCommentDescription,
			...pullRequestDescription,
			...userDescription,
		],
	};

	methods = {
		loadOptions: {
			getOperations,
		},
		listSearch: {
			getOwners,
			getUsers,
			getRepositories,
			getIssues,
			getPullRequests,
		},
	};
}
