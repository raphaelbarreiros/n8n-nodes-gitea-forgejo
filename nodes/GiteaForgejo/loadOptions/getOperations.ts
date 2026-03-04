import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

const operationsByResource: Record<string, INodePropertyOptions[]> = {
	repository: [
		{
			name: 'Get Many',
			value: 'getMany',
			action: 'Get repositories for an owner',
			description: 'Get repositories for an owner',
			routing: {
				request: {
					method: 'GET',
					url: '={{$parameter.ownerType === "organization" ? "/orgs/" + $parameter.owner + "/repos" : "/users/" + $parameter.owner + "/repos"}}',
				},
			},
		},
		{
			name: 'Get',
			value: 'get',
			action: 'Get a repository',
			description: 'Get a repository by owner and name',
			routing: {
				request: {
					method: 'GET',
					url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}',
				},
			},
		},
	],
	issue: [
		{
			name: 'Get Many',
			value: 'getAll',
			action: 'Get issues in a repository',
			description: 'Get issues in a repository',
			routing: {
				request: {
					method: 'GET',
					url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues',
				},
			},
		},
		{
			name: 'Get',
			value: 'get',
			action: 'Get an issue',
			description: 'Get the data of a single issue',
			routing: {
				request: {
					method: 'GET',
					url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues/{{$parameter.issue}}',
				},
			},
		},
		{
			name: 'Create',
			value: 'create',
			action: 'Create an issue',
			description: 'Create a new issue',
			routing: {
				request: {
					method: 'POST',
					url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues',
				},
			},
		},
	],
	issueComment: [
		{
			name: 'Get Many',
			value: 'getAll',
			action: 'Get many comments on an issue',
			description: 'Get many comments on an issue',
			routing: {
				request: {
					method: 'GET',
					url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues/{{$parameter.issue}}/comments',
				},
			},
		},
		{
			name: 'Create',
			value: 'create',
			action: 'Create an issue comment',
			description: 'Create a comment on an issue',
			routing: {
				request: {
					method: 'POST',
					url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/issues/{{$parameter.issue}}/comments',
				},
			},
		},
	],
	pullRequest: [
		{
			name: 'Get Many',
			value: 'getAll',
			action: 'List pull requests',
			description: 'List pull requests for a repository',
			routing: {
				request: {
					method: 'GET',
					url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/pulls',
				},
			},
		},
		{
			name: 'Get',
			value: 'get',
			action: 'Get a pull request',
			description: 'Retrieve a single pull request by number',
			routing: {
				request: {
					method: 'GET',
					url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/pulls/{{$parameter.pullRequest}}',
				},
			},
		},
		{
			name: 'Create',
			value: 'create',
			action: 'Create a pull request',
			description: 'Create a new pull request',
			routing: {
				request: {
					method: 'POST',
					url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/pulls',
				},
			},
		},
		{
			name: 'Update',
			value: 'update',
			action: 'Update a pull request',
			description: 'Modify fields on an existing pull request',
			routing: {
				request: {
					method: 'PATCH',
					url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/pulls/{{$parameter.pullRequest}}',
				},
			},
		},
		{
			name: 'Merge',
			value: 'merge',
			action: 'Merge a pull request',
			description: 'Merge a pull request with a selectable strategy',
			routing: {
				request: {
					method: 'POST',
					url: '=/repos/{{$parameter.owner}}/{{$parameter.repository}}/pulls/{{$parameter.pullRequest}}/merge',
				},
			},
		},
	],
	user: [
		{
			name: 'Get Authenticated',
			value: 'getAuthenticated',
			action: 'Get the authenticated user',
			description: 'Get the authenticated user',
			routing: {
				request: {
					method: 'GET',
					url: '/user',
				},
			},
		},
		{
			name: 'Get',
			value: 'get',
			action: 'Get a user by username',
			description: 'Get a user by username',
			routing: {
				request: {
					method: 'GET',
					url: '=/users/{{$parameter.username}}',
				},
			},
		},
	],
};

export async function getOperations(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const resource = this.getCurrentNodeParameter('resource') as string;

	return operationsByResource[resource] ?? [];
}
