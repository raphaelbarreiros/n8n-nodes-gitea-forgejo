import type { INodeProperties } from 'n8n-workflow';
import { milestoneIdSelect } from '../../shared/descriptions';

const showOnlyForMilestoneDelete = {
	operation: ['delete'],
	resource: ['milestone'],
};

export const milestoneDeleteDescription: INodeProperties[] = [
	{
		...milestoneIdSelect,
		displayOptions: {
			show: showOnlyForMilestoneDelete,
		},
	},
];
