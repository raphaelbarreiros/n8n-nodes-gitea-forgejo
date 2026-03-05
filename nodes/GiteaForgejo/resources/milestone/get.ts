import type { INodeProperties } from 'n8n-workflow';
import { milestoneIdSelect } from '../../shared/descriptions';

const showOnlyForMilestoneGet = {
	operation: ['get'],
	resource: ['milestone'],
};

export const milestoneGetDescription: INodeProperties[] = [
	{
		...milestoneIdSelect,
		displayOptions: {
			show: showOnlyForMilestoneGet,
		},
	},
];
