import type { INodeProperties } from 'n8n-workflow';
import { branchSelect } from '../../shared/descriptions';

const showOnlyForBranchDelete = {
	operation: ['delete'],
	resource: ['branch'],
};

export const branchDeleteDescription: INodeProperties[] = [
	{
		...branchSelect,
		displayOptions: {
			show: showOnlyForBranchDelete,
		},
	},
];
