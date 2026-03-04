import type { INodeProperties } from 'n8n-workflow';

export const ownerSelect: INodeProperties = {
	displayName: 'Repository Owner',
	name: 'owner',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'Repository Owner',
			name: 'list',
			type: 'list',
			placeholder: 'Select an owner...',
			typeOptions: {
				searchListMethod: 'getUsers',
				searchable: true,
				searchFilterRequired: false,
			},
		},
		{
			displayName: 'By Name',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. forgejo',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[-_.0-9a-zA-Z]+',
						errorMessage: 'Not a valid owner name',
					},
				},
			],
		},
	],
};

export const repositorySelect: INodeProperties = {
	displayName: 'Repository Name',
	name: 'repository',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'Repository Name',
			name: 'list',
			type: 'list',
			placeholder: 'Select a repository...',
			typeOptions: {
				searchListMethod: 'getRepositories',
				searchable: true,
			},
		},
		{
			displayName: 'By Name',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. forgejo',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[-_.0-9a-zA-Z]+',
						errorMessage: 'Not a valid repository name',
					},
				},
			],
		},
	],
};

export const issueSelect: INodeProperties = {
	displayName: 'Issue',
	name: 'issue',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'Issue',
			name: 'list',
			type: 'list',
			placeholder: 'Select an issue...',
			typeOptions: {
				searchListMethod: 'getIssues',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. 123',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'Not a valid issue number',
					},
				},
			],
		},
	],
};

export const usernameSelect: INodeProperties = {
	displayName: 'Username',
	name: 'username',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'Username',
			name: 'list',
			type: 'list',
			placeholder: 'Select a user...',
			typeOptions: {
				searchListMethod: 'getUsers',
				searchable: true,
				searchFilterRequired: false,
			},
		},
		{
			displayName: 'By Name',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. forgejo',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[-_.0-9a-zA-Z]+',
						errorMessage: 'Not a valid username',
					},
				},
			],
		},
	],
};
