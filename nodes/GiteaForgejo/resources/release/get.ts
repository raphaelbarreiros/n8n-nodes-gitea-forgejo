import type { INodeProperties } from 'n8n-workflow';
import { releaseIdSelect } from '../../shared/descriptions';

const showOnlyForReleaseGet = {
	operation: ['get'],
	resource: ['release'],
};

export const releaseGetDescription: INodeProperties[] = [
	{
		...releaseIdSelect,
		displayOptions: {
			show: showOnlyForReleaseGet,
		},
	},
];
