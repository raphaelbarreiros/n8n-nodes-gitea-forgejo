import type { INodeProperties } from 'n8n-workflow';
import { webhookIdSelect } from '../../shared/descriptions';

const showOnlyForWebhookDelete = {
	operation: ['delete'],
	resource: ['webhook'],
};

export const webhookDeleteDescription: INodeProperties[] = [
	{
		...webhookIdSelect,
		displayOptions: {
			show: showOnlyForWebhookDelete,
		},
	},
];
