import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { repositoryKeyCreateDescription } from './create';
import { repositoryKeyDeleteDescription } from './delete';
import { repositoryKeyGetDescription } from './get';
import { repositoryKeyGetManyDescription } from './getAll';

const showOnlyForRepositoryKeys = {
	resource: ['repositoryKey'],
};

export const repositoryKeyDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForRepositoryKeys,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForRepositoryKeys,
		},
	},
	...repositoryKeyCreateDescription,
	...repositoryKeyDeleteDescription,
	...repositoryKeyGetDescription,
	...repositoryKeyGetManyDescription,
];
