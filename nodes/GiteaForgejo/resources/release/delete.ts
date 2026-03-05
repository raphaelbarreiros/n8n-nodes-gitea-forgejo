import type { INodeProperties } from 'n8n-workflow';
import { releaseIdSelect } from '../../shared/descriptions';

const showOnlyForReleaseDelete = {
	operation: ['delete'],
	resource: ['release'],
};

export const releaseDeleteDescription: INodeProperties[] = [
	{
		...releaseIdSelect,
		displayOptions: {
			show: showOnlyForReleaseDelete,
		},
	},
];
