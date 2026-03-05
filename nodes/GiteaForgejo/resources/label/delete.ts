import type { INodeProperties } from 'n8n-workflow';
import { labelIdSelect } from '../../shared/descriptions';

const showOnlyForLabelDelete = {
	operation: ['delete'],
	resource: ['label'],
};

export const labelDeleteDescription: INodeProperties[] = [
	{
		...labelIdSelect,
		displayOptions: {
			show: showOnlyForLabelDelete,
		},
	},
];
