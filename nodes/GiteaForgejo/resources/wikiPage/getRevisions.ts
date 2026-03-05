import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWikiPageGetRevisions = {
	operation: ['getRevisions'],
	resource: ['wikiPage'],
};

export const wikiPageGetRevisionsDescription: INodeProperties[] = [
	{
		displayName: 'Page Name',
		name: 'pageName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. Home',
		description: 'Name of the wiki page to get revisions for',
		displayOptions: {
			show: showOnlyForWikiPageGetRevisions,
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForWikiPageGetRevisions,
		},
		description: 'Page number of results to return (1-based)',
		routing: {
			send: {
				type: 'query',
				property: 'page',
			},
		},
	},
];
