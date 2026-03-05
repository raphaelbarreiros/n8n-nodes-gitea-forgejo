import type { INodeProperties } from 'n8n-workflow';

const r = 'organization';

const showOrg = {
	resource: [r],
	operation: [
		'blockUser',
		'createActionVariable',
		'createHook',
		'createLabel',
		'createRepo',
		'createTeam',
		'delete',
		'deleteActionSecret',
		'deleteActionVariable',
		'deleteAvatar',
		'deleteHook',
		'deleteLabel',
		'deleteMember',
		'deletePublicMember',
		'get',
		'getActionSecrets',
		'getActionVariable',
		'getActionVariables',
		'getActivityFeeds',
		'getHook',
		'getLabel',
		'getManyHooks',
		'getManyLabels',
		'getManyMembers',
		'getManyPublicMembers',
		'getManyRepos',
		'getManyTeams',
		'getMember',
		'getPublicMember',
		'getQuota',
		'getQuotaArtifacts',
		'getQuotaAttachments',
		'getQuotaCheck',
		'getQuotaPackages',
		'getRunnerJobs',
		'getRunnerRegistrationToken',
		'listBlockedUsers',
		'rename',
		'searchTeams',
		'setPublicMember',
		'unblockUser',
		'update',
		'updateActionVariable',
		'updateAvatar',
		'updateHook',
		'updateLabel',
		'upsertActionSecret',
	],
};

const showCreate = { resource: [r], operation: ['create'] };
const showUpdate = { resource: [r], operation: ['update'] };
const showTargetUsername = {
	resource: [r],
	operation: [
		'blockUser',
		'deleteMember',
		'deletePublicMember',
		'getMember',
		'getPublicMember',
		'setPublicMember',
		'unblockUser',
	],
};
const showHookId = { resource: [r], operation: ['deleteHook', 'getHook', 'updateHook'] };
const showLabelId = { resource: [r], operation: ['deleteLabel', 'getLabel', 'updateLabel'] };
const showActionSecretName = {
	resource: [r],
	operation: ['deleteActionSecret', 'upsertActionSecret'],
};
const showActionVariableName = {
	resource: [r],
	operation: [
		'createActionVariable',
		'deleteActionVariable',
		'getActionVariable',
		'updateActionVariable',
	],
};
const showUpsertSecret = { resource: [r], operation: ['upsertActionSecret'] };
const showActionVarWrite = {
	resource: [r],
	operation: ['createActionVariable', 'updateActionVariable'],
};
const showCreateHook = { resource: [r], operation: ['createHook'] };
const showCreateOrUpdateHook = { resource: [r], operation: ['createHook', 'updateHook'] };
const showCreateLabel = { resource: [r], operation: ['createLabel'] };
const showUpdateLabel = { resource: [r], operation: ['updateLabel'] };
const showCreateRepo = { resource: [r], operation: ['createRepo'] };
const showCreateTeam = { resource: [r], operation: ['createTeam'] };
const showRename = { resource: [r], operation: ['rename'] };
const showUpdateAvatar = { resource: [r], operation: ['updateAvatar'] };

const paginatedOps = [
	'getActionSecrets',
	'getActionVariables',
	'getAll',
	'getManyHooks',
	'getManyLabels',
	'getManyMembers',
	'getManyPublicMembers',
	'getManyRepos',
	'getManyTeams',
	'getQuotaArtifacts',
	'getQuotaAttachments',
	'getQuotaPackages',
	'listBlockedUsers',
	'searchTeams',
];

