import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';

const r = 'user';

const showTargetUsername = {
	resource: [r],
	operation: ['blockUser', 'checkFollowing', 'follow', 'unblockUser', 'unfollow'],
};
const showStarredRepo = {
	resource: [r],
	operation: ['checkStarring', 'starRepo', 'unstarRepo'],
};
const showOAuth2AppId = {
	resource: [r],
	operation: ['deleteOAuth2Application', 'getOAuth2Application', 'updateOAuth2Application'],
};
const showHookId = { resource: [r], operation: ['deleteHook', 'getHook', 'updateHook'] };
const showGpgKeyId = { resource: [r], operation: ['deleteGPGKey', 'getGPGKey'] };
const showSshKeyId = { resource: [r], operation: ['deleteSSHKey', 'getSSHKey'] };
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
const showAddEmail = { resource: [r], operation: ['addEmail'] };
const showDeleteEmail = { resource: [r], operation: ['deleteEmail'] };
const showCreateSSHKey = { resource: [r], operation: ['createSSHKey'] };
const showUpsertActionSecret = { resource: [r], operation: ['upsertActionSecret'] };
const showActionVariableWrite = {
	resource: [r],
	operation: ['createActionVariable', 'updateActionVariable'],
};
const showUpdateAvatar = { resource: [r], operation: ['updateAvatar'] };
const showCreateRepo = { resource: [r], operation: ['createRepo'] };
const showCreateGPGKey = { resource: [r], operation: ['createGPGKey'] };
const showCreateHookOrUpdate = { resource: [r], operation: ['createHook', 'updateHook'] };
const showCreateHook = { resource: [r], operation: ['createHook'] };
const showOAuth2AppWrite = {
	resource: [r],
	operation: ['createOAuth2Application', 'updateOAuth2Application'],
};
const showUpdateSettings = { resource: [r], operation: ['updateSettings'] };

const paginatedOps = [
	'getActionVariables',
	'getManyEmails',
	'getManyFollowers',
	'getManyFollowing',
	'getManyGPGKeys',
	'getManyHooks',
	'getManyOrgs',
	'getManyQuotaArtifacts',
	'getManyRepos',
	'getManySSHKeys',
	'getManyStarred',
	'getManyStopwatches',
	'getManySubscriptions',
	'getManyTeams',
	'getManyTrackedTimes',
	'getOAuth2Applications',
];

