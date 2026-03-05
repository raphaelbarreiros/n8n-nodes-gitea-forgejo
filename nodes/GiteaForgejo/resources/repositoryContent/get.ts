import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRepositoryContentGet = {
	operation: ['get'],
	resource: ['repositoryContent'],
};

export const repositoryContentGetDescription: INodeProperties[] = [
	{
		displayName: 'File Path',
		name: 'filePath',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'README.md',
		description: 'Path to file or directory in the repository',
		displayOptions: {
			show: showOnlyForRepositoryContentGet,
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		displayOptions: {
			show: showOnlyForRepositoryContentGet,
		},
		default: {},
		options: [
			{
				displayName: 'Reference',
				name: 'ref',
				type: 'string',
				default: '',
				description: 'Git reference to read from (branch, tag, or SHA)',
				routing: {
					request: {
						qs: {
							ref: '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
];
