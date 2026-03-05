import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { branchCreateDescription } from './create';
import { branchDeleteDescription } from './delete';
import { branchGetDescription } from './get';
import { branchGetManyDescription } from './getAll';
import { branchUpdateDescription } from './update';

const showOnlyForBranches = {
	resource: ['branch'],
};

export const branchDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForBranches,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForBranches,
		},
	},
	...branchCreateDescription,
	...branchDeleteDescription,
	...branchGetDescription,
	...branchGetManyDescription,
	...branchUpdateDescription,
];
