import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebhookCreate = {
	operation: ['create'],
	resource: ['webhook'],
};

export const webhookCreateDescription: INodeProperties[] = [
	{
		displayName: 'Config',
		name: 'config',
		type: 'json',
		required: true,
		default: '{"url":"","content_type":"json"}',
		description: 'Hook config object (must include URL and content_type)',
		displayOptions: {
			show: showOnlyForWebhookCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'config',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		options: [
			{
				name: 'DingTalk',
				value: 'dingtalk',
			},
			{
				name: 'Discord',
				value: 'discord',
			},
			{
				name: 'Feishu',
				value: 'feishu',
			},
			{
				name: 'Forgejo',
				value: 'forgejo',
			},
			{
				name: 'Gitea',
				value: 'gitea',
			},
			{
				name: 'Gogs',
				value: 'gogs',
			},
			{
				name: 'MSTeams',
				value: 'msteams',
			},
			{
				name: 'Packagist',
				value: 'packagist',
			},
			{
				name: 'Slack',
				value: 'slack',
			},
			{
				name: 'Telegram',
				value: 'telegram',
			},
			{
				name: 'WeChat Work',
				value: 'wechatwork',
			},
		],
		default: 'gitea',
		description: 'Webhook type',
		displayOptions: {
			show: showOnlyForWebhookCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'type',
			},
		},
	},
	{
		displayName: 'Active',
		name: 'active',
		type: 'boolean',
		default: true,
		description: 'Whether the webhook should be active',
		displayOptions: {
			show: showOnlyForWebhookCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'active',
			},
		},
	},
	{
		displayName: 'Authorization Header',
		name: 'authorizationHeader',
		type: 'string',
		default: '',
		description: 'Authorization header value for webhook requests',
		displayOptions: {
			show: showOnlyForWebhookCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'authorization_header',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Branch Filter',
		name: 'branchFilter',
		type: 'string',
		default: '',
		description: 'Only trigger webhook for matching branches',
		displayOptions: {
			show: showOnlyForWebhookCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'branch_filter',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Events',
		name: 'events',
		type: 'string',
		default: '',
		placeholder: 'push,pull_request',
		description: 'Comma-separated event names',
		displayOptions: {
			show: showOnlyForWebhookCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'events',
				value:
					'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : undefined}}',
			},
		},
	},
];