export const organizationDescription: INodeProperties[] = [
	// --- Org path param ---
	{
		displayName: 'Organization',
		name: 'org',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. my-org',
		displayOptions: { show: showOrg },
	},

	// --- create body ---
	{
		displayName: 'Username',
		name: 'orgUsername',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. my-org',
		description: 'The organization username (login name)',
		displayOptions: { show: showCreate },
		routing: { send: { property: 'username', type: 'body' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showCreate },
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				routing: { send: { property: 'description', type: 'body' } },
			},
			{
				displayName: 'Full Name',
				name: 'full_name',
				type: 'string',
				default: '',
				routing: { send: { property: 'full_name', type: 'body' } },
			},
			{
				displayName: 'Location',
				name: 'location',
				type: 'string',
				default: '',
				routing: { send: { property: 'location', type: 'body' } },
			},
			{
				displayName: 'Repo Admin Change Team Access',
				name: 'repo_admin_change_team_access',
				type: 'boolean',
				default: false,
				description: 'Whether repo admins can change team access',
				routing: { send: { property: 'repo_admin_change_team_access', type: 'body' } },
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'options',
				default: 'public',
				options: [
					{ name: 'Limited', value: 'limited' },
					{ name: 'Private', value: 'private' },
					{ name: 'Public', value: 'public' },
				],
				routing: { send: { property: 'visibility', type: 'body' } },
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				routing: { send: { property: 'website', type: 'body' } },
			},
		],
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
				displayName: 'Full Name',
				name: 'full_name',
				type: 'string',
				default: '',
				routing: { send: { property: 'full_name', type: 'body' } },
			},
			{
				displayName: 'Location',
				name: 'location',
				type: 'string',
				default: '',
				routing: { send: { property: 'location', type: 'body' } },
			},
			{
				displayName: 'Repo Admin Change Team Access',
				name: 'repo_admin_change_team_access',
				type: 'boolean',
				default: false,
				description: 'Whether repo admins can change team access',
				routing: { send: { property: 'repo_admin_change_team_access', type: 'body' } },
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'options',
				default: 'public',
				options: [
					{ name: 'Limited', value: 'limited' },
					{ name: 'Private', value: 'private' },
					{ name: 'Public', value: 'public' },
				],
				routing: { send: { property: 'visibility', type: 'body' } },
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				routing: { send: { property: 'website', type: 'body' } },
			},
		],
	},

	// --- targetUsername ---
	{
		displayName: 'Username',
		name: 'targetUsername',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. forgejo',
		displayOptions: { show: showTargetUsername },
	},

	// --- hookId ---
	{
		displayName: 'Hook ID',
		name: 'hookId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 7',
		displayOptions: { show: showHookId },
	},

	// --- labelId ---
	{
		displayName: 'Label ID',
		name: 'labelId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 3',
		displayOptions: { show: showLabelId },
	},

	// --- actionSecretName ---
	{
		displayName: 'Secret Name',
		name: 'actionSecretName',
		type: 'string',
		typeOptions: { password: true },
		required: true,
		default: '',
		placeholder: 'e.g. MY_SECRET',
		displayOptions: { show: showActionSecretName },
	},

	// --- actionVariableName ---
	{
		displayName: 'Variable Name',
		name: 'actionVariableName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. MY_VAR',
		displayOptions: { show: showActionVariableName },
	},

	// --- upsert secret body ---
	{
		displayName: 'Secret Value',
		name: 'secretData',
		type: 'string',
		required: true,
		default: '',
		typeOptions: { password: true },
		displayOptions: { show: showUpsertSecret },
		routing: { send: { property: 'data', type: 'body' } },
	},

	// --- action variable body ---
	{
		displayName: 'Value',
		name: 'variableValue',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showActionVarWrite },
		routing: { send: { property: 'value', type: 'body' } },
	},

	// --- createHook type ---
	{
		displayName: 'Hook Type',
		name: 'hookType',
		type: 'options',
		required: true,
		default: 'gitea',
		options: [
			{ name: 'Dingtalk', value: 'dingtalk' },
			{ name: 'Discord', value: 'discord' },
			{ name: 'Feishu', value: 'feishu' },
			{ name: 'Gitea', value: 'gitea' },
			{ name: 'Gogs', value: 'gogs' },
			{ name: 'MSTeams', value: 'msteams' },
			{ name: 'Packagist', value: 'packagist' },
			{ name: 'Slack', value: 'slack' },
			{ name: 'Telegram', value: 'telegram' },
			{ name: 'Wechatwork', value: 'wechatwork' },
		],
		displayOptions: { show: showCreateHook },
		routing: { send: { property: 'type', type: 'body' } },
	},
	{
		displayName: 'Hook Config',
		name: 'hookConfig',
		type: 'json',
		required: true,
		default: '{"url":"","content_type":"json"}',
		displayOptions: { show: showCreateOrUpdateHook },
		routing: { send: { property: 'config', type: 'body' } },
	},
	{
		displayName: 'Active',
		name: 'hookActive',
		type: 'boolean',
		default: true,
		description: 'Whether the hook is active',
		displayOptions: { show: showCreateOrUpdateHook },
		routing: { send: { property: 'active', type: 'body' } },
	},

	// --- createLabel body ---
	{
		displayName: 'Name',
		name: 'labelName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. bug',
		displayOptions: { show: showCreateLabel },
		routing: { send: { property: 'name', type: 'body' } },
	},
	{
		displayName: 'Color',
		name: 'labelColor',
		type: 'color',
		required: true,
		default: '#ee0701',
		displayOptions: { show: showCreateLabel },
		routing: { send: { property: 'color', type: 'body' } },
	},

	// --- updateLabel body ---
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showUpdateLabel },
		options: [
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: '#ee0701',
				routing: { send: { property: 'color', type: 'body' } },
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				routing: { send: { property: 'description', type: 'body' } },
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { send: { property: 'name', type: 'body' } },
			},
		],
	},

	// --- createRepo body ---
	{
		displayName: 'Repository Name',
		name: 'repoName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. my-repo',
		displayOptions: { show: showCreateRepo },
		routing: { send: { property: 'name', type: 'body' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showCreateRepo },
		options: [
			{
				displayName: 'Auto Init',
				name: 'auto_init',
				type: 'boolean',
				default: false,
				description: 'Whether to initialize this repository with a README',
				routing: { send: { property: 'auto_init', type: 'body' } },
			},
			{
				displayName: 'Default Branch',
				name: 'default_branch',
				type: 'string',
				default: 'main',
				routing: { send: { property: 'default_branch', type: 'body' } },
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				routing: { send: { property: 'description', type: 'body' } },
			},
			{
				displayName: 'Private',
				name: 'private',
				type: 'boolean',
				default: false,
				description: 'Whether the repository is private',
				routing: { send: { property: 'private', type: 'body' } },
			},
		],
	},

	// --- createTeam body ---
	{
		displayName: 'Team Name',
		name: 'teamName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. developers',
		displayOptions: { show: showCreateTeam },
		routing: { send: { property: 'name', type: 'body' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showCreateTeam },
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

	// --- rename body ---
	{
		displayName: 'New Name',
		name: 'newName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. new-org-name',
		displayOptions: { show: showRename },
		routing: { send: { property: 'new_name', type: 'body' } },
	},

	// --- updateAvatar body ---
	{
		displayName: 'Image (Base64)',
		name: 'avatarImage',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. data:image/png;base64,...',
		displayOptions: { show: showUpdateAvatar },
		routing: { send: { property: 'image', type: 'body' } },
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