export const userDescription: INodeProperties[] = [
	// --- Path params ---
	{
		displayName: 'Target Username',
		name: 'targetUsername',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. forgejo',
		displayOptions: { show: showTargetUsername },
	},
	{
		...ownerSelect,
		displayOptions: { show: showStarredRepo },
	},
	{
		...repositorySelect,
		displayOptions: { show: showStarredRepo },
	},
	{
		displayName: 'OAuth2 Application ID',
		name: 'oauth2AppId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 3',
		displayOptions: { show: showOAuth2AppId },
	},
	{
		displayName: 'Hook ID',
		name: 'hookId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 7',
		displayOptions: { show: showHookId },
	},
	{
		displayName: 'GPG Key ID',
		name: 'gpgKeyId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 2',
		displayOptions: { show: showGpgKeyId },
	},
	{
		displayName: 'SSH Key ID',
		name: 'sshKeyId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 4',
		displayOptions: { show: showSshKeyId },
	},
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
	{
		displayName: 'Variable Name',
		name: 'actionVariableName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. MY_VAR',
		displayOptions: { show: showActionVariableName },
	},

	// --- Body params: addEmail ---
	{
		displayName: 'Emails',
		name: 'emails',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. user@example.com',
		description: 'Comma-separated list of email addresses',
		displayOptions: { show: showAddEmail },
		routing: {
			send: {
				property: 'emails',
				type: 'body',
				value: '={{ $value.split(",").map(s => s.trim()).filter(Boolean) }}',
			},
		},
	},

	// --- Body params: deleteEmail ---
	{
		displayName: 'Emails',
		name: 'emails',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. user@example.com',
		description: 'Comma-separated list of email addresses to delete',
		displayOptions: { show: showDeleteEmail },
		routing: {
			send: {
				property: 'emails',
				type: 'body',
				value: '={{ $value.split(",").map(s => s.trim()).filter(Boolean) }}',
			},
		},
	},

	// --- Body params: createSSHKey ---
	{
		displayName: 'Key Name',
		name: 'keyName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. My SSH Key',
		displayOptions: { show: showCreateSSHKey },
		routing: { send: { property: 'title', type: 'body' } },
	},
	{
		displayName: 'Key Content',
		name: 'keyContent',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. ssh-rsa AAAA...',
		displayOptions: { show: showCreateSSHKey },
		routing: { send: { property: 'key', type: 'body' } },
	},
	{
		displayName: 'Read Only',
		name: 'readOnly',
		type: 'boolean',
		default: false,
		description: 'Whether the key has read-only access',
		displayOptions: { show: showCreateSSHKey },
		routing: { send: { property: 'read_only', type: 'body' } },
	},

	// --- Body params: upsertActionSecret ---
	{
		displayName: 'Secret Value',
		name: 'secretData',
		type: 'string',
		required: true,
		default: '',
		typeOptions: { password: true },
		displayOptions: { show: showUpsertActionSecret },
		routing: { send: { property: 'data', type: 'body' } },
	},

	// --- Body params: createActionVariable / updateActionVariable ---
	{
		displayName: 'Value',
		name: 'variableValue',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showActionVariableWrite },
		routing: { send: { property: 'value', type: 'body' } },
	},

	// --- Body params: updateAvatar ---
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

	// --- Body params: createRepo ---
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
				displayName: 'Gitignores',
				name: 'gitignores',
				type: 'string',
				default: '',
				routing: { send: { property: 'gitignores', type: 'body' } },
			},
			{
				displayName: 'License',
				name: 'license',
				type: 'string',
				default: '',
				routing: { send: { property: 'license', type: 'body' } },
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

	// --- Body params: createGPGKey ---
	{
		displayName: 'Armored Public Key',
		name: 'armoredPublicKey',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. -----BEGIN PGP PUBLIC KEY BLOCK-----...',
		displayOptions: { show: showCreateGPGKey },
		routing: { send: { property: 'armored_public_key', type: 'body' } },
	},

	// --- Body params: createHook / updateHook ---
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
		displayOptions: { show: showCreateHookOrUpdate },
		routing: { send: { property: 'config', type: 'body' } },
	},
	{
		displayName: 'Active',
		name: 'hookActive',
		type: 'boolean',
		default: true,
		description: 'Whether the hook is active',
		displayOptions: { show: showCreateHookOrUpdate },
		routing: { send: { property: 'active', type: 'body' } },
	},

	// --- Body params: createOAuth2Application / updateOAuth2Application ---
	{
		displayName: 'Application Name',
		name: 'oauth2AppName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. My App',
		displayOptions: { show: showOAuth2AppWrite },
		routing: { send: { property: 'name', type: 'body' } },
	},
	{
		displayName: 'Redirect URIs',
		name: 'redirectUris',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. https://example.com/callback',
		description: 'Comma-separated list of redirect URIs',
		displayOptions: { show: showOAuth2AppWrite },
		routing: {
			send: {
				property: 'redirect_uris',
				type: 'body',
				value: '={{ $value.split(",").map(s => s.trim()).filter(Boolean) }}',
			},
		},
	},
	{
		displayName: 'Confidential Client',
		name: 'confidentialClient',
		type: 'boolean',
		default: false,
		description: 'Whether the OAuth2 client is confidential',
		displayOptions: { show: showOAuth2AppWrite },
		routing: { send: { property: 'confidential_client', type: 'body' } },
	},

	// --- Body params: updateSettings ---
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showUpdateSettings },
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				routing: { send: { property: 'description', type: 'body' } },
			},
			{
				displayName: 'Diff View Style',
				name: 'diff_view_style',
				type: 'string',
				default: '',
				routing: { send: { property: 'diff_view_style', type: 'body' } },
			},
			{
				displayName: 'Full Name',
				name: 'full_name',
				type: 'string',
				default: '',
				routing: { send: { property: 'full_name', type: 'body' } },
			},
			{
				displayName: 'Hide Activity',
				name: 'hide_activity',
				type: 'boolean',
				default: false,
				description: 'Whether to hide the user activity',
				routing: { send: { property: 'hide_activity', type: 'body' } },
			},
			{
				displayName: 'Hide Email',
				name: 'hide_email',
				type: 'boolean',
				default: false,
				description: 'Whether to hide the user email',
				routing: { send: { property: 'hide_email', type: 'body' } },
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				routing: { send: { property: 'language', type: 'body' } },
			},
			{
				displayName: 'Theme',
				name: 'theme',
				type: 'string',
				default: '',
				routing: { send: { property: 'theme', type: 'body' } },
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

	// --- Pagination for list operations ---
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
