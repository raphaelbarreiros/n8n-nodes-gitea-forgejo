import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';

const r = 'admin';

const showHookId = { resource: [r], operation: ['deleteHook', 'getHook', 'updateHook'] };
const showCronTask = { resource: [r], operation: ['runCronJob'] };
const showCreateHook = { resource: [r], operation: ['createHook'] };
const showCreateOrUpdateHook = { resource: [r], operation: ['createHook', 'updateHook'] };
const showQuotaGroup = {
	resource: [r],
	operation: [
		'addQuotaRule',
		'addUserToQuotaGroup',
		'deleteQuotaGroup',
		'deleteQuotaGroupRule',
		'getQuotaGroup',
		'getQuotaGroupUsers',
		'removeUserFromQuotaGroup',
	],
};
const showQuotaGroupWrite = {
	resource: [r],
	operation: ['createQuotaGroup'],
};
const showQuotaRule = {
	resource: [r],
	operation: [
		'addQuotaRule',
		'deleteQuotaGroupRule',
		'deleteQuotaRule',
		'getQuotaRule',
		'updateQuotaRule',
	],
};
const showCreateQuotaRule = { resource: [r], operation: ['createQuotaRule'] };
const showUpdateQuotaRule = { resource: [r], operation: ['updateQuotaRule'] };
const showUnadoptedRepo = { resource: [r], operation: ['adoptRepo', 'deleteUnadopted'] };
const showTargetUsername = {
	resource: [r],
	operation: [
		'addUserToQuotaGroup',
		'createUserOrg',
		'createUserPublicKey',
		'createUserRepo',
		'deleteUser',
		'deleteUserEmail',
		'deleteUserPublicKey',
		'getUserEmails',
		'getUserQuota',
		'removeUserFromQuotaGroup',
		'renameUser',
		'setUserQuotaGroup',
		'updateUser',
	],
};
const showKeyId = { resource: [r], operation: ['deleteUserPublicKey'] };
const showCreateUser = { resource: [r], operation: ['createUser'] };
const showUpdateUser = { resource: [r], operation: ['updateUser'] };
const showCreateUserKey = { resource: [r], operation: ['createUserPublicKey'] };
const showDeleteUserEmail = { resource: [r], operation: ['deleteUserEmail'] };
const showCreateUserOrg = { resource: [r], operation: ['createUserOrg'] };
const showSetUserQuotaGroup = { resource: [r], operation: ['setUserQuotaGroup'] };
const showRenameUser = { resource: [r], operation: ['renameUser'] };
const showCreateUserRepo = { resource: [r], operation: ['createUserRepo'] };

const paginatedOps = [
	'getAllEmails',
	'getCronJobs',
	'getManyHooks',
	'getManyOrgs',
	'getManyUnadopted',
	'getManyUsers',
	'getQuotaGroupUsers',
	'getQuotaGroups',
	'getQuotaRules',
	'getRunnerJobs',
];

