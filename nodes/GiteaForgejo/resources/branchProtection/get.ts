import type { INodeProperties } from 'n8n-workflow';
import { branchProtectionNameSelect } from '../../shared/descriptions';

const showOnlyForBranchProtectionGet = {
	operation: ['get'],
	resource: ['branchProtection'],
};

export const branchProtectionGetDescription: INodeProperties[] = [
	{
		...branchProtectionNameSelect,
		displayOptions: {
			show: showOnlyForBranchProtectionGet,
		},
	},
];
