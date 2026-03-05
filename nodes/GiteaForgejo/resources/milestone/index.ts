import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { milestoneCreateDescription } from './create';
import { milestoneDeleteDescription } from './delete';
import { milestoneGetDescription } from './get';
import { milestoneGetManyDescription } from './getAll';
import { milestoneUpdateDescription } from './update';

const showOnlyForMilestones = {
	resource: ['milestone'],
};

export const milestoneDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForMilestones,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForMilestones,
		},
	},
	...milestoneCreateDescription,
	...milestoneDeleteDescription,
	...milestoneGetDescription,
	...milestoneGetManyDescription,
	...milestoneUpdateDescription,
];
