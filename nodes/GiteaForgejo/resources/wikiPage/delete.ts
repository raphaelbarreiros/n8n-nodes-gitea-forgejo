import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWikiPageDelete = {
	operation: ['delete'],
	resource: ['wikiPage'],
};

export const wikiPageDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Page Name',
		name: 'pageName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. Home',
		description: 'Name of the wiki page to delete',
		displayOptions: {
			show: showOnlyForWikiPageDelete,
		},
	},
];
