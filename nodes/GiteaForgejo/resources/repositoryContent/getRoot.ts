import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRepositoryContentGetRoot = {
	operation: ['getRoot'],
	resource: ['repositoryContent'],
};

export const repositoryContentGetRootDescription: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		displayOptions: {
			show: showOnlyForRepositoryContentGetRoot,
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
