import type { INodeProperties } from 'n8n-workflow';

const r = 'miscellaneous';

export const miscellaneousDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'templateName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. Go',
		description: 'The name of the template',
		displayOptions: {
			show: {
				resource: [r],
				operation: ['getGitignoreTemplate', 'getLabelTemplate', 'getLicenseTemplate'],
			},
		},
	},
	{
		displayName: 'Text',
		name: 'markdownText',
		type: 'string',
		typeOptions: { rows: 4 },
		required: true,
		default: '',
		description: 'Markdown text to render',
		displayOptions: {
			show: { resource: [r], operation: ['renderMarkdown', 'renderMarkdownRaw'] },
		},
		routing: {
			send: { type: 'body', property: 'Text', value: '={{$value || undefined}}' },
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: { resource: [r], operation: ['renderMarkdown'] },
		},
		options: [
			{
				displayName: 'Context',
				name: 'Context',
				type: 'string',
				default: '',
				description: 'Context to render the markdown in',
				routing: { send: { type: 'body', property: 'Context', value: '={{$value || undefined}}' } },
			},
			{
				displayName: 'Mode',
				name: 'Mode',
				type: 'options',
				default: 'markdown',
				options: [
					{ name: 'Comment', value: 'comment' },
					{ name: 'GFM', value: 'gfm' },
					{ name: 'Markdown', value: 'markdown' },
				],
				routing: { send: { type: 'body', property: 'Mode' } },
			},
			{
				displayName: 'Wiki',
				name: 'Wiki',
				type: 'boolean',
				default: false,
				description: 'Whether this is a wiki page',
				routing: { send: { type: 'body', property: 'Wiki' } },
			},
		],
	},
	{
		displayName: 'Mode',
		name: 'markupMode',
		type: 'options',
		required: true,
		default: 'markdown',
		description: 'The rendering mode',
		options: [
			{ name: 'Comment', value: 'comment' },
			{ name: 'File', value: 'file' },
			{ name: 'GFM', value: 'gfm' },
			{ name: 'Markdown', value: 'markdown' },
		],
		displayOptions: {
			show: { resource: [r], operation: ['renderMarkup'] },
		},
		routing: { send: { type: 'body', property: 'Mode' } },
	},
	{
		displayName: 'Text',
		name: 'markupText',
		type: 'string',
		typeOptions: { rows: 4 },
		default: '',
		description: 'Markup text to render',
		displayOptions: {
			show: { resource: [r], operation: ['renderMarkup'] },
		},
		routing: { send: { type: 'body', property: 'Text', value: '={{$value || undefined}}' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: { resource: [r], operation: ['renderMarkup'] },
		},
		options: [
			{
				displayName: 'Branch Path',
				name: 'BranchPath',
				type: 'string',
				default: '',
				description: 'Current branch path where the form gets posted',
				routing: {
					send: { type: 'body', property: 'BranchPath', value: '={{$value || undefined}}' },
				},
			},
			{
				displayName: 'Context',
				name: 'Context',
				type: 'string',
				default: '',
				description: 'Context to render the markup in',
				routing: { send: { type: 'body', property: 'Context', value: '={{$value || undefined}}' } },
			},
			{
				displayName: 'File Path',
				name: 'FilePath',
				type: 'string',
				default: '',
				description: 'File path for detecting extension in file mode',
				routing: {
					send: { type: 'body', property: 'FilePath', value: '={{$value || undefined}}' },
				},
			},
			{
				displayName: 'Wiki',
				name: 'Wiki',
				type: 'boolean',
				default: false,
				description: 'Whether this is a wiki page',
				routing: { send: { type: 'body', property: 'Wiki' } },
			},
		],
	},
];
