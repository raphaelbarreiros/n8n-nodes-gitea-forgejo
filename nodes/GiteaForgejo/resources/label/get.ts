import type { INodeProperties } from 'n8n-workflow';
import { labelIdSelect } from '../../shared/descriptions';

const showOnlyForLabelGet = {
	operation: ['get'],
	resource: ['label'],
};

export const labelGetDescription: INodeProperties[] = [
	{
		...labelIdSelect,
		displayOptions: {
			show: showOnlyForLabelGet,
		},
	},
];
