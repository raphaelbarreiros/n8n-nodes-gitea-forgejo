import type { INodeProperties } from 'n8n-workflow';
import { webhookIdSelect } from '../../shared/descriptions';

const showOnlyForWebhookTest = {
	operation: ['test'],
	resource: ['webhook'],
};

const showOnlyForWebhookGitHookById = {
	operation: ['getGitHook', 'deleteGitHook', 'updateGitHook'],
	resource: ['webhook'],
};

const showOnlyForWebhookUpdateGitHook = {
	operation: ['updateGitHook'],
	resource: ['webhook'],
};

export const webhookExtraDescription: INodeProperties[] = [
	{
		...webhookIdSelect,
		displayOptions: {
			show: showOnlyForWebhookTest,
		},
	},
	{
		displayName: 'Git Hook ID',
		name: 'gitHookId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. pre-receive',
		displayOptions: {
			show: showOnlyForWebhookGitHookById,
		},
		description: 'ID of the git hook',
	},
	{
		displayName: 'Git Hook Content',
		name: 'gitHookContent',
		type: 'string',
		typeOptions: {
			rows: 6,
		},
		default: '',
		displayOptions: {
			show: showOnlyForWebhookUpdateGitHook,
		},
		description: 'Content of the git hook script',
		routing: {
			send: {
				type: 'body',
				property: 'content',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Ref',
		name: 'hookTestRef',
		type: 'string',
		default: '',
		placeholder: 'e.g. main',
		displayOptions: {
			show: showOnlyForWebhookTest,
		},
		description: 'Commit, branch, or tag to include in test payload',
		routing: {
			request: {
				qs: {
					ref: '={{$value || undefined}}',
				},
			},
		},
	},
];
