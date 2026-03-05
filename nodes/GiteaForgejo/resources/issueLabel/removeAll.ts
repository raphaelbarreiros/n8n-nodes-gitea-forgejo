import type { INodeProperties } from 'n8n-workflow';
import { issueSelect } from '../../shared/descriptions';

const showOnlyForIssueLabelRemoveAll = {
	operation: ['removeAll'],
	resource: ['issueLabel'],
};

export const issueLabelRemoveAllDescription: INodeProperties[] = [
	{
		...issueSelect,
		displayOptions: {
			show: showOnlyForIssueLabelRemoveAll,
		},
	},
	{
		displayName: 'Updated At',
		name: 'updatedAt',
		type: 'dateTime',
		default: '',
		description: 'Last update timestamp of the issue labels (RFC 3339)',
		displayOptions: {
			show: showOnlyForIssueLabelRemoveAll,
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
