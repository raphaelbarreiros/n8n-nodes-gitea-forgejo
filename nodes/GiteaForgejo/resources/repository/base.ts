import type { INodeProperties } from 'n8n-workflow';
import { branchSelect, ownerSelect, repositorySelect } from '../../shared/descriptions';
import {
	showOnlyForRepositoryActionRunById,
	showOnlyForRepositoryActionRunnerJobs,
	showOnlyForRepositoryActionSecretByName,
	showOnlyForRepositoryAddPushMirror,
	showOnlyForRepositoryGetRawFile,
	showOnlyForRepositoryPullRequestByBaseHead,
	showOnlyForRepositoryActionVariableByName,
	showOnlyForRepositoryApplyDiffPatch,
	showOnlyForRepositoryById,
	showOnlyForRepositoryByOwner,
	showOnlyForRepositoryArchive,
	showOnlyForRepositoryByName,
	showOnlyForRepositoryCommitSha,
	showOnlyForRepositoryCompare,
	showOnlyForRepositoryCreateFork,
	showOnlyForRepositoryCreateTag,
	showOnlyForRepositoryDispatchWorkflow,
	showOnlyForRepositoryFlagByName,
	showOnlyForRepositoryGetEditorConfig,
	showOnlyForRepositoryGetGitTree,
	showOnlyForRepositoryGetMany,
	showOnlyForRepositoryGetRawFileOrLfs,
	showOnlyForRepositoryGitBlobByShas,
	showOnlyForRepositoryGitCommit,
	showOnlyForRepositoryGitCommitDiffOrPatch,
	showOnlyForRepositoryGitNote,
	showOnlyForRepositoryGitRef,
	showOnlyForRepositoryGitSha,
	showOnlyForRepositoryReplaceFlags,
	showOnlyForRepositoryReplaceTopics,
	showOnlyForRepositorySetGitNote,
	showOnlyForRepositorySyncForkByBranch,
	showOnlyForRepositoryTagByName,
	showOnlyForRepositoryTagProtectionById,
	showOnlyForRepositoryTagProtectionWrite,
	showOnlyForRepositoryTeamByName,
	showOnlyForRepositoryPushMirrorByName,
	showOnlyForRepositoryTopicByName,
	showOnlyForRepositoryTransfer,
	showOnlyForRepositoryUpdate,
	showOnlyForRepositoryUpdateAvatar,
} from './constants';