export const adminDescription: INodeProperties[] = [
	// --- cronTask ---
	{
		displayName: 'Task Name',
		name: 'cronTask',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. run_task',
		displayOptions: { show: showCronTask },
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

	// --- createHook ---
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

	// --- quotaGroup ---
	{
		displayName: 'Quota Group',
		name: 'quotaGroup',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. default',
		displayOptions: { show: showQuotaGroup },
	},
	{
		displayName: 'Group Name',
		name: 'quotaGroupName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. default',
		displayOptions: { show: showQuotaGroupWrite },
		routing: { send: { property: 'name', type: 'body' } },
	},

	// --- quotaRule ---
	{
		displayName: 'Quota Rule',
		name: 'quotaRule',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. my-rule',
		displayOptions: { show: showQuotaRule },
	},
	{
		displayName: 'Rule Name',
		name: 'quotaRuleName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. my-rule',
		displayOptions: { show: showCreateQuotaRule },
		routing: { send: { property: 'name', type: 'body' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showUpdateQuotaRule },
		options: [
			{
				displayName: 'Kind',
				name: 'kind',
				type: 'string',
				default: '',
				routing: { send: { property: 'kind', type: 'body' } },
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
				default: 50,
				routing: { send: { property: 'limit', type: 'body' } },
			},
		],
	},

	// --- adoptRepo / deleteUnadopted ---
	{
		...ownerSelect,
		displayOptions: { show: showUnadoptedRepo },
	},
	{
		...repositorySelect,
		displayOptions: { show: showUnadoptedRepo },
	},

	// --- targetUsername ---
	{
		displayName: 'Username',
		name: 'targetUsername',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. johndoe',
		displayOptions: { show: showTargetUsername },
	},

	// --- keyId ---
	{
		displayName: 'Key ID',
		name: 'keyId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 5',
		displayOptions: { show: showKeyId },
	},

	// --- createUser body ---
	{
		displayName: 'Username',
		name: 'newUserUsername',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. johndoe',
		displayOptions: { show: showCreateUser },
		routing: { send: { property: 'username', type: 'body' } },
	},
	{
		displayName: 'Email',
		name: 'newUserEmail',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. user@example.com',
		displayOptions: { show: showCreateUser },
		routing: { send: { property: 'email', type: 'body' } },
	},
	{
		displayName: 'Login Name',
		name: 'newUserLoginName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. johndoe',
		displayOptions: { show: showCreateUser },
		routing: { send: { property: 'login_name', type: 'body' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showCreateUser },
		options: [
			{
				displayName: 'Must Change Password',
				name: 'must_change_password',
				type: 'boolean',
				default: false,
				description: 'Whether the user must change password on first login',
				routing: { send: { property: 'must_change_password', type: 'body' } },
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				routing: { send: { property: 'password', type: 'body' } },
			},
			{
				displayName: 'Send Notify',
				name: 'send_notify',
				type: 'boolean',
				default: false,
				description: 'Whether to send a notification to the user',
				routing: { send: { property: 'send_notify', type: 'body' } },
			},
			{
				displayName: 'Source ID',
				name: 'source_id',
				type: 'number',
				default: 0,
				routing: { send: { property: 'source_id', type: 'body' } },
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'string',
				default: '',
				routing: { send: { property: 'visibility', type: 'body' } },
			},
		],
	},

	// --- updateUser body ---
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showUpdateUser },
		options: [
			{
				displayName: 'Admin',
				name: 'admin',
				type: 'boolean',
				default: false,
				description: 'Whether the user is a site admin',
				routing: { send: { property: 'admin', type: 'body' } },
			},
			{
				displayName: 'Allow Create Organization',
				name: 'allow_create_organization',
				type: 'boolean',
				default: true,
				description: 'Whether the user is allowed to create organizations',
				routing: { send: { property: 'allow_create_organization', type: 'body' } },
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				routing: { send: { property: 'email', type: 'body' } },
			},
			{
				displayName: 'Full Name',
				name: 'full_name',
				type: 'string',
				default: '',
				routing: { send: { property: 'full_name', type: 'body' } },
			},
			{
				displayName: 'Login Name',
				name: 'login_name',
				type: 'string',
				default: '',
				routing: { send: { property: 'login_name', type: 'body' } },
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				routing: { send: { property: 'password', type: 'body' } },
			},
			{
				displayName: 'Prohibit Login',
				name: 'prohibit_login',
				type: 'boolean',
				default: false,
				description: 'Whether login is prohibited for the user',
				routing: { send: { property: 'prohibit_login', type: 'body' } },
			},
			{
				displayName: 'Restricted',
				name: 'restricted',
				type: 'boolean',
				default: false,
				description: 'Whether the user is restricted',
				routing: { send: { property: 'restricted', type: 'body' } },
			},
			{
				displayName: 'Source ID',
				name: 'source_id',
				type: 'number',
				default: 0,
				routing: { send: { property: 'source_id', type: 'body' } },
			},
			{
				displayName: 'Visibility',
				name: 'visibility',
				type: 'string',
				default: '',
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

	// --- createUserPublicKey body ---
	{
		displayName: 'Key Content',
		name: 'keyContent',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. ssh-rsa AAAA...',
		displayOptions: { show: showCreateUserKey },
		routing: { send: { property: 'key', type: 'body' } },
	},
	{
		displayName: 'Key Title',
		name: 'keyTitle',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. My Key',
		displayOptions: { show: showCreateUserKey },
		routing: { send: { property: 'title', type: 'body' } },
	},
	{
		displayName: 'Read Only',
		name: 'readOnly',
		type: 'boolean',
		default: false,
		description: 'Whether the key has read-only access',
		displayOptions: { show: showCreateUserKey },
		routing: { send: { property: 'read_only', type: 'body' } },
	},

	// --- deleteUserEmail body ---
	{
		displayName: 'Emails',
		name: 'emails',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. user@example.com',
		description: 'Comma-separated list of email addresses to delete',
		displayOptions: { show: showDeleteUserEmail },
		routing: { send: { property: 'emails', type: 'body', value: '={{ [$value] }}' } },
	},

	// --- createUserOrg body ---
	{
		displayName: 'Organization Username',
		name: 'orgUsername',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. my-org',
		displayOptions: { show: showCreateUserOrg },
		routing: { send: { property: 'username', type: 'body' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showCreateUserOrg },
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
		],
	},

	// --- setUserQuotaGroup body ---
	{
		displayName: 'Quota Group Name',
		name: 'quotaGroupForUser',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. default',
		displayOptions: { show: showSetUserQuotaGroup },
		routing: { send: { property: 'name', type: 'body' } },
	},

	// --- renameUser body ---
	{
		displayName: 'New Login',
		name: 'newLogin',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. newusername',
		displayOptions: { show: showRenameUser },
		routing: { send: { property: 'new_login', type: 'body' } },
	},

	// --- createUserRepo body ---
	{
		displayName: 'Repository Name',
		name: 'repoName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. my-repo',
		displayOptions: { show: showCreateUserRepo },
		routing: { send: { property: 'name', type: 'body' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showCreateUserRepo },
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
