import type { INodeProperties } from 'n8n-workflow';
import { pullRequestSelect } from '../../shared/descriptions';

const showOnlyForPullRequestByNumber = {
	operation: [
		'cancelAutoMerge',
		'createReview',
		'createReviewComment',
		'createReviewRequests',
		'dismissReview',
		'deleteReview',
		'deleteReviewComment',
		'deleteReviewRequests',
		'getCommits',
		'getDiffOrPatch',
		'getFiles',
		'getReviewComment',
		'getReview',
		'getReviewComments',
		'getReviews',
		'isMerged',
		'submitReview',
		'undismissReview',
		'updateBranch',
	],
	resource: ['pullRequest'],
};

const showOnlyForPullRequestGetCommits = {
	operation: ['getCommits'],
	resource: ['pullRequest'],
};

const showOnlyForPullRequestGetFiles = {
	operation: ['getFiles'],
	resource: ['pullRequest'],
};

const showOnlyForPullRequestGetDiffOrPatch = {
	operation: ['getDiffOrPatch'],
	resource: ['pullRequest'],
};

const showOnlyForPullRequestGetReviews = {
	operation: ['getReviews'],
	resource: ['pullRequest'],
};

const showOnlyForPullRequestGetReviewComments = {
	operation: ['getReviewComments'],
	resource: ['pullRequest'],
};

const showOnlyForPullRequestUpdateBranch = {
	operation: ['updateBranch'],
	resource: ['pullRequest'],
};

const showOnlyForPullRequestReviewRequests = {
	operation: ['createReviewRequests', 'deleteReviewRequests'],
	resource: ['pullRequest'],
};

const showOnlyForPullRequestReviewById = {
	operation: [
		'getReview',
		'submitReview',
		'createReviewComment',
		'getReviewComment',
		'getReviewComments',
		'deleteReview',
		'dismissReview',
		'undismissReview',
		'deleteReviewComment',
	],
	resource: ['pullRequest'],
};

const showOnlyForPullRequestReviewCommentById = {
	operation: ['deleteReviewComment', 'getReviewComment'],
	resource: ['pullRequest'],
};

const pullRequestReviewPagination = {
	operations: {
		pagination: {
			type: 'generic',
			properties: {
				continue:
					'={{ Array.isArray($response.body) && $response.body.length === Number($request.qs.limit ?? 100) }}',
				request: {
					qs: {
						page: '={{ Number($request.qs.page ?? 1) + 1 }}',
					},
				},
			},
		},
	},
} as const;

