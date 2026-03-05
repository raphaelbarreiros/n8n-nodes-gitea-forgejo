import type { INodeProperties } from 'n8n-workflow';
import { repositoryKeyIdSelect } from '../../shared/descriptions';

const showOnlyForRepositoryKeyDelete = {
	operation: ['delete'],
	resource: ['repositoryKey'],
};

export const repositoryKeyDeleteDescription: INodeProperties[] = [
	{
		...repositoryKeyIdSelect,
		displayOptions: {
			show: showOnlyForRepositoryKeyDelete,
		},
	},
];
