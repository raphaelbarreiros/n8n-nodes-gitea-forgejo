import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';

const operationsByResource: Record<string, INodePropertyOptions[]> = {
	repository: [
		{
			name: 'Get',
			value: 'get',
			action: 'Get a repository',
			description: 'Get a repository by owner and name',
		},
		{
			name: 'Get Many',
			value: 'getMany',
			action: 'Get repositories for an owner',
			description: 'Get repositories for an owner',
		},
	],
	issue: [
		{
			name: 'Create',
			value: 'create',
			action: 'Create an issue',
			description: 'Create a new issue',
		},
		{
			name: 'Get',
			value: 'get',
			action: 'Get an issue',
			description: 'Get the data of a single issue',
		},
		{
			name: 'Get Many',
			value: 'getAll',
			action: 'Get issues in a repository',
			description: 'Get issues in a repository',
		},
	],
	issueComment: [
		{
			name: 'Create',
			value: 'create',
			action: 'Create an issue comment',
			description: 'Create a comment on an issue',
		},
		{
			name: 'Get Many',
			value: 'getAll',
			action: 'Get many comments on an issue',
			description: 'Get many comments on an issue',
		},
	],
	pullRequest: [
		{
			name: 'Create',
			value: 'create',
			action: 'Create a pull request',
			description: 'Create a new pull request',
		},
		{
			name: 'Get',
			value: 'get',
			action: 'Get a pull request',
			description: 'Retrieve a single pull request by number',
		},
		{
			name: 'Get Many',
			value: 'getAll',
			action: 'List pull requests',
			description: 'List pull requests for a repository',
		},
		{
			name: 'Merge',
			value: 'merge',
			action: 'Merge a pull request',
			description: 'Merge a pull request with a selectable strategy',
		},
		{
			name: 'Update',
			value: 'update',
			action: 'Update a pull request',
			description: 'Modify fields on an existing pull request',
		},
	],
	user: [
		{
			name: 'Get',
			value: 'get',
			action: 'Get a user by username',
			description: 'Get a user by username',
		},
		{
			name: 'Get Authenticated',
			value: 'getAuthenticated',
			action: 'Get the authenticated user',
			description: 'Get the authenticated user',
		},
	],
};

export async function getOperations(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const resource = this.getCurrentNodeParameter('resource') as string;

	return operationsByResource[resource] ?? [];
}