export const pullRequestExtraDescription: INodeProperties[] = [
	{
		...pullRequestSelect,
		displayOptions: {
			show: showOnlyForPullRequestByNumber,
		},
	},
	{
		displayName: 'Output Type',
		name: 'pullRequestDiffType',
		type: 'options',
		required: true,
		default: 'diff',
		displayOptions: {
			show: showOnlyForPullRequestGetDiffOrPatch,
		},
		options: [
			{
				name: 'Diff',
				value: 'diff',
			},
			{
				name: 'Patch',
				value: 'patch',
			},
		],
		description: 'Whether to return a diff or patch',
	},
	{
		displayName: 'Include Binary Changes',
		name: 'pullRequestDiffBinary',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForPullRequestGetDiffOrPatch,
		},
		description: 'Whether to include binary file changes',
		routing: {
			send: {
				type: 'query',
				property: 'binary',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Review ID',
		name: 'pullRequestReviewId',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		required: true,
		default: 1,
		displayOptions: {
			show: showOnlyForPullRequestReviewById,
		},
		description: 'ID of the pull request review',
	},
	{
		displayName: 'Review Comment ID',
		name: 'pullRequestReviewCommentId',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		required: true,
		default: 1,
		displayOptions: {
			show: showOnlyForPullRequestReviewCommentById,
		},
		description: 'ID of the pull request review comment',
	},
	{
		displayName: 'Dismiss Message',
		name: 'dismissReviewMessage',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['dismissReview'],
				resource: ['pullRequest'],
			},
		},
		description: 'Reason message for dismissing the review',
		routing: {
			send: {
				type: 'body',
				property: 'message',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Dismiss Priors',
		name: 'dismissReviewPriors',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				operation: ['dismissReview'],
				resource: ['pullRequest'],
			},
		},
		description: 'Whether to also dismiss prior related reviews',
		routing: {
			send: {
				type: 'body',
				property: 'priors',
				value: '={{$value}}',
			},
		},
	},
	{
		displayName: 'Create Review Options',
		name: 'createReviewOptions',
		type: 'collection',
		default: {},
		typeOptions: {
			multipleValueButtonText: 'Add Option',
		},
		displayOptions: {
			show: {
				operation: ['createReview'],
				resource: ['pullRequest'],
			},
		},
		options: [
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Review body text',
				routing: {
					request: {
						body: {
							body: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Comments',
				name: 'comments',
				type: 'json',
				default: '[]',
				description: 'Array of review comment objects',
				routing: {
					request: {
						body: {
							comments: '={{Array.isArray($value) && $value.length ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Commit ID',
				name: 'commitId',
				type: 'string',
				default: '',
				description: 'Commit SHA the review applies to',
				routing: {
					request: {
						body: {
							commit_id: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Event',
				name: 'event',
				type: 'string',
				default: '',
				placeholder: 'e.g. APPROVE',
				description: 'Review state event value',
				routing: {
					request: {
						body: {
							event: '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Review Comment Options',
		name: 'reviewCommentOptions',
		type: 'collection',
		default: {},
		typeOptions: {
			multipleValueButtonText: 'Add Option',
		},
		displayOptions: {
			show: {
				operation: ['createReviewComment'],
				resource: ['pullRequest'],
			},
		},
		options: [
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Comment body',
				routing: {
					request: {
						body: {
							body: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				default: '',
				placeholder: 'e.g. src/index.ts',
				description: 'Tree path of the reviewed file',
				routing: {
					request: {
						body: {
							path: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'New Position',
				name: 'newPosition',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Line position in the new file (0 to ignore)',
				routing: {
					request: {
						body: {
							new_position: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Old Position',
				name: 'oldPosition',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Line position in the old file (0 to ignore)',
				routing: {
					request: {
						body: {
							old_position: '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Style',
		name: 'updateBranchStyle',
		type: 'options',
		default: 'merge',
		options: [
			{
				name: 'Merge',
				value: 'merge',
			},
			{
				name: 'Rebase',
				value: 'rebase',
			},
		],
		displayOptions: {
			show: showOnlyForPullRequestUpdateBranch,
		},
		description: 'How to update the pull request branch',
		routing: {
			request: {
				qs: {
					style: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Review Request Options',
		name: 'reviewRequestOptions',
		type: 'collection',
		default: {},
		typeOptions: {
			multipleValueButtonText: 'Add Option',
		},
		displayOptions: {
			show: showOnlyForPullRequestReviewRequests,
		},
		options: [
			{
				displayName: 'Reviewers',
				name: 'reviewers',
				type: 'string',
				default: '',
				placeholder: 'alice,bob',
				description: 'Comma-separated usernames to request review from',
				routing: {
					request: {
						body: {
							reviewers:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Team Reviewers',
				name: 'teamReviewers',
				type: 'string',
				default: '',
				placeholder: 'qa-team,platform-team',
				description: 'Comma-separated team names to request review from',
				routing: {
					request: {
						body: {
							team_reviewers:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : undefined}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Body',
		name: 'submitReviewBody',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		displayOptions: {
			show: {
				operation: ['submitReview'],
				resource: ['pullRequest'],
			},
		},
		description: 'Body text for the review submission',
		routing: {
			send: {
				type: 'body',
				property: 'body',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Event',
		name: 'submitReviewEvent',
		type: 'string',
		default: '',
		placeholder: 'e.g. APPROVE',
		displayOptions: {
			show: {
				operation: ['submitReview'],
				resource: ['pullRequest'],
			},
		},
		description: 'Review event state to submit',
		routing: {
			send: {
				type: 'body',
				property: 'event',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAllPullRequestCommits',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForPullRequestGetCommits,
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
			...pullRequestReviewPagination,
		},
	},
	{
		displayName: 'Limit',
		name: 'limitPullRequestCommits',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				...showOnlyForPullRequestGetCommits,
				returnAllPullRequestCommits: [false],
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
		name: 'pagePullRequestCommits',
		type: 'number',
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForPullRequestGetCommits,
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
		displayName: 'Commit Options',
		name: 'pullRequestCommitOptions',
		type: 'collection',
		default: {},
		displayOptions: {
			show: showOnlyForPullRequestGetCommits,
		},
		options: [
			{
				displayName: 'Files',
				name: 'files',
				type: 'boolean',
				default: true,
				description: 'Whether to include changed files for each commit',
				routing: {
					request: {
						qs: {
							files: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Verification',
				name: 'verification',
				type: 'boolean',
				default: true,
				description: 'Whether to include signature verification for each commit',
				routing: {
					request: {
						qs: {
							verification: '={{$value}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Return All',
		name: 'returnAllPullRequestFiles',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForPullRequestGetFiles,
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
			...pullRequestReviewPagination,
		},
	},
	{
		displayName: 'Limit',
		name: 'limitPullRequestFiles',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				...showOnlyForPullRequestGetFiles,
				returnAllPullRequestFiles: [false],
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
		name: 'pagePullRequestFiles',
		type: 'number',
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForPullRequestGetFiles,
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
		displayName: 'File Options',
		name: 'pullRequestFileOptions',
		type: 'collection',
		default: {},
		displayOptions: {
			show: showOnlyForPullRequestGetFiles,
		},
		options: [
			{
				displayName: 'Skip To',
				name: 'skipTo',
				type: 'string',
				default: '',
				description: 'Skip to the given file path in results',
				routing: {
					request: {
						qs: {
							'skip-to': '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Whitespace',
				name: 'whitespace',
				type: 'options',
				default: 'show-all',
				options: [
					{ name: 'Ignore All', value: 'ignore-all' },
					{ name: 'Ignore Change', value: 'ignore-change' },
					{ name: 'Ignore EOL', value: 'ignore-eol' },
					{ name: 'Show All', value: 'show-all' },
				],
				description: 'Whitespace behavior when generating file diffs',
				routing: {
					request: {
						qs: {
							whitespace: '={{$value || undefined}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Return All',
		name: 'returnAllPullRequestReviews',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForPullRequestGetReviews,
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
			...pullRequestReviewPagination,
		},
	},
	{
		displayName: 'Limit',
		name: 'limitPullRequestReviews',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				...showOnlyForPullRequestGetReviews,
				returnAllPullRequestReviews: [false],
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
		name: 'pagePullRequestReviews',
		type: 'number',
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForPullRequestGetReviews,
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
		displayName: 'Return All',
		name: 'returnAllPullRequestReviewComments',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForPullRequestGetReviewComments,
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
			...pullRequestReviewPagination,
		},
	},
	{
		displayName: 'Limit',
		name: 'limitPullRequestReviewComments',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				...showOnlyForPullRequestGetReviewComments,
				returnAllPullRequestReviewComments: [false],
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
		name: 'pagePullRequestReviewComments',
		type: 'number',
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: showOnlyForPullRequestGetReviewComments,
		},
		description: 'Page number of results to return (1-based)',
		routing: {
			send: {
				type: 'query',
				property: 'page',
			},
		},
	},
];
