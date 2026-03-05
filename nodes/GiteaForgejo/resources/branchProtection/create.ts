import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBranchProtectionCreate = {
	operation: ['create'],
	resource: ['branchProtection'],
};

export const branchProtectionCreateDescription: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Option',
		},
		default: {},
		displayOptions: {
			show: showOnlyForBranchProtectionCreate,
		},
		options: [
			{
				displayName: 'Apply to Admins',
				name: 'applyToAdmins',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							apply_to_admins: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Approvals Whitelist Teams',
				name: 'approvalsWhitelistTeams',
				type: 'string',
				default: '',
				placeholder: 'team-a,team-b',
				description: 'Comma-separated team names',
				routing: {
					request: {
						body: {
							approvals_whitelist_teams:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : []}}',
						},
					},
				},
			},
			{
				displayName: 'Approvals Whitelist Usernames',
				name: 'approvalsWhitelistUsernames',
				type: 'string',
				default: '',
				placeholder: 'alice,bob',
				description: 'Comma-separated usernames',
				routing: {
					request: {
						body: {
							approvals_whitelist_username:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : []}}',
						},
					},
				},
			},
			{
				displayName: 'Block on Official Review Requests',
				name: 'blockOnOfficialReviewRequests',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							block_on_official_review_requests: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Block on Outdated Branch',
				name: 'blockOnOutdatedBranch',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							block_on_outdated_branch: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Block on Rejected Reviews',
				name: 'blockOnRejectedReviews',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							block_on_rejected_reviews: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Dismiss Stale Approvals',
				name: 'dismissStaleApprovals',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							dismiss_stale_approvals: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Enable Approvals Whitelist',
				name: 'enableApprovalsWhitelist',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							enable_approvals_whitelist: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Enable Merge Whitelist',
				name: 'enableMergeWhitelist',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							enable_merge_whitelist: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Enable Push',
				name: 'enablePush',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							enable_push: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Enable Push Whitelist',
				name: 'enablePushWhitelist',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							enable_push_whitelist: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Enable Status Check',
				name: 'enableStatusCheck',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							enable_status_check: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Ignore Stale Approvals',
				name: 'ignoreStaleApprovals',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							ignore_stale_approvals: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Merge Whitelist Teams',
				name: 'mergeWhitelistTeams',
				type: 'string',
				default: '',
				placeholder: 'team-a,team-b',
				description: 'Comma-separated team names',
				routing: {
					request: {
						body: {
							merge_whitelist_teams:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : []}}',
						},
					},
				},
			},
			{
				displayName: 'Merge Whitelist Usernames',
				name: 'mergeWhitelistUsernames',
				type: 'string',
				default: '',
				placeholder: 'alice,bob',
				description: 'Comma-separated usernames',
				routing: {
					request: {
						body: {
							merge_whitelist_usernames:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : []}}',
						},
					},
				},
			},
			{
				displayName: 'Protected File Patterns',
				name: 'protectedFilePatterns',
				type: 'string',
				default: '',
				description: 'Patterns that remain protected',
				routing: {
					request: {
						body: {
							protected_file_patterns: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Push Whitelist Deploy Keys',
				name: 'pushWhitelistDeployKeys',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							push_whitelist_deploy_keys: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Push Whitelist Teams',
				name: 'pushWhitelistTeams',
				type: 'string',
				default: '',
				placeholder: 'team-a,team-b',
				description: 'Comma-separated team names',
				routing: {
					request: {
						body: {
							push_whitelist_teams:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : []}}',
						},
					},
				},
			},
			{
				displayName: 'Push Whitelist Usernames',
				name: 'pushWhitelistUsernames',
				type: 'string',
				default: '',
				placeholder: 'alice,bob',
				description: 'Comma-separated usernames',
				routing: {
					request: {
						body: {
							push_whitelist_usernames:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : []}}',
						},
					},
				},
			},
			{
				displayName: 'Require Signed Commits',
				name: 'requireSignedCommits',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						body: {
							require_signed_commits: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Required Approvals',
				name: 'requiredApprovals',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				routing: {
					request: {
						body: {
							required_approvals: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Rule Name',
				name: 'ruleName',
				type: 'string',
				default: '',
				description: 'Name of the branch protection rule',
				routing: {
					request: {
						body: {
							rule_name: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Status Check Contexts',
				name: 'statusCheckContexts',
				type: 'string',
				default: '',
				placeholder: 'ci/build,ci/test',
				description: 'Comma-separated status check contexts',
				routing: {
					request: {
						body: {
							status_check_contexts:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : []}}',
						},
					},
				},
			},
			{
				displayName: 'Unprotected File Patterns',
				name: 'unprotectedFilePatterns',
				type: 'string',
				default: '',
				description: 'Patterns exempt from protection',
				routing: {
					request: {
						body: {
							unprotected_file_patterns: '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
];