export const repositoryBaseDescription: INodeProperties[] = [
	{
		displayName: 'Owner Type',
		name: 'ownerType',
		type: 'options',
		displayOptions: {
			show: showOnlyForRepositoryGetMany,
		},
		options: [
			{
				name: 'Organization',
				value: 'organization',
			},
			{
				name: 'User',
				value: 'user',
			},
		],
		default: 'user',
		description: 'Whether the repository owner is a user or an organization',
	},
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForRepositoryByOwner,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForRepositoryByName,
		},
	},
	{
		displayName: 'Update Options',
		name: 'updateOptions',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: showOnlyForRepositoryUpdate,
		},
		description: 'Repository update payload matching EditRepoOption',
		routing: {
			request: {
				body: '={{Object.keys($value || {}).length ? $value : undefined}}',
			},
		},
	},
	{
		displayName: 'Repository ID',
		name: 'repositoryId',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForRepositoryById,
		},
		description: 'ID of the repository',
	},
	{
		displayName: 'Media File Path',
		name: 'mediaFilepath',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. docs/guide.pdf',
		displayOptions: {
			show: showOnlyForRepositoryGetRawFileOrLfs,
		},
		description: 'File path to fetch raw content or LFS object for',
	},
	{
		displayName: 'Ref',
		name: 'mediaRef',
		type: 'string',
		default: '',
		placeholder: 'e.g. main',
		displayOptions: {
			show: showOnlyForRepositoryGetRawFileOrLfs,
		},
		description: 'Branch, tag, or commit reference to read from',
		routing: {
			request: {
				qs: {
					ref: '={{$value || undefined}}',
				},
			},
		},
	},
	{
		displayName: 'Raw File Path',
		name: 'rawFilepath',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. src/index.ts',
		displayOptions: {
			show: showOnlyForRepositoryGetRawFile,
		},
		description: 'File path to fetch from the raw endpoint',
	},
	{
		displayName: 'Raw Ref',
		name: 'rawRef',
		type: 'string',
		default: '',
		placeholder: 'e.g. main',
		displayOptions: {
			show: showOnlyForRepositoryGetRawFile,
		},
		description: 'Branch, tag, or commit reference to read from',
		routing: {
			request: {
				qs: {
					ref: '={{$value || undefined}}',
				},
			},
		},
	},
	{
		displayName: 'EditorConfig File Path',
		name: 'editorconfigFilepath',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. src/index.ts',
		displayOptions: {
			show: showOnlyForRepositoryGetEditorConfig,
		},
		description: 'Path of file to resolve EditorConfig for',
	},
	{
		displayName: 'EditorConfig Ref',
		name: 'editorconfigRef',
		type: 'string',
		default: '',
		placeholder: 'e.g. main',
		displayOptions: {
			show: showOnlyForRepositoryGetEditorConfig,
		},
		description: 'Branch, tag, or commit reference to resolve from',
		routing: {
			request: {
				qs: {
					ref: '={{$value || undefined}}',
				},
			},
		},
	},
	{
		displayName: 'Commit SHA',
		name: 'commitSha',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForRepositoryCommitSha,
		},
		description: 'SHA of the commit',
	},
	{
		displayName: 'Action Run ID',
		name: 'actionRunId',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		required: true,
		default: 1,
		displayOptions: {
			show: showOnlyForRepositoryActionRunById,
		},
		description: 'ID of the action run',
	},
	{
		displayName: 'Action Runner Job Labels',
		name: 'actionRunnerJobLabels',
		type: 'string',
		default: '',
		placeholder: 'linux,x64',
		displayOptions: {
			show: showOnlyForRepositoryActionRunnerJobs,
		},
		description: 'Comma-separated runner labels to search for',
		routing: {
			request: {
				qs: {
					labels: '={{$value || undefined}}',
				},
			},
		},
	},
	{
		displayName: 'Basehead',
		name: 'basehead',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. main...feature-branch',
		displayOptions: {
			show: showOnlyForRepositoryCompare,
		},
		description: 'Two refs to compare (for example base...head)',
	},
	{
		displayName: 'Pull Request Base',
		name: 'pullBase',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. main',
		displayOptions: {
			show: showOnlyForRepositoryPullRequestByBaseHead,
		},
		description: 'Base branch of the pull request',
	},
	{
		displayName: 'Pull Request Head',
		name: 'pullHead',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. feature/login-flow',
		displayOptions: {
			show: showOnlyForRepositoryPullRequestByBaseHead,
		},
		description: 'Head branch of the pull request',
	},
	{
		displayName: 'Archive',
		name: 'archive',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. main.zip',
		displayOptions: {
			show: showOnlyForRepositoryArchive,
		},
		description: 'Git reference and archive format (for example main.zip)',
	},
	{
		displayName: 'Git Ref',
		name: 'gitRef',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. heads/main',
		displayOptions: {
			show: showOnlyForRepositoryGitRef,
		},
		description: 'Full or partial git ref name to filter by',
	},
	{
		displayName: 'Git SHA',
		name: 'gitSha',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForRepositoryGitSha,
		},
		description: 'Git SHA or reference for the operation',
	},
	{
		displayName: 'Blob SHAs',
		name: 'gitBlobShas',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. sha1,sha2',
		displayOptions: {
			show: showOnlyForRepositoryGitBlobByShas,
		},
		description: 'Comma-separated blob SHAs to fetch',
		routing: {
			request: {
				qs: {
					shas: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Diff Type',
		name: 'diffType',
		type: 'options',
		default: 'diff',
		displayOptions: {
			show: showOnlyForRepositoryGitCommitDiffOrPatch,
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
		description: 'Whether to return a diff or patch output',
	},
	{
		displayName: 'Note Message',
		name: 'gitNoteMessage',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForRepositorySetGitNote,
		},
		description: 'Git note message to set',
		routing: {
			send: {
				type: 'body',
				property: 'message',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Include Stat',
		name: 'gitCommitStat',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: showOnlyForRepositoryGitCommit,
		},
		description: 'Whether to include diff statistics',
		routing: {
			request: {
				qs: {
					stat: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Include Verification',
		name: 'gitCommitVerification',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: showOnlyForRepositoryGitCommit,
		},
		description: 'Whether to include signature verification details',
		routing: {
			request: {
				qs: {
					verification: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Include Files',
		name: 'gitCommitFiles',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: showOnlyForRepositoryGitCommit,
		},
		description: 'Whether to include affected files list',
		routing: {
			request: {
				qs: {
					files: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Include Verification',
		name: 'gitNoteVerification',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: showOnlyForRepositoryGitNote,
		},
		description: 'Whether to include signature verification details',
		routing: {
			request: {
				qs: {
					verification: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Include Files',
		name: 'gitNoteFiles',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: showOnlyForRepositoryGitNote,
		},
		description: 'Whether to include affected files list',
		routing: {
			request: {
				qs: {
					files: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Recursive',
		name: 'gitTreeRecursive',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForRepositoryGetGitTree,
		},
		description: 'Whether to show all directories and files recursively',
		routing: {
			request: {
				qs: {
					recursive: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Tree Page',
		name: 'gitTreePage',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForRepositoryGetGitTree,
		},
		description: 'Page number for tree entries',
		routing: {
			request: {
				qs: {
					page: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Tree Per Page',
		name: 'gitTreePerPage',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: showOnlyForRepositoryGetGitTree,
		},
		description: 'Number of tree entries to return per page',
		routing: {
			request: {
				qs: {
					per_page: '={{$value}}',
				},
			},
		},
	},
	{
		...branchSelect,
		displayOptions: {
			show: showOnlyForRepositorySyncForkByBranch,
		},
	},
	{
		displayName: 'Team',
		name: 'team',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. qa-team',
		displayOptions: {
			show: showOnlyForRepositoryTeamByName,
		},
		description: 'Team name in the owner organization',
	},
	{
		displayName: 'Flag',
		name: 'flag',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. archived',
		displayOptions: {
			show: showOnlyForRepositoryFlagByName,
		},
		description: 'Flag name',
	},
	{
		displayName: 'Push Mirror Name',
		name: 'pushMirrorName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. origin-backup',
		displayOptions: {
			show: showOnlyForRepositoryPushMirrorByName,
		},
		description: 'Remote name of the push mirror',
	},
	{
		displayName: 'Push Mirror Options',
		name: 'pushMirrorOptions',
		type: 'collection',
		default: {},
		typeOptions: {
			multipleValueButtonText: 'Add Option',
		},
		displayOptions: {
			show: showOnlyForRepositoryAddPushMirror,
		},
		options: [
			{
				displayName: 'Branch Filter',
				name: 'branchFilter',
				type: 'string',
				default: '',
				description: 'Branch filter expression for mirrored refs',
				routing: {
					request: {
						body: {
							branch_filter: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Interval',
				name: 'interval',
				type: 'string',
				default: '',
				placeholder: 'e.g. 8h',
				description: 'Synchronization interval',
				routing: {
					request: {
						body: {
							interval: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Remote Address',
				name: 'remoteAddress',
				type: 'string',
				default: '',
				placeholder: 'e.g. https://example.com/org/repo.git',
				description: 'Remote address of the push mirror target',
				routing: {
					request: {
						body: {
							remote_address: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Remote Password',
				name: 'remotePassword',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Password or token used for remote authentication',
				routing: {
					request: {
						body: {
							remote_password: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Remote Username',
				name: 'remoteUsername',
				type: 'string',
				default: '',
				description: 'Username used for remote authentication',
				routing: {
					request: {
						body: {
							remote_username: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Sync On Commit',
				name: 'syncOnCommit',
				type: 'boolean',
				default: false,
				description: 'Whether to sync automatically on each commit',
				routing: {
					request: {
						body: {
							sync_on_commit: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Use SSH',
				name: 'useSsh',
				type: 'boolean',
				default: false,
				description: 'Whether to use SSH for push mirror authentication',
				routing: {
					request: {
						body: {
							use_ssh: '={{$value}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Secret Name',
		name: 'actionSecretName',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		default: '',
		placeholder: 'e.g. DEPLOY_TOKEN',
		displayOptions: {
			show: showOnlyForRepositoryActionSecretByName,
		},
		description: 'Name of the actions secret',
	},
	{
		displayName: 'Secret Data',
		name: 'actionSecretData',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['repository'],
				operation: ['upsertActionSecret'],
			},
		},
		description: 'Encrypted or plain secret payload expected by the server',
		routing: {
			send: {
				type: 'body',
				property: 'data',
			},
		},
	},
	{
		displayName: 'Variable Name',
		name: 'actionVariableName',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. DEPLOY_ENV',
		displayOptions: {
			show: showOnlyForRepositoryActionVariableByName,
		},
		description: 'Name of the actions variable',
	},
	{
		displayName: 'Variable Value',
		name: 'actionVariableValue',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['repository'],
				operation: ['createActionVariable', 'updateActionVariable'],
			},
		},
		description: 'Value of the actions variable',
		routing: {
			send: {
				type: 'body',
				property: 'value',
			},
		},
	},
	{
		displayName: 'New Variable Name',
		name: 'actionVariableNewName',
		type: 'string',
		default: '',
		placeholder: 'e.g. NEW_DEPLOY_ENV',
		displayOptions: {
			show: {
				resource: ['repository'],
				operation: ['updateActionVariable'],
			},
		},
		description: 'Optional new name for the variable',
		routing: {
			send: {
				type: 'body',
				property: 'name',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Workflow File',
		name: 'workflowFilename',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. ci.yml',
		displayOptions: {
			show: showOnlyForRepositoryDispatchWorkflow,
		},
		description: 'Workflow filename to dispatch',
	},
	{
		displayName: 'Workflow Ref',
		name: 'workflowRef',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. main',
		displayOptions: {
			show: showOnlyForRepositoryDispatchWorkflow,
		},
		description: 'Git reference for the workflow dispatch',
		routing: {
			send: {
				type: 'body',
				property: 'ref',
			},
		},
	},
	{
		displayName: 'Workflow Inputs',
		name: 'workflowInputs',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: showOnlyForRepositoryDispatchWorkflow,
		},
		description: 'Optional input key-value pairs for the workflow',
		routing: {
			request: {
				body: {
					inputs: '={{Object.keys($value || {}).length ? $value : undefined}}',
				},
			},
		},
	},
	{
		displayName: 'Return Run Info',
		name: 'workflowReturnRunInfo',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForRepositoryDispatchWorkflow,
		},
		description: 'Whether to return workflow run information',
		routing: {
			request: {
				body: {
					return_run_info: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Image (Base64)',
		name: 'avatarImageBase64',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForRepositoryUpdateAvatar,
		},
		description: 'Base64-encoded image data for the repository avatar',
		routing: {
			send: {
				type: 'body',
				property: 'image',
			},
		},
	},
	{
		displayName: 'New Owner',
		name: 'newOwner',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. forgejo-admins',
		displayOptions: {
			show: showOnlyForRepositoryTransfer,
		},
		description: 'Name of the new repository owner',
		routing: {
			send: {
				type: 'body',
				property: 'new_owner',
			},
		},
	},
	{
		displayName: 'Team IDs',
		name: 'teamIds',
		type: 'string',
		default: '',
		placeholder: 'e.g. 10,12',
		displayOptions: {
			show: showOnlyForRepositoryTransfer,
		},
		description: 'Comma-separated team IDs to keep repository access',
		routing: {
			send: {
				type: 'body',
				property: 'team_ids',
				value:
					'={{$value ? $value.split(",").map((entry) => Number(entry.trim())).filter((entry) => !Number.isNaN(entry)) : undefined}}',
			},
		},
	},
	{
		displayName: 'Fork Name',
		name: 'forkName',
		type: 'string',
		default: '',
		placeholder: 'e.g. my-repository-fork',
		displayOptions: {
			show: showOnlyForRepositoryCreateFork,
		},
		description: 'Optional name for the forked repository',
		routing: {
			send: {
				type: 'body',
				property: 'name',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Organization',
		name: 'forkOrganization',
		type: 'string',
		default: '',
		placeholder: 'e.g. my-org',
		displayOptions: {
			show: showOnlyForRepositoryCreateFork,
		},
		description: 'Optional organization to fork into',
		routing: {
			send: {
				type: 'body',
				property: 'organization',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Topic',
		name: 'topic',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. release-automation',
		displayOptions: {
			show: showOnlyForRepositoryTopicByName,
		},
		description: 'Topic name',
	},
	{
		displayName: 'Topics',
		name: 'topics',
		type: 'string',
		default: '',
		placeholder: 'topic-a,topic-b',
		displayOptions: {
			show: showOnlyForRepositoryReplaceTopics,
		},
		description: 'Comma-separated topic names to set on the repository',
		routing: {
			send: {
				type: 'body',
				property: 'topics',
				value: '={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : []}}',
			},
		},
	},
	{
		displayName: 'Flags',
		name: 'flags',
		type: 'string',
		default: '',
		placeholder: 'flag-a,flag-b',
		displayOptions: {
			show: showOnlyForRepositoryReplaceFlags,
		},
		description: 'Comma-separated flags to set on the repository',
		routing: {
			send: {
				type: 'body',
				property: 'flags',
				value: '={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : []}}',
			},
		},
	},
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. v1.0.0',
		displayOptions: {
			show: showOnlyForRepositoryTagByName,
		},
		description: 'Tag name',
	},
	{
		displayName: 'Tag Name',
		name: 'tagName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForRepositoryCreateTag,
		},
		description: 'Name of the tag to create',
		routing: {
			send: {
				type: 'body',
				property: 'tag_name',
			},
		},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		displayOptions: {
			show: showOnlyForRepositoryCreateTag,
		},
		description: 'Optional tag message for annotated tags',
		routing: {
			send: {
				type: 'body',
				property: 'message',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Target',
		name: 'target',
		type: 'string',
		default: '',
		placeholder: 'e.g. main',
		displayOptions: {
			show: showOnlyForRepositoryCreateTag,
		},
		description: 'Branch or commit SHA to tag',
		routing: {
			send: {
				type: 'body',
				property: 'target',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Diff Patch SHA',
		name: 'diffPatchSha',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForRepositoryApplyDiffPatch,
		},
		description: 'Current SHA of the file targeted by the patch',
		routing: {
			send: {
				type: 'body',
				property: 'sha',
			},
		},
	},
	{
		displayName: 'Diff Patch Content (Base64)',
		name: 'diffPatchContent',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		default: '',
		displayOptions: {
			show: showOnlyForRepositoryApplyDiffPatch,
		},
		description: 'Updated file content encoded as base64',
		routing: {
			send: {
				type: 'body',
				property: 'content',
			},
		},
	},
	{
		displayName: 'Diff Patch Options',
		name: 'diffPatchOptions',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Option',
		},
		displayOptions: {
			show: showOnlyForRepositoryApplyDiffPatch,
		},
		default: {},
		options: [
			{
				displayName: 'Author',
				name: 'author',
				type: 'json',
				default: '{}',
				description: 'Author identity object',
				routing: {
					request: {
						body: {
							author: '={{Object.keys($value || {}).length ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Branch',
				name: 'branch',
				type: 'string',
				default: '',
				description: 'Base branch for applying the patch',
				routing: {
					request: {
						body: {
							branch: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Committer',
				name: 'committer',
				type: 'json',
				default: '{}',
				description: 'Committer identity object',
				routing: {
					request: {
						body: {
							committer: '={{Object.keys($value || {}).length ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Dates',
				name: 'dates',
				type: 'json',
				default: '{}',
				description: 'Commit date options object',
				routing: {
					request: {
						body: {
							dates: '={{Object.keys($value || {}).length ? $value : undefined}}',
						},
					},
				},
			},
			{
				displayName: 'From Path',
				name: 'fromPath',
				type: 'string',
				default: '',
				description: 'Original file path to move or rename from',
				routing: {
					request: {
						body: {
							from_path: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				description: 'Commit message',
				routing: {
					request: {
						body: {
							message: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'New Branch',
				name: 'newBranch',
				type: 'string',
				default: '',
				description: 'Create change on a new branch',
				routing: {
					request: {
						body: {
							new_branch: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Sign Off',
				name: 'signoff',
				type: 'boolean',
				default: false,
				description: 'Whether to add a Signed-off-by trailer',
				routing: {
					request: {
						body: {
							signoff: '={{$value}}',
						},
					},
				},
			},
		],
	},
	{
		displayName: 'Tag Protection ID',
		name: 'tagProtectionId',
		type: 'number',
		required: true,
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: showOnlyForRepositoryTagProtectionById,
		},
		description: 'ID of the tag protection rule',
	},
	{
		displayName: 'Tag Protection Options',
		name: 'tagProtectionOptions',
		type: 'collection',
		default: {},
		typeOptions: {
			multipleValueButtonText: 'Add Option',
		},
		displayOptions: {
			show: showOnlyForRepositoryTagProtectionWrite,
		},
		options: [
			{
				displayName: 'Name Pattern',
				name: 'namePattern',
				type: 'string',
				default: '',
				description: 'Pattern of tag names to protect',
				routing: {
					request: {
						body: {
							name_pattern: '={{$value || undefined}}',
						},
					},
				},
			},
			{
				displayName: 'Whitelist Teams',
				name: 'whitelistTeams',
				type: 'string',
				default: '',
				placeholder: 'team-a,team-b',
				description: 'Comma-separated team names',
				routing: {
					request: {
						body: {
							whitelist_teams:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : []}}',
						},
					},
				},
			},
			{
				displayName: 'Whitelist Usernames',
				name: 'whitelistUsernames',
				type: 'string',
				default: '',
				placeholder: 'alice,bob',
				description: 'Comma-separated usernames',
				routing: {
					request: {
						body: {
							whitelist_usernames:
								'={{$value ? $value.split(",").map((entry) => entry.trim()).filter(Boolean) : []}}',
						},
					},
				},
			},
		],
	},
];
