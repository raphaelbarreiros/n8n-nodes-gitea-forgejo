import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';

const showOnlyForRepositories = {
	resource: ['repository'],
};

const showOnlyForRepositoryGet = {
	resource: ['repository'],
	operation: ['get'],
};

const showOnlyForRepositoryGetMany = {
	resource: ['repository'],
	operation: ['getMany'],
};

export const repositoryDescription: INodeProperties[] = [
	{
		displayName: 'Owner Type',
		name: 'ownerType',
		type: 'options',
		displayOptions: {
			show: showOnlyForRepositoryGetMany,
		},
		options: [
			{
				name: 'User',
				value: 'user',
			},
			{
				name: 'Organization',
				value: 'organization',
			},
		],
		default: 'user',
		description: 'Whether the repository owner is a user or an organization',
	},
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForRepositories,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForRepositoryGet,
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForRepositoryGetMany,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
				type: 'query',
				property: 'limit',
				value: '100',
			},
			operations: {
				pagination: {
					type: 'generic',
					properties: {
						continue: '={{ Array.isArray($response.body) && $response.body.length === 100 }}',
						request: {
							qs: {
								page: '={{ Number($request.qs.page ?? 1) + 1 }}',
							},
						},
					},
				},
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForRepositoryGetMany,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
			output: {
				maxResults: '={{$value}}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForRepositoryGetMany,
		},
		description: 'Page number of results to return (1-based)',
		routing: {
			send: {
				type: 'query',
				property: 'page',
			},
		},
	},
];
