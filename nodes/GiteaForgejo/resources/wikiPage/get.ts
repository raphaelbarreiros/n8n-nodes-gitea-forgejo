import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWikiPageGet = {
	operation: ['get'],
	resource: ['wikiPage'],
};

export const wikiPageGetDescription: INodeProperties[] = [
	{
		displayName: 'Page Name',
		name: 'pageName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. Home',
		description: 'Name of the wiki page to get',
		displayOptions: {
			show: showOnlyForWikiPageGet,
		},
	},
];
