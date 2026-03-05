import type { INodeProperties } from 'n8n-workflow';
import { repositoryKeyIdSelect } from '../../shared/descriptions';

const showOnlyForRepositoryKeyGet = {
	operation: ['get'],
	resource: ['repositoryKey'],
};

export const repositoryKeyGetDescription: INodeProperties[] = [
	{
		...repositoryKeyIdSelect,
		displayOptions: {
			show: showOnlyForRepositoryKeyGet,
		},
	},
];
