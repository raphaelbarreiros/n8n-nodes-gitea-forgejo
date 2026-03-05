import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { wikiPageCreateDescription } from './create';
import { wikiPageDeleteDescription } from './delete';
import { wikiPageGetDescription } from './get';
import { wikiPageGetManyDescription } from './getAll';
import { wikiPageGetRevisionsDescription } from './getRevisions';
import { wikiPageUpdateDescription } from './update';

const showOnlyForWikiPages = {
	resource: ['wikiPage'],
};

export const wikiPageDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForWikiPages,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForWikiPages,
		},
	},
	...wikiPageCreateDescription,
	...wikiPageDeleteDescription,
	...wikiPageGetDescription,
	...wikiPageGetManyDescription,
	...wikiPageGetRevisionsDescription,
	...wikiPageUpdateDescription,
];
