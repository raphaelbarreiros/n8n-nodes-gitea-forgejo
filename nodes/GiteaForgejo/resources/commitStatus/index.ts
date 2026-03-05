import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { commitStatusCreateDescription } from './create';
import { commitStatusGetCombinedByRefDescription } from './getCombinedByRef';
import { commitStatusGetManyByRefDescription } from './getManyByRef';
import { commitStatusGetManyByShaDescription } from './getManyBySha';

const showOnlyForCommitStatuses = {
	resource: ['commitStatus'],
};

export const commitStatusDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForCommitStatuses,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForCommitStatuses,
		},
	},
	...commitStatusCreateDescription,
	...commitStatusGetCombinedByRefDescription,
	...commitStatusGetManyByRefDescription,
	...commitStatusGetManyByShaDescription,
];
