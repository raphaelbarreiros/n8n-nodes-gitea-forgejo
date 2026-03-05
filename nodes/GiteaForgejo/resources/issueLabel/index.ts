import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { issueLabelAddDescription } from './add';
import { issueLabelGetManyDescription } from './getAll';
import { issueLabelRemoveDescription } from './remove';
import { issueLabelRemoveAllDescription } from './removeAll';
import { issueLabelReplaceDescription } from './replace';

const showOnlyForIssueLabels = {
	resource: ['issueLabel'],
};

export const issueLabelDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForIssueLabels,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForIssueLabels,
		},
	},
	...issueLabelAddDescription,
	...issueLabelGetManyDescription,
	...issueLabelRemoveDescription,
	...issueLabelRemoveAllDescription,
	...issueLabelReplaceDescription,
];
