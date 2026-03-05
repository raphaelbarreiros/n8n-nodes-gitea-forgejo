import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBranchProtectionGetMany = {
	operation: ['getAll'],
	resource: ['branchProtection'],
};

export const branchProtectionGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Notice',
		name: 'noticeBranchProtectionGetAll',
		type: 'notice',
		default: '',
		displayOptions: {
			show: showOnlyForBranchProtectionGetMany,
		},
		description: 'Returns all branch protection rules configured for this repository',
	},
];
