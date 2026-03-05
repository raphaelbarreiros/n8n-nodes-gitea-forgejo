import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { webhookCreateDescription } from './create';
import { webhookDeleteDescription } from './delete';
import { webhookExtraDescription } from './extra';
import { webhookGetDescription } from './get';
import { webhookGetManyDescription } from './getAll';
import { webhookUpdateDescription } from './update';

const showOnlyForWebhooks = {
	resource: ['webhook'],
};

export const webhookDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForWebhooks,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForWebhooks,
		},
	},
	...webhookCreateDescription,
	...webhookDeleteDescription,
	...webhookExtraDescription,
	...webhookGetDescription,
	...webhookGetManyDescription,
	...webhookUpdateDescription,
];
