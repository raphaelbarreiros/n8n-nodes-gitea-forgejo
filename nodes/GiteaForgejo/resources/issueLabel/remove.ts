import type { INodeProperties } from 'n8n-workflow';
import { issueSelect, labelIdentifierSelect } from '../../shared/descriptions';

const showOnlyForIssueLabelRemove = {
	operation: ['remove'],
	resource: ['issueLabel'],
};

export const issueLabelRemoveDescription: INodeProperties[] = [
	{
		...issueSelect,
		displayOptions: {
			show: showOnlyForIssueLabelRemove,
		},
	},
	{
		...labelIdentifierSelect,
		displayOptions: {
			show: showOnlyForIssueLabelRemove,
		},
	},
	{
		displayName: 'Updated At',
		name: 'updatedAt',
		type: 'dateTime',
		default: '',
		description: 'Last update timestamp of the issue labels (RFC 3339)',
		displayOptions: {
			show: showOnlyForIssueLabelRemove,
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
