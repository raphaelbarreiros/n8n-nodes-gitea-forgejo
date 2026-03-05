import type { INodeProperties } from 'n8n-workflow';
import { webhookIdSelect } from '../../shared/descriptions';

const showOnlyForWebhookGet = {
	operation: ['get'],
	resource: ['webhook'],
};

export const webhookGetDescription: INodeProperties[] = [
	{
		...webhookIdSelect,
		displayOptions: {
			show: showOnlyForWebhookGet,
		},
	},
];
