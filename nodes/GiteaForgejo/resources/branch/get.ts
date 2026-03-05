import type { INodeProperties } from 'n8n-workflow';
import { branchSelect } from '../../shared/descriptions';

const showOnlyForBranchGet = {
	operation: ['get'],
	resource: ['branch'],
};

export const branchGetDescription: INodeProperties[] = [
	{
		...branchSelect,
		displayOptions: {
			show: showOnlyForBranchGet,
		},
	},
];
