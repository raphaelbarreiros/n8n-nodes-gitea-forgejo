import type { INodeProperties } from 'n8n-workflow';

const r = 'team';

const showTeamId = {
	resource: [r],
	operation: [
		'addMember',
		'addRepo',
		'delete',
		'get',
		'getActivityFeeds',
		'getManyMembers',
		'getManyRepos',
		'getMember',
		'getRepo',
		'removeMember',
		'removeRepo',
		'update',
	],
};

const showTargetUsername = {
	resource: [r],
	operation: ['addMember', 'getMember', 'removeMember'],
};

const showOrgAndRepo = {
	resource: [r],
	operation: ['addRepo', 'getRepo', 'removeRepo'],
};

const showUpdate = { resource: [r], operation: ['update'] };

const paginatedOps = ['getActivityFeeds', 'getManyMembers', 'getManyRepos'];

export const teamDescription: INodeProperties[] = [
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 5',
		displayOptions: { show: showTeamId },
	},
	{
		displayName: 'Username',
		name: 'targetUsername',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. johndoe',
		displayOptions: { show: showTargetUsername },
	},
	{
		displayName: 'Organization',
		name: 'org',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. my-org',
		displayOptions: { show: showOrgAndRepo },
	},
	{
		displayName: 'Repository',
		name: 'repository',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. my-repo',
		displayOptions: { show: showOrgAndRepo },
	},

	// --- update body ---
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showUpdate },
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				routing: { send: { property: 'description', type: 'body' } },
			},
			{
				displayName: 'Includes All Repositories',
				name: 'includes_all_repositories',
				type: 'boolean',
				default: false,
				description: 'Whether the team has access to all repositories',
				routing: { send: { property: 'includes_all_repositories', type: 'body' } },
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { send: { property: 'name', type: 'body' } },
			},
			{
				displayName: 'Permission',
				name: 'permission',
				type: 'options',
				default: 'read',
				options: [
					{ name: 'Admin', value: 'admin' },
					{ name: 'None', value: 'none' },
					{ name: 'Owner', value: 'owner' },
					{ name: 'Read', value: 'read' },
					{ name: 'Write', value: 'write' },
				],
				routing: { send: { property: 'permission', type: 'body' } },
			},
		],
	},

	// --- Pagination ---
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [r], operation: paginatedOps } },
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
