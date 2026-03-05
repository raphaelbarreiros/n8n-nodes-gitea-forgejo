import type { INodeProperties } from 'n8n-workflow';

const showOnlyForReleaseCreate = {
	operation: ['create'],
	resource: ['release'],
};

export const releaseCreateDescription: INodeProperties[] = [
	{
		displayName: 'Tag Name',
		name: 'tagName',
		type: 'string',
		required: true,
		default: '',
		description: 'Git tag name for the release',
		displayOptions: {
			show: showOnlyForReleaseCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'tag_name',
			},
		},
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		typeOptions: {
			rows: 6,
		},
		default: '',
		description: 'Release notes body',
		displayOptions: {
			show: showOnlyForReleaseCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'body',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Draft',
		name: 'draft',
		type: 'boolean',
		default: false,
		description: 'Whether this release is a draft',
		displayOptions: {
			show: showOnlyForReleaseCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'draft',
			},
		},
	},
	{
		displayName: 'Hide Archive Links',
		name: 'hideArchiveLinks',
		type: 'boolean',
		default: false,
		description: 'Whether archive links should be hidden',
		displayOptions: {
			show: showOnlyForReleaseCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'hide_archive_links',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'Human-readable release title',
		displayOptions: {
			show: showOnlyForReleaseCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'name',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Pre-Release',
		name: 'prerelease',
		type: 'boolean',
		default: false,
		description: 'Whether this release is marked as pre-release',
		displayOptions: {
			show: showOnlyForReleaseCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'prerelease',
			},
		},
	},
	{
		displayName: 'Target Commitish',
		name: 'targetCommitish',
		type: 'string',
		default: '',
		description: 'Branch or commit SHA to create the tag from',
		displayOptions: {
			show: showOnlyForReleaseCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'target_commitish',
				value: '={{$value || undefined}}',
			},
		},
	},
];
