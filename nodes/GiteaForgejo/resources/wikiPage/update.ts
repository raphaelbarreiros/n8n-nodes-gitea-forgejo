import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWikiPageUpdate = {
	operation: ['update'],
	resource: ['wikiPage'],
};

export const wikiPageUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Page Name',
		name: 'pageName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. Home',
		description: 'Name of the wiki page to update',
		displayOptions: {
			show: showOnlyForWikiPageUpdate,
		},
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		description: 'Updated wiki page title',
		displayOptions: {
			show: showOnlyForWikiPageUpdate,
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
		description: 'Updated wiki page content encoded as base64',
		displayOptions: {
			show: showOnlyForWikiPageUpdate,
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
			show: showOnlyForWikiPageUpdate,
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
