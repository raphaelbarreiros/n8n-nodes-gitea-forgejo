import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { branchProtectionCreateDescription } from './create';
import { branchProtectionDeleteDescription } from './delete';
import { branchProtectionGetDescription } from './get';
import { branchProtectionGetManyDescription } from './getAll';
import { branchProtectionUpdateDescription } from './update';

const showOnlyForBranchProtections = {
	resource: ['branchProtection'],
};

export const branchProtectionDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForBranchProtections,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForBranchProtections,
		},
	},
	...branchProtectionCreateDescription,
	...branchProtectionDeleteDescription,
	...branchProtectionGetDescription,
	...branchProtectionGetManyDescription,
	...branchProtectionUpdateDescription,
];
