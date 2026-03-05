import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRepositoryContentCreate = {
	operation: ['create'],
	resource: ['repositoryContent'],
};

export const repositoryContentCreateDescription: INodeProperties[] = [
	{
		displayName: 'File Path',
		name: 'filepath',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'docs/guide.md',
		description: 'Path where the file will be created',
		displayOptions: {
			show: showOnlyForRepositoryContentCreate,
		},
	},
	{
		displayName: 'Content (Base64)',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		default: '',
		description: 'File content encoded as base64',
		displayOptions: {
			show: showOnlyForRepositoryContentCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'content',
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
		displayOptions: {
			show: showOnlyForRepositoryContentCreate,
		},
		default: {},
		options: [
			{
				displayName: 'Author',
				name: 'author',
				type: 'json',
				default: '{}',
				description: 'Author identity object',
				routing: {
					request: {
						body: {
							author: '={{Object.keys($value || {}).length ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Branch',
				name: 'branch',
				type: 'string',
				default: '',
				description: 'Base branch for the change',
				routing: {
					request: {
						body: {
							branch: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Committer',
				name: 'committer',
				type: 'json',
				default: '{}',
				description: 'Committer identity object',
				routing: {
					request: {
						body: {
							committer: '={{Object.keys($value || {}).length ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Dates',
				name: 'dates',
				type: 'json',
				default: '{}',
				description: 'Commit date options object',
				routing: {
					request: {
						body: {
							dates: '={{Object.keys($value || {}).length ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				description: 'Commit message',
				routing: {
					request: {
						body: {
							message: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'New Branch',
				name: 'newBranch',
				type: 'string',
				default: '',
				description: 'Create change on a new branch',
				routing: {
					request: {
						body: {
							new_branch: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Sign Off',
				name: 'signoff',
				type: 'boolean',
				default: false,
				description: 'Whether to add a Signed-off-by trailer',
				routing: {
					request: {
						body: {
							signoff: '={{$value}}',
						},
					},
				},
			},
		],
	},
];
