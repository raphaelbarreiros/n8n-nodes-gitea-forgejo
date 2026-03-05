import type { INodeProperties } from 'n8n-workflow';
import { issueSelect } from '../../shared/descriptions';

const showOnlyForIssueLabelAdd = {
	operation: ['add'],
	resource: ['issueLabel'],
};

export const issueLabelAddDescription: INodeProperties[] = [
	{
		...issueSelect,
		displayOptions: {
			show: showOnlyForIssueLabelAdd,
		},
	},
	{
		displayName: 'Labels',
		name: 'labels',
		type: 'string',
		default: '',
		placeholder: 'bug,enhancement,12',
		description: 'Comma-separated label IDs or names to add',
		displayOptions: {
			show: showOnlyForIssueLabelAdd,
		},
		routing: {
			send: {
				type: 'body',
				property: 'labels',
				value:
					'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean).map((entry) => /^[0-9]+$/.test(entry) ? Number(entry) : entry) : undefined}}',
			},
		},
	},
	{
		displayName: 'Updated At',
		name: 'updatedAt',
		type: 'dateTime',
		default: '',
		description: 'Last update timestamp of the issue labels (RFC 3339)',
		displayOptions: {
			show: showOnlyForIssueLabelAdd,
		},
		routing: {
			send: {
				type: 'body',
				property: 'updated_at',
				value: '={{$value || undefined}}',
			},
		},
	},
];
