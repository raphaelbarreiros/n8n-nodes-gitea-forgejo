import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRepositoryKeyCreate = {
	operation: ['create'],
	resource: ['repositoryKey'],
};

export const repositoryKeyCreateDescription: INodeProperties[] = [
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		default: '',
		description: 'Armored SSH public key to add',
		displayOptions: {
			show: showOnlyForRepositoryKeyCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'key',
			},
		},
	},
	{
		displayName: 'Read-Only',
		name: 'readOnly',
		type: 'boolean',
		default: true,
		description: 'Whether to add the key with read-only access',
		displayOptions: {
			show: showOnlyForRepositoryKeyCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'read_only',
			},
		},
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		description: 'Display title for the repository key',
		displayOptions: {
			show: showOnlyForRepositoryKeyCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'title',
			},
		},
	},
];
