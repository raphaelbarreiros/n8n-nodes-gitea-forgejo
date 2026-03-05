import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { labelCreateDescription } from './create';
import { labelDeleteDescription } from './delete';
import { labelGetDescription } from './get';
import { labelGetManyDescription } from './getAll';
import { labelUpdateDescription } from './update';

const showOnlyForLabels = {
	resource: ['label'],
};

export const labelDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForLabels,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForLabels,
		},
	},
	...labelCreateDescription,
	...labelDeleteDescription,
	...labelGetDescription,
	...labelGetManyDescription,
	...labelUpdateDescription,
];
