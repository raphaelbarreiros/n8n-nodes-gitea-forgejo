import type { INodeProperties } from 'n8n-workflow';
import { issueSelect } from '../../shared/descriptions';

const showOnlyForIssueLabelGetMany = {
	operation: ['getAll'],
	resource: ['issueLabel'],
};

export const issueLabelGetManyDescription: INodeProperties[] = [
	{
		...issueSelect,
		displayOptions: {
			show: showOnlyForIssueLabelGetMany,
		},
	},
];
