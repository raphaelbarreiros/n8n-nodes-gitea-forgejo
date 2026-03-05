import type { INodeProperties } from 'n8n-workflow';
import { usernameSelect } from '../../shared/descriptions';

const r = 'users';

const showUsername = {
	resource: [r],
	operation: [
		'checkFollowing',
		'createToken',
		'deleteToken',
		'get',
		'getActivityFeeds',
		'getHeatmap',
		'getManyFollowers',
		'getManyFollowing',
		'getManyGPGKeys',
		'getManyOrgs',
		'getManyRepos',
		'getManySSHKeys',
		'getManyStarred',
		'getManySubscriptions',
		'getOrgPermissions',
		'getTokens',
	],
};

const showTargetUsername = { resource: [r], operation: ['checkFollowing'] };
const showOrg = { resource: [r], operation: ['getOrgPermissions'] };
const showTokenId = { resource: [r], operation: ['deleteToken'] };
const showCreateToken = { resource: [r], operation: ['createToken'] };
const showSearch = { resource: [r], operation: ['search'] };

const paginatedOps = [
	'getManyFollowers',
	'getManyFollowing',
	'getManyGPGKeys',
	'getManyOrgs',
	'getManyRepos',
	'getManySSHKeys',
	'getManyStarred',
	'getManySubscriptions',
	'getTokens',
];

export const usersDescription: INodeProperties[] = [
	{
		...usernameSelect,
		displayOptions: { show: showUsername },
	},
	{
		displayName: 'Target Username',
		name: 'targetUsername',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. forgejo',
		description: 'The username to check following status for',
		displayOptions: { show: showTargetUsername },
	},
	{
		displayName: 'Organization',
		name: 'org',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. my-org',
		displayOptions: { show: showOrg },
	},
	{
		displayName: 'Token ID',
		name: 'tokenId',
		type: 'number',
		required: true,
		default: 0,
		placeholder: 'e.g. 5',
		displayOptions: { show: showTokenId },
	},
	{
		displayName: 'Token Name',
		name: 'tokenName',
		type: 'string',
		typeOptions: { password: true },
		required: true,
		default: '',
		placeholder: 'e.g. my-token',
		displayOptions: { show: showCreateToken },
		routing: { send: { property: 'name', type: 'body' } },
	},

	// --- Search query ---
	{
		displayName: 'Query',
		name: 'q',
		type: 'string',
		default: '',
		placeholder: 'e.g. john',
		displayOptions: { show: showSearch },
		routing: { send: { property: 'q', type: 'query' } },
	},

	// --- Pagination ---
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [r], operation: [...paginatedOps, 'search'] } },
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
				default: 50,
				routing: { send: { property: 'limit', type: 'query' } },
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				routing: { send: { property: 'page', type: 'query' } },
			},
		],
	},
];
