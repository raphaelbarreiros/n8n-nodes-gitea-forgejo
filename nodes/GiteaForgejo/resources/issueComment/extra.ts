import type { INodeProperties } from 'n8n-workflow';

const showOnlyForIssueCommentById = {
	operation: [
		'addReaction',
		'createAttachment',
		'delete',
		'deleteAttachment',
		'deleteReaction',
		'get',
		'getAttachment',
		'getAttachments',
		'getReactions',
		'update',
		'updateAttachment',
	],
	resource: ['issueComment'],
};

const showOnlyForIssueCommentUpdate = {
	operation: ['update'],
	resource: ['issueComment'],
};

const showOnlyForIssueCommentReactionMutation = {
	operation: ['addReaction', 'deleteReaction'],
	resource: ['issueComment'],
};

const showOnlyForIssueCommentAttachmentById = {
	operation: ['deleteAttachment', 'getAttachment', 'updateAttachment'],
	resource: ['issueComment'],
};

const showOnlyForIssueCommentCreateAttachment = {
	operation: ['createAttachment'],
	resource: ['issueComment'],
};

const showOnlyForIssueCommentAttachmentUpdate = {
	operation: ['updateAttachment'],
	resource: ['issueComment'],
};

const showOnlyForIssueCommentGetRepositoryComments = {
	operation: ['getRepositoryComments'],
	resource: ['issueComment'],
};

export const issueCommentExtraDescription: INodeProperties[] = [
	{
		displayName: 'Comment ID',
		name: 'issueCommentId',
		type: 'number',
		required: true,
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForIssueCommentById,
		},
		description: 'ID of the issue comment',
	},
	{
		displayName: 'Body',
		name: 'issueCommentBody',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		displayOptions: {
			show: showOnlyForIssueCommentUpdate,
		},
		description: 'Updated comment body',
		routing: {
			send: {
				type: 'body',
				property: 'body',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Reaction',
		name: 'issueCommentReactionContent',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForIssueCommentReactionMutation,
		},
		description:
			'Reaction content (for example: +1, -1, laugh, hooray, confused, heart, rocket, eyes)',
		routing: {
			send: {
				type: 'body',
				property: 'content',
			},
		},
	},
	{
		displayName: 'Attachment ID',
		name: 'issueCommentAttachmentId',
		type: 'number',
		required: true,
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForIssueCommentAttachmentById,
		},
		description: 'ID of the issue comment attachment',
	},
	{
		displayName: 'Attachment Name',
		name: 'issueCommentCreateAttachmentName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueCommentCreateAttachment,
		},
		description: 'Optional display name for the uploaded attachment',
	},
	{
		displayName: 'Updated At',
		name: 'issueCommentCreateAttachmentUpdatedAt',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: showOnlyForIssueCommentCreateAttachment,
		},
		description: 'Optional RFC 3339 timestamp to set as attachment update time',
	},
	{
		displayName: 'Binary Property',
		name: 'issueCommentCreateAttachmentBinaryPropertyName',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: {
			show: showOnlyForIssueCommentCreateAttachment,
		},
		description: 'Name of the binary property containing the file to upload',
	},
	{
		displayName: 'Attachment Name',
		name: 'issueCommentAttachmentName',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueCommentAttachmentUpdate,
		},
		description: 'New attachment name (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'name',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Browser Download URL',
		name: 'issueCommentAttachmentBrowserDownloadUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForIssueCommentAttachmentUpdate,
		},
		description: 'External browser download URL (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'browser_download_url',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Updated At',
		name: 'issueCommentUpdatedAt',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: showOnlyForIssueCommentUpdate,
		},
		description: 'Updated timestamp for the comment',
		routing: {
			send: {
				type: 'body',
				property: 'updated_at',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAllRepositoryComments',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForIssueCommentGetRepositoryComments,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
				type: 'query',
				property: 'limit',
				value: '100',
			},
			operations: {
				pagination: {
					type: 'generic',
					properties: {
						continue: '={{ Array.isArray($response.body) && $response.body.length === 100 }}',
						request: {
							qs: {
								page: '={{ Number($request.qs.page ?? 1) + 1 }}',
							},
						},
					},
				},
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limitRepositoryComments',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				...showOnlyForIssueCommentGetRepositoryComments,
				returnAllRepositoryComments: [false],
			},
		},
		description: 'Max number of results to return',
		routing: {
			send: {
				type: 'query',
				property: 'limit',
			},
			output: {
				maxResults: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Page',
		name: 'pageRepositoryComments',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				...showOnlyForIssueCommentGetRepositoryComments,
				returnAllRepositoryComments: [false],
			},
		},
		description: 'Page number of results to return (1-based)',
		routing: {
			send: {
				type: 'query',
				property: 'page',
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'repositoryCommentFilters',
		type: 'collection',
		default: {},
		displayOptions: {
			show: showOnlyForIssueCommentGetRepositoryComments,
		},
		options: [
			{
				displayName: 'Before',
				name: 'before',
				type: 'dateTime',
				default: '',
				description: 'Only include comments updated before this time',
				routing: {
					request: {
						qs: {
							before: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Since',
				name: 'since',
				type: 'dateTime',
				default: '',
				description: 'Only include comments updated at or after this time',
				routing: {
					request: {
						qs: {
							since: '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
];
