import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWikiPageCreate = {
	operation: ['create'],
	resource: ['wikiPage'],
};

export const wikiPageCreateDescription: INodeProperties[] = [
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		description: 'Title of the wiki page',
		displayOptions: {
			show: showOnlyForWikiPageCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'title',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Content (Base64)',
		name: 'contentBase64',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		description: 'Wiki page content encoded as base64',
		displayOptions: {
			show: showOnlyForWikiPageCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'content_base64',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		description: 'Optional commit message summarizing the wiki change',
		displayOptions: {
			show: showOnlyForWikiPageCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'message',
				value: '={{$value || undefined}}',
			},
		},
	},
];
