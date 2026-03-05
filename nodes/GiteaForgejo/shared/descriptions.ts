import type { INodeProperties } from 'n8n-workflow';

export const ownerSelect: INodeProperties = {
	displayName: 'Repository Owner',
	name: 'owner',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation'],
	},
	modes: [
		{
			displayName: 'Repository Owner',
			name: 'list',
			type: 'list',
			placeholder: 'Select an owner...',
			typeOptions: {
				searchListMethod: 'getOwners',
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

export const branchSelect: INodeProperties = {
	displayName: 'Branch',
	name: 'branch',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation', 'owner', 'repository'],
	},
	modes: [
		{
			displayName: 'Branch',
			name: 'list',
			type: 'list',
			placeholder: 'Select a branch...',
			typeOptions: {
				searchListMethod: 'getBranches',
				searchable: true,
			},
		},
		{
			displayName: 'By Name',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. main',
		},
	],
};

export const branchProtectionNameSelect: INodeProperties = {
	displayName: 'Branch Protection Rule',
	name: 'branchProtectionName',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation', 'owner', 'repository'],
	},
	modes: [
		{
			displayName: 'Branch Protection Rule',
			name: 'list',
			type: 'list',
			placeholder: 'Select a branch protection rule...',
			typeOptions: {
				searchListMethod: 'getBranchProtections',
				searchable: true,
			},
		},
		{
			displayName: 'By Name',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. main',
		},
	],
};

export const repositorySelect: INodeProperties = {
	displayName: 'Repository Name',
	name: 'repository',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation', 'owner'],
	},
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
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation', 'owner', 'repository'],
	},
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
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation'],
	},
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

export const collaboratorSelect: INodeProperties = {
	displayName: 'Collaborator',
	name: 'collaborator',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation'],
	},
	modes: [
		{
			displayName: 'Collaborator',
			name: 'list',
			type: 'list',
			placeholder: 'Select a collaborator...',
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
						errorMessage: 'Not a valid collaborator username',
					},
				},
			],
		},
	],
};

export const pullRequestSelect: INodeProperties = {
	displayName: 'Pull Request',
	name: 'pullRequest',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation', 'owner', 'repository'],
	},
	modes: [
		{
			displayName: 'Pull Request',
			name: 'list',
			type: 'list',
			placeholder: 'Select a pull request...',
			typeOptions: {
				searchListMethod: 'getPullRequests',
				searchable: true,
			},
		},
		{
			displayName: 'By Number',
			name: 'number',
			type: 'string',
			placeholder: 'e.g. 42',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'Not a valid pull request number',
					},
				},
			],
		},
	],
};

export const labelIdSelect: INodeProperties = {
	displayName: 'Label',
	name: 'labelId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation', 'owner', 'repository'],
	},
	modes: [
		{
			displayName: 'Label',
			name: 'list',
			type: 'list',
			placeholder: 'Select a label...',
			typeOptions: {
				searchListMethod: 'getLabels',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. 10',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'Not a valid label ID',
					},
				},
			],
		},
	],
};

export const labelIdentifierSelect: INodeProperties = {
	displayName: 'Label Identifier',
	name: 'labelIdentifier',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation', 'owner', 'repository'],
	},
	modes: [
		{
			displayName: 'Label',
			name: 'list',
			type: 'list',
			placeholder: 'Select a label...',
			typeOptions: {
				searchListMethod: 'getLabels',
				searchable: true,
			},
		},
		{
			displayName: 'By Identifier',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. bug or 10',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[-_.0-9a-zA-Z]+',
						errorMessage: 'Not a valid label identifier',
					},
				},
			],
		},
	],
};

export const milestoneIdSelect: INodeProperties = {
	displayName: 'Milestone',
	name: 'milestoneId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation', 'owner', 'repository'],
	},
	modes: [
		{
			displayName: 'Milestone',
			name: 'list',
			type: 'list',
			placeholder: 'Select a milestone...',
			typeOptions: {
				searchListMethod: 'getMilestones',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. 3',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'Not a valid milestone ID',
					},
				},
			],
		},
	],
};

export const releaseIdSelect: INodeProperties = {
	displayName: 'Release',
	name: 'releaseId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation', 'owner', 'repository'],
	},
	modes: [
		{
			displayName: 'Release',
			name: 'list',
			type: 'list',
			placeholder: 'Select a release...',
			typeOptions: {
				searchListMethod: 'getReleases',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. 12',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'Not a valid release ID',
					},
				},
			],
		},
	],
};

export const releaseAttachmentId: INodeProperties = {
	displayName: 'Attachment ID',
	name: 'attachmentId',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'e.g. 5',
};

export const repositoryKeyIdSelect: INodeProperties = {
	displayName: 'Repository Key',
	name: 'repositoryKeyId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation', 'owner', 'repository'],
	},
	modes: [
		{
			displayName: 'Repository Key',
			name: 'list',
			type: 'list',
			placeholder: 'Select a repository key...',
			typeOptions: {
				searchListMethod: 'getRepositoryKeys',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. 4',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'Not a valid key ID',
					},
				},
			],
		},
	],
};

export const webhookIdSelect: INodeProperties = {
	displayName: 'Webhook',
	name: 'webhookId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	typeOptions: {
		loadOptionsDependsOn: ['resource', 'operation', 'owner', 'repository'],
	},
	modes: [
		{
			displayName: 'Webhook',
			name: 'list',
			type: 'list',
			placeholder: 'Select a webhook...',
			typeOptions: {
				searchListMethod: 'getWebhooks',
				searchable: true,
			},
		},
		{
			displayName: 'By ID',
			name: 'name',
			type: 'string',
			placeholder: 'e.g. 2',
			validation: [
				{
					type: 'regex',
					properties: {
						regex: '[0-9]+',
						errorMessage: 'Not a valid webhook ID',
					},
				},
			],
		},
	],
};
