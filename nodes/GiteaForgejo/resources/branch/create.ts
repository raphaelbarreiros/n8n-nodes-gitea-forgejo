import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBranchCreate = {
	operation: ['create'],
	resource: ['branch'],
};

export const branchCreateDescription: INodeProperties[] = [
	{
		displayName: 'New Branch Name',
		name: 'newBranchName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the branch to create',
		displayOptions: {
			show: showOnlyForBranchCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'new_branch_name',
			},
		},
	},
	{
		displayName: 'Source Reference',
		name: 'oldRefName',
		type: 'string',
		default: '',
		description: 'Old branch, tag, or commit to create the new branch from',
		displayOptions: {
			show: showOnlyForBranchCreate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'old_ref_name',
				value: '={{$value || undefined}}',
			},
		},
	},
];
