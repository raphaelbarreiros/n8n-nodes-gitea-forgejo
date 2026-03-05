import type { INodeProperties } from 'n8n-workflow';
import { branchProtectionNameSelect } from '../../shared/descriptions';

const showOnlyForBranchProtectionDelete = {
	operation: ['delete'],
	resource: ['branchProtection'],
};

export const branchProtectionDeleteDescription: INodeProperties[] = [
	{
		...branchProtectionNameSelect,
		displayOptions: {
			show: showOnlyForBranchProtectionDelete,
		},
	},
];
