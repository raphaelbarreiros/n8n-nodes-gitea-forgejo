import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { releaseCreateDescription } from './create';
import { releaseDeleteDescription } from './delete';
import { releaseDeleteByTagDescription } from './deleteByTag';
import { releaseGetDescription } from './get';
import { releaseGetManyDescription } from './getAll';
import { releaseGetByTagDescription } from './getByTag';
import { releaseGetLatestDescription } from './getLatest';
import { releaseUpdateDescription } from './update';

const showOnlyForReleases = {
	resource: ['release'],
};

export const releaseDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForReleases,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForReleases,
		},
	},
	...releaseCreateDescription,
	...releaseDeleteDescription,
	...releaseDeleteByTagDescription,
	...releaseGetDescription,
	...releaseGetManyDescription,
	...releaseGetByTagDescription,
	...releaseGetLatestDescription,
	...releaseUpdateDescription,
];
