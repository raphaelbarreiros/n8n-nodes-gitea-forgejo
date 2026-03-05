import type { INodeProperties } from 'n8n-workflow';

export const packageDescription: INodeProperties[] = [
	{
		displayName: 'Owner',
		name: 'packageOwner',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['package'],
			},
		},
		description: 'Owner of the packages (user or organization)',
	},
	{
		displayName: 'Package Type',
		name: 'packageType',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['package'],
				operation: ['delete', 'get', 'getFiles', 'linkRepo', 'unlinkRepo'],
			},
		},
		description: 'Type of the package (e.g. npm, maven, pypi, container)',
	},
	{
		displayName: 'Package Name',
		name: 'packageName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['package'],
				operation: ['delete', 'get', 'getFiles', 'linkRepo', 'unlinkRepo'],
			},
		},
		description: 'Name of the package',
	},
	{
		displayName: 'Package Version',
		name: 'packageVersion',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['package'],
				operation: ['delete', 'get', 'getFiles'],
			},
		},
		description: 'Version of the package',
	},
	{
		displayName: 'Repository Name',
		name: 'linkedRepoName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['package'],
				operation: ['linkRepo'],
			},
		},
		description: 'Name of the repository to link to the package',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['package'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
				routing: {
					request: {
						qs: {
							limit: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number of results to return',
				routing: {
					request: {
						qs: {
							page: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Search query to filter packages',
				routing: {
					request: {
						qs: {
							q: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: '',
				description: 'Package type to filter by',
				routing: {
					request: {
						qs: {
							type: '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
];
