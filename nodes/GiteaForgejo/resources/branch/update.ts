import type { INodeProperties } from 'n8n-workflow';
import { branchSelect } from '../../shared/descriptions';

const showOnlyForBranchUpdate = {
	operation: ['update'],
	resource: ['branch'],
};

export const branchUpdateDescription: INodeProperties[] = [
	{
		...branchSelect,
		displayOptions: {
			show: showOnlyForBranchUpdate,
		},
	},
	{
		displayName: 'New Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'New branch name',
		displayOptions: {
			show: showOnlyForBranchUpdate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
];
