import type { INodeProperties } from 'n8n-workflow';
import { webhookIdSelect } from '../../shared/descriptions';

const showOnlyForWebhookUpdate = {
	operation: ['update'],
	resource: ['webhook'],
};

export const webhookUpdateDescription: INodeProperties[] = [
	{
		...webhookIdSelect,
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
	},
	{
		displayName: 'Set Active',
		name: 'setActive',
		type: 'boolean',
		default: false,
		description: 'Whether to update the active state',
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
	},
	{
		displayName: 'Active',
		name: 'active',
		type: 'boolean',
		default: true,
		description: 'Whether the webhook should be active',
		displayOptions: {
			show: {
				...showOnlyForWebhookUpdate,
				setActive: [true],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'active',
				value: '={{$parameter.setActive ? $value : undefined}}',
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
			show: showOnlyForWebhookUpdate,
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
			show: showOnlyForWebhookUpdate,
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
		displayName: 'Config',
		name: 'config',
		type: 'json',
		default: '{}',
		description: 'Hook config object',
		displayOptions: {
			show: showOnlyForWebhookUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'config',
				value: '={{Object.keys($value || {}).length ? $value : undefined}}',
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
			show: showOnlyForWebhookUpdate,
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
