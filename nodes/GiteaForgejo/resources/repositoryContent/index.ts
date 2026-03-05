import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { repositoryContentChangeManyDescription } from './changeMany';
import { repositoryContentCreateDescription } from './create';
import { repositoryContentDeleteDescription } from './delete';
import { repositoryContentGetDescription } from './get';
import { repositoryContentGetRootDescription } from './getRoot';
import { repositoryContentUpdateDescription } from './update';

const showOnlyForRepositoryContents = {
	resource: ['repositoryContent'],
};

export const repositoryContentDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForRepositoryContents,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForRepositoryContents,
		},
	},
	...repositoryContentChangeManyDescription,
	...repositoryContentCreateDescription,
	...repositoryContentDeleteDescription,
	...repositoryContentGetDescription,
	...repositoryContentGetRootDescription,
	...repositoryContentUpdateDescription,
];
