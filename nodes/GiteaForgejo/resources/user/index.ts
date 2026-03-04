import type { INodeProperties } from 'n8n-workflow';
import { usernameSelect } from '../../shared/descriptions';

const showOnlyForUserGet = {
	resource: ['user'],
	operation: ['get'],
};

export const userDescription: INodeProperties[] = [
	{
		...usernameSelect,
		displayOptions: {
			show: showOnlyForUserGet,
		},
	},
];
