import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRepositoryTemplateGenerate = {
	operation: ['generate'],
	resource: ['repositoryTemplate'],
};

export const repositoryTemplateGenerateDescription: INodeProperties[] = [
	{
		displayName: 'New Owner',
		name: 'newOwner',
		type: 'string',
		required: true,
		default: '',
		description: 'The user or organization that will own the new repository',
		displayOptions: {
			show: showOnlyForRepositoryTemplateGenerate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'owner',
			},
		},
	},
	{
		displayName: 'New Repository Name',
		name: 'newRepositoryName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the new repository to create',
		displayOptions: {
			show: showOnlyForRepositoryTemplateGenerate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Option',
		},
		default: {},
		displayOptions: {
			show: showOnlyForRepositoryTemplateGenerate,
		},
		options: [
			{
				displayName: 'Avatar',
				name: 'avatar',
				type: 'boolean',
				default: false,
				description: 'Whether to include the template repository avatar',
				routing: {
					request: {
						body: {
							avatar: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Default Branch',
				name: 'defaultBranch',
				type: 'string',
				default: '',
				description: 'Default branch name for the new repository',
				routing: {
					request: {
						body: {
							default_branch: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the new repository',
				routing: {
					request: {
						body: {
							description: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Git Content',
				name: 'gitContent',
				type: 'boolean',
				default: false,
				description: 'Whether to include default branch git content from template',
				routing: {
					request: {
						body: {
							git_content: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Git Hooks',
				name: 'gitHooks',
				type: 'boolean',
				default: false,
				description: 'Whether to include git hooks from template',
				routing: {
					request: {
						body: {
							git_hooks: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'boolean',
				default: false,
				description: 'Whether to include labels from template',
				routing: {
					request: {
						body: {
							labels: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Private',
				name: 'private',
				type: 'boolean',
				default: false,
				description: 'Whether the new repository should be private',
				routing: {
					request: {
						body: {
							private: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Protected Branch',
				name: 'protectedBranch',
				type: 'boolean',
				default: false,
				description: 'Whether to include protected branch rules from template',
				routing: {
					request: {
						body: {
							protected_branch: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Topics',
				name: 'topics',
				type: 'boolean',
				default: false,
				description: 'Whether to include topics from template',
				routing: {
					request: {
						body: {
							topics: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Webhooks',
				name: 'webhooks',
				type: 'boolean',
				default: false,
				description: 'Whether to include webhooks from template',
				routing: {
					request: {
						body: {
							webhooks: '={{$value}}',
						},
					},
				},
			},
		],
	},
];
