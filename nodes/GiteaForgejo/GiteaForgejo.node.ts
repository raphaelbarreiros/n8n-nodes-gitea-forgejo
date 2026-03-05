import {
	NodeConnectionTypes,
	type IHttpRequestMethods,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { getOperations } from './loadOptions/getOperations';
import { getBranchProtections } from './listSearch/getBranchProtections';
import { getBranches } from './listSearch/getBranches';
import { getIssues } from './listSearch/getIssues';
import { getLabels } from './listSearch/getLabels';
import { getMilestones } from './listSearch/getMilestones';
import { getOwners } from './listSearch/getOwners';
import { getPullRequests } from './listSearch/getPullRequests';
import { getReleases } from './listSearch/getReleases';
import { getRepositories } from './listSearch/getRepositories';
import { getRepositoryKeys } from './listSearch/getRepositoryKeys';
import { getUsers } from './listSearch/getUsers';
import { getWebhooks } from './listSearch/getWebhooks';
import { activityPubDescription } from './resources/activitypub';
import { branchDescription } from './resources/branch';
import { branchProtectionDescription } from './resources/branchProtection';
import { collaboratorDescription } from './resources/collaborator';
import { commitStatusDescription } from './resources/commitStatus';
import { issueDescription } from './resources/issue';
import { executeIssueCreateAttachment } from './resources/issue/createAttachment';
import { issueCommentDescription } from './resources/issueComment';
import { executeIssueCommentCreateAttachment } from './resources/issueComment/createAttachment';
import { issueLabelDescription } from './resources/issueLabel';
import { labelDescription } from './resources/label';
import { miscellaneousDescription } from './resources/miscellaneous';
import { executeMiscellaneousRenderMarkdownRaw } from './resources/miscellaneous/renderMarkdownRaw';
import { milestoneDescription } from './resources/milestone';
import { notificationDescription } from './resources/notification';
import { packageDescription } from './resources/package';
import { pullRequestDescription } from './resources/pullRequest';
import { releaseDescription } from './resources/release';
import { executeReleaseAttachmentCreate } from './resources/releaseAttachment/create';
import { releaseAttachmentDescription } from './resources/releaseAttachment';
import { repositoryDescription } from './resources/repository';
import { repositoryContentDescription } from './resources/repositoryContent';
import { repositoryKeyDescription } from './resources/repositoryKey';
import { repositoryTemplateDescription } from './resources/repositoryTemplate';
import { settingsDescription } from './resources/settings';
import { adminDescription } from './resources/admin';
import { organizationDescription } from './resources/organization';
import { teamDescription } from './resources/team';
import { userDescription } from './resources/user';
import { usersDescription } from './resources/users';
import { webhookDescription } from './resources/webhook';
import { wikiPageDescription } from './resources/wikiPage';

const operationRequestMethodExpression = `={{
	({
		admin: {
			addQuotaRule: 'POST',
			addUserToQuotaGroup: 'PUT',
			adoptRepo: 'POST',
			createHook: 'POST',
			createQuotaGroup: 'POST',
			createQuotaRule: 'POST',
			createUser: 'POST',
			createUserOrg: 'POST',
			createUserPublicKey: 'POST',
			createUserRepo: 'POST',
			deleteHook: 'DELETE',
			deleteQuotaGroup: 'DELETE',
			deleteQuotaGroupRule: 'DELETE',
			deleteQuotaRule: 'DELETE',
			deleteUnadopted: 'DELETE',
			deleteUser: 'DELETE',
			deleteUserEmail: 'DELETE',
			deleteUserPublicKey: 'DELETE',
			getAllEmails: 'GET',
			getCronJobs: 'GET',
			getHook: 'GET',
			getManyHooks: 'GET',
			getManyOrgs: 'GET',
			getManyUnadopted: 'GET',
			getManyUsers: 'GET',
			getQuotaGroup: 'GET',
			getQuotaGroupUsers: 'GET',
			getQuotaGroups: 'GET',
			getQuotaRule: 'GET',
			getQuotaRules: 'GET',
			getRunnerJobs: 'GET',
			getRunnerRegistrationToken: 'GET',
			getUserEmails: 'GET',
			getUserQuota: 'GET',
			removeUserFromQuotaGroup: 'DELETE',
			renameUser: 'POST',
			runCronJob: 'POST',
			searchEmails: 'GET',
			setUserQuotaGroup: 'PUT',
			updateHook: 'PATCH',
			updateQuotaRule: 'PATCH',
			updateUser: 'PATCH',
		},
		branch: {
			create: 'POST',
			delete: 'DELETE',
			get: 'GET',
			getAll: 'GET',
			update: 'PATCH',
		},
		branchProtection: {
			create: 'POST',
			delete: 'DELETE',
			get: 'GET',
			getAll: 'GET',
			update: 'PATCH',
		},
		collaborator: {
			add: 'PUT',
			get: 'GET',
			getAll: 'GET',
			getPermission: 'GET',
			remove: 'DELETE',
		},
		commitStatus: {
			create: 'POST',
			getCombinedByRef: 'GET',
			getManyByRef: 'GET',
			getManyBySha: 'GET',
		},
		issue: {
			addBlock: 'POST',
			addDependency: 'POST',
			addReaction: 'POST',
			addSubscription: 'PUT',
			addTime: 'POST',
			checkSubscription: 'GET',
			create: 'POST',
			createAttachment: 'POST',
			deleteAttachment: 'DELETE',
			deleteBlock: 'DELETE',
			deleteDependency: 'DELETE',
			delete: 'DELETE',
			deleteReaction: 'DELETE',
			deleteStopwatch: 'DELETE',
			deleteSubscription: 'DELETE',
			deleteTime: 'DELETE',
			getAttachment: 'GET',
			getAttachments: 'GET',
			getBlocks: 'GET',
			getDependencies: 'GET',
			get: 'GET',
			getReactions: 'GET',
			getSubscriptions: 'GET',
			getTimeline: 'GET',
			getTimes: 'GET',
			getAll: 'GET',
			movePin: 'PATCH',
			pin: 'POST',
			search: 'GET',
			resetTime: 'DELETE',
			startStopwatch: 'POST',
			stopStopwatch: 'POST',
			unpin: 'DELETE',
			update: 'PATCH',
			updateAttachment: 'PATCH',
			updateDeadline: 'POST',
		},
		issueComment: {
			addReaction: 'POST',
			create: 'POST',
			createAttachment: 'POST',
			deleteAttachment: 'DELETE',
			deleteReaction: 'DELETE',
			delete: 'DELETE',
			getAttachment: 'GET',
			getAttachments: 'GET',
			get: 'GET',
			getAll: 'GET',
			getReactions: 'GET',
			getRepositoryComments: 'GET',
			update: 'PATCH',
			updateAttachment: 'PATCH',
		},
		issueLabel: {
			add: 'POST',
			getAll: 'GET',
			remove: 'DELETE',
			removeAll: 'DELETE',
			replace: 'PUT',
		},
		label: {
			create: 'POST',
			delete: 'DELETE',
			get: 'GET',
			getAll: 'GET',
			update: 'PATCH',
		},
		milestone: {
			create: 'POST',
			delete: 'DELETE',
			get: 'GET',
			getAll: 'GET',
			update: 'PATCH',
		},
		organization: {
			blockUser: 'PUT',
			create: 'POST',
			createActionVariable: 'POST',
			createHook: 'POST',
			createLabel: 'POST',
			createRepo: 'POST',
			createTeam: 'POST',
			delete: 'DELETE',
			deleteActionSecret: 'DELETE',
			deleteActionVariable: 'DELETE',
			deleteAvatar: 'DELETE',
			deleteHook: 'DELETE',
			deleteLabel: 'DELETE',
			deleteMember: 'DELETE',
			deletePublicMember: 'DELETE',
			get: 'GET',
			getActionSecrets: 'GET',
			getActionVariable: 'GET',
			getActionVariables: 'GET',
			getActivityFeeds: 'GET',
			getAll: 'GET',
			getHook: 'GET',
			getLabel: 'GET',
			getManyHooks: 'GET',
			getManyLabels: 'GET',
			getManyMembers: 'GET',
			getManyPublicMembers: 'GET',
			getManyRepos: 'GET',
			getManyTeams: 'GET',
			getMember: 'GET',
			getPublicMember: 'GET',
			getQuota: 'GET',
			getQuotaArtifacts: 'GET',
			getQuotaAttachments: 'GET',
			getQuotaCheck: 'GET',
			getQuotaPackages: 'GET',
			getRunnerJobs: 'GET',
			getRunnerRegistrationToken: 'GET',
			listBlockedUsers: 'GET',
			rename: 'POST',
			searchTeams: 'GET',
			setPublicMember: 'PUT',
			unblockUser: 'DELETE',
			update: 'PATCH',
			updateActionVariable: 'PUT',
			updateAvatar: 'POST',
			updateHook: 'PATCH',
			updateLabel: 'PATCH',
			upsertActionSecret: 'PUT',
		},
		pullRequest: {
			cancelAutoMerge: 'DELETE',
			createReview: 'POST',
			createReviewComment: 'POST',
			createReviewRequests: 'POST',
			create: 'POST',
			dismissReview: 'POST',
			deleteReview: 'DELETE',
			deleteReviewComment: 'DELETE',
			deleteReviewRequests: 'DELETE',
			get: 'GET',
			getCommits: 'GET',
			getDiffOrPatch: 'GET',
			getFiles: 'GET',
			getAll: 'GET',
			getReviewComment: 'GET',
			getReview: 'GET',
			getReviewComments: 'GET',
			getReviews: 'GET',
			isMerged: 'GET',
			merge: 'POST',
			submitReview: 'POST',
			undismissReview: 'POST',
			update: 'PATCH',
			updateBranch: 'POST',
		},
		release: {
			create: 'POST',
			delete: 'DELETE',
			deleteByTag: 'DELETE',
			get: 'GET',
			getAll: 'GET',
			getByTag: 'GET',
			getLatest: 'GET',
			update: 'PATCH',
		},
		releaseAttachment: {
			create: 'POST',
			delete: 'DELETE',
			get: 'GET',
			getAll: 'GET',
			update: 'PATCH',
		},
			repository: {
				addFlag: 'PUT',
				addPushMirror: 'POST',
				addTeam: 'PUT',
				addTopic: 'PUT',
				applyDiffPatch: 'POST',
				checkFlag: 'GET',
				checkTeam: 'GET',
				compare: 'GET',
				convert: 'POST',
				createActionVariable: 'POST',
				createFork: 'POST',
				createTag: 'POST',
				createTagProtection: 'POST',
				delete: 'DELETE',
				deleteActionSecret: 'DELETE',
				deleteActionVariable: 'DELETE',
				deleteAvatar: 'DELETE',
				deleteFlag: 'DELETE',
				deleteFlags: 'DELETE',
				deleteGitNote: 'DELETE',
				deletePushMirror: 'DELETE',
				deleteTag: 'DELETE',
				deleteTagProtection: 'DELETE',
				deleteTopic: 'DELETE',
				get: 'GET',
				getActionRun: 'GET',
				getActionRunnerJobs: 'GET',
				getActionRuns: 'GET',
				getActionSecrets: 'GET',
				getActionTasks: 'GET',
				getActionVariable: 'GET',
				getActionVariables: 'GET',
				getActivityFeeds: 'GET',
				getById: 'GET',
				getArchive: 'GET',
				getAssignees: 'GET',
				getCommitPullRequest: 'GET',
				getCommits: 'GET',
				getEditorConfig: 'GET',
				getForks: 'GET',
				getFlags: 'GET',
				getGitAnnotatedTag: 'GET',
				getGitBlob: 'GET',
				getGitBlobs: 'GET',
				getGitCommit: 'GET',
				getGitCommitDiffOrPatch: 'GET',
				getGitNote: 'GET',
				getGitRefs: 'GET',
				getGitRefsByRef: 'GET',
				getGitTree: 'GET',
				getIssueConfig: 'GET',
				getIssueTemplates: 'GET',
				getLanguages: 'GET',
				getNotifications: 'GET',
				getNewPinAllowed: 'GET',
				getPinnedIssues: 'GET',
				getPinnedPullRequests: 'GET',
				getPullRequestByBaseHead: 'GET',
				getPushMirror: 'GET',
				getPushMirrors: 'GET',
				getRawFile: 'GET',
				getRawFileOrLfs: 'GET',
				getRunnerRegistrationToken: 'GET',
				getSigningKey: 'GET',
			getTag: 'GET',
			getTags: 'GET',
			getTagProtection: 'GET',
			getTagProtections: 'GET',
			getTeams: 'GET',
			getTopics: 'GET',
			getTrackedTimes: 'GET',
			getSyncForkBranchInfo: 'GET',
			getSyncForkDefaultInfo: 'GET',
			getReviewers: 'GET',
			getStargazers: 'GET',
			getSubscribers: 'GET',
			getSubscription: 'GET',
			getMany: 'GET',
				markNotifications: 'PUT',
				migrate: 'POST',
				mirrorSync: 'POST',
				dispatchWorkflow: 'POST',
				replaceFlags: 'PUT',
				replaceTopics: 'PUT',
				removeTeam: 'DELETE',
				search: 'GET',
				setGitNote: 'POST',
				syncForkBranch: 'POST',
				syncForkDefault: 'POST',
				syncPushMirrors: 'POST',
			transfer: 'POST',
			transferAccept: 'POST',
				transferReject: 'POST',
				unwatch: 'DELETE',
				upsertActionSecret: 'PUT',
				updateActionVariable: 'PUT',
				update: 'PATCH',
				updateAvatar: 'POST',
				updateTagProtection: 'PATCH',
				validateIssueConfig: 'GET',
				watch: 'PUT',
		},
		repositoryContent: {
			changeMany: 'POST',
			create: 'POST',
			delete: 'DELETE',
			get: 'GET',
			getRoot: 'GET',
			update: 'PUT',
		},
		repositoryKey: {
			create: 'POST',
			delete: 'DELETE',
			get: 'GET',
			getAll: 'GET',
		},
		repositoryTemplate: {
			generate: 'POST',
		},
		team: {
			addMember: 'PUT',
			addRepo: 'PUT',
			delete: 'DELETE',
			get: 'GET',
			getActivityFeeds: 'GET',
			getManyMembers: 'GET',
			getManyRepos: 'GET',
			getMember: 'GET',
			getRepo: 'GET',
			removeMember: 'DELETE',
			removeRepo: 'DELETE',
			update: 'PATCH',
		},
		user: {
			addEmail: 'POST',
			blockUser: 'PUT',
			checkFollowing: 'GET',
			checkStarring: 'GET',
			createActionVariable: 'POST',
			createGPGKey: 'POST',
			createHook: 'POST',
			createOAuth2Application: 'POST',
			createRepo: 'POST',
			createSSHKey: 'POST',
			deleteActionSecret: 'DELETE',
			deleteActionVariable: 'DELETE',
			deleteAvatar: 'DELETE',
			deleteEmail: 'DELETE',
			deleteGPGKey: 'DELETE',
			deleteHook: 'DELETE',
			deleteOAuth2Application: 'DELETE',
			deleteSSHKey: 'DELETE',
			follow: 'PUT',
			getActionVariable: 'GET',
			getActionVariables: 'GET',
			getAuthenticated: 'GET',
			getGPGKey: 'GET',
			getGPGKeyToken: 'GET',
			getHook: 'GET',
			getManyEmails: 'GET',
			getManyFollowers: 'GET',
			getManyFollowing: 'GET',
			getManyGPGKeys: 'GET',
			getManyHooks: 'GET',
			getManyOrgs: 'GET',
			getManyRepos: 'GET',
			getManySSHKeys: 'GET',
			getManyStarred: 'GET',
			getManyStopwatches: 'GET',
			getManySubscriptions: 'GET',
			getManyTeams: 'GET',
			getManyTrackedTimes: 'GET',
			getOAuth2Application: 'GET',
			getOAuth2Applications: 'GET',
			getQuota: 'GET',
			getQuotaArtifacts: 'GET',
			getQuotaAttachments: 'GET',
			getQuotaCheck: 'GET',
			getQuotaPackages: 'GET',
			getRunnerJobs: 'GET',
			getRunnerRegistrationToken: 'GET',
			getSettings: 'GET',
			getSSHKey: 'GET',
			listBlockedUsers: 'GET',
			starRepo: 'PUT',
			unblockUser: 'DELETE',
			unfollow: 'DELETE',
			unstarRepo: 'DELETE',
			updateActionVariable: 'PUT',
			updateAvatar: 'POST',
			updateHook: 'PATCH',
			updateOAuth2Application: 'PATCH',
			updateSettings: 'PUT',
			upsertActionSecret: 'PUT',
			verifyGPGKey: 'POST',
		},
		users: {
			checkFollowing: 'GET',
			createToken: 'POST',
			deleteToken: 'DELETE',
			get: 'GET',
			getActivityFeeds: 'GET',
			getHeatmap: 'GET',
			getManyFollowers: 'GET',
			getManyFollowing: 'GET',
			getManyGPGKeys: 'GET',
			getManyOrgs: 'GET',
			getManyRepos: 'GET',
			getManySSHKeys: 'GET',
			getManyStarred: 'GET',
			getManySubscriptions: 'GET',
			getOrgPermissions: 'GET',
			getTokens: 'GET',
			search: 'GET',
		},
		activitypub: {
			getInstanceActor: 'GET',
			getPerson: 'GET',
			getPersonActivity: 'GET',
			getPersonActivityNote: 'GET',
			getPersonFeed: 'GET',
			getRepository: 'GET',
			instanceActorInbox: 'POST',
			instanceActorOutbox: 'POST',
			personInbox: 'POST',
			repositoryInbox: 'POST',
			repositoryOutbox: 'POST',
		},
		miscellaneous: {
			getGitignoreTemplate: 'GET',
			getGitignoreTemplates: 'GET',
			getLabelTemplate: 'GET',
			getLabelTemplates: 'GET',
			getLicenseTemplate: 'GET',
			getLicenseTemplates: 'GET',
			getNodeInfo: 'GET',
			getSigningKey: 'GET',
			getSSHSigningKey: 'GET',
			getVersion: 'GET',
			renderMarkdown: 'POST',
			renderMarkdownRaw: 'POST',
			renderMarkup: 'POST',
		},
		notification: {
			getList: 'GET',
			getNewAvailable: 'GET',
			getRepoList: 'GET',
			getThread: 'GET',
			readList: 'PUT',
			readRepoList: 'PUT',
			readThread: 'PATCH',
		},
		package: {
			delete: 'DELETE',
			get: 'GET',
			getFiles: 'GET',
			linkRepo: 'POST',
			list: 'GET',
			unlinkRepo: 'POST',
		},
		settings: {
			getAPISettings: 'GET',
			getAttachmentSettings: 'GET',
			getRepositorySettings: 'GET',
			getUISettings: 'GET',
		},
		wikiPage: {
			create: 'POST',
			delete: 'DELETE',
			get: 'GET',
			getAll: 'GET',
			getRevisions: 'GET',
			update: 'PATCH',
		},
		webhook: {
			create: 'POST',
			delete: 'DELETE',
			deleteGitHook: 'DELETE',
			get: 'GET',
			getAll: 'GET',
			getGitHook: 'GET',
			getGitHooks: 'GET',
			test: 'POST',
			updateGitHook: 'PATCH',
			update: 'PATCH',
		},
	}[$parameter.resource] ?? {})[$value]
}}` as unknown as IHttpRequestMethods;

const operationRequestUrlExpression = `={{
	({
		admin: {
			addQuotaRule: '/admin/quota/groups/' + $parameter.quotaGroup + '/rules',
			addUserToQuotaGroup: '/admin/quota/groups/' + $parameter.quotaGroup + '/users/' + $parameter.targetUsername,
			adoptRepo: '/admin/unadopted/' + $parameter.owner + '/' + $parameter.repo,
			createHook: '/admin/hooks',
			createQuotaGroup: '/admin/quota/groups',
			createQuotaRule: '/admin/quota/rules',
			createUser: '/admin/users',
			createUserOrg: '/admin/users/' + $parameter.targetUsername + '/orgs',
			createUserPublicKey: '/admin/users/' + $parameter.targetUsername + '/keys',
			createUserRepo: '/admin/users/' + $parameter.targetUsername + '/repos',
			deleteHook: '/admin/hooks/' + $parameter.hookId,
			deleteQuotaGroup: '/admin/quota/groups/' + $parameter.quotaGroup,
			deleteQuotaGroupRule: '/admin/quota/groups/' + $parameter.quotaGroup + '/rules/' + $parameter.quotaRule,
			deleteQuotaRule: '/admin/quota/rules/' + $parameter.quotaRule,
			deleteUnadopted: '/admin/unadopted/' + $parameter.owner + '/' + $parameter.repo,
			deleteUser: '/admin/users/' + $parameter.targetUsername,
			deleteUserEmail: '/admin/users/' + $parameter.targetUsername + '/emails',
			deleteUserPublicKey: '/admin/users/' + $parameter.targetUsername + '/keys/' + $parameter.keyId,
			getAllEmails: '/admin/emails',
			getCronJobs: '/admin/cron',
			getHook: '/admin/hooks/' + $parameter.hookId,
			getManyHooks: '/admin/hooks',
			getManyOrgs: '/admin/orgs',
			getManyUnadopted: '/admin/unadopted',
			getManyUsers: '/admin/users',
			getQuotaGroup: '/admin/quota/groups/' + $parameter.quotaGroup,
			getQuotaGroupUsers: '/admin/quota/groups/' + $parameter.quotaGroup + '/users',
			getQuotaGroups: '/admin/quota/groups',
			getQuotaRule: '/admin/quota/rules/' + $parameter.quotaRule,
			getQuotaRules: '/admin/quota/rules',
			getRunnerJobs: '/admin/runners/jobs',
			getRunnerRegistrationToken: '/admin/runners/registration-token',
			getUserEmails: '/admin/users/' + $parameter.targetUsername + '/emails',
			getUserQuota: '/admin/users/' + $parameter.targetUsername + '/quota',
			removeUserFromQuotaGroup: '/admin/quota/groups/' + $parameter.quotaGroup + '/users/' + $parameter.targetUsername,
			renameUser: '/admin/users/' + $parameter.targetUsername + '/rename',
			runCronJob: '/admin/cron/' + $parameter.cronTask,
			searchEmails: '/admin/emails/search',
			setUserQuotaGroup: '/admin/users/' + $parameter.targetUsername + '/quota/groups',
			updateHook: '/admin/hooks/' + $parameter.hookId,
			updateQuotaRule: '/admin/quota/rules/' + $parameter.quotaRule,
			updateUser: '/admin/users/' + $parameter.targetUsername,
		},
		branch: {
			create: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/branches',
			delete:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/branches/' + $parameter.branch,
			get: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/branches/' + $parameter.branch,
			getAll: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/branches',
			update:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/branches/' + $parameter.branch,
		},
		branchProtection: {
			create: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/branch_protections',
			delete:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/branch_protections/' +
				$parameter.branchProtectionName,
			get:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/branch_protections/' +
				$parameter.branchProtectionName,
			getAll: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/branch_protections',
			update:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/branch_protections/' +
				$parameter.branchProtectionName,
		},
		collaborator: {
			add:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/collaborators/' +
				$parameter.collaborator,
			get:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/collaborators/' +
				$parameter.collaborator,
			getAll: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/collaborators',
			getPermission:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/collaborators/' +
				$parameter.collaborator +
				'/permission',
			remove:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/collaborators/' +
				$parameter.collaborator,
		},
		commitStatus: {
			create:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/statuses/' + $parameter.sha,
			getCombinedByRef:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/commits/' +
				$parameter.reference +
				'/status',
			getManyByRef:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/commits/' +
				$parameter.reference +
				'/statuses',
			getManyBySha:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/statuses/' + $parameter.sha,
		},
		issue: {
			addBlock:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/blocks',
			addDependency:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/dependencies',
			addReaction:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/reactions',
			addSubscription:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/subscriptions/' +
				$parameter.issueSubscriptionUser,
			addTime:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/times',
			checkSubscription:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/subscriptions/check',
			create: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/issues',
			createAttachment:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/assets',
			deleteAttachment:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/assets/' +
				$parameter.issueAttachmentId,
			deleteBlock:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/blocks',
			deleteDependency:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/dependencies',
			delete:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue,
			deleteReaction:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/reactions',
			deleteStopwatch:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/stopwatch/delete',
			deleteSubscription:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/subscriptions/' +
				$parameter.issueSubscriptionUser,
			deleteTime:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/times/' +
				$parameter.issueTimeId,
			getBlocks:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/blocks',
			getAttachment:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/assets/' +
				$parameter.issueAttachmentId,
			getAttachments:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/assets',
			getDependencies:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/dependencies',
			get:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue,
			getReactions:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/reactions',
			getSubscriptions:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/subscriptions',
			getTimeline:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/timeline',
			getTimes:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/times',
			getAll: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/issues',
			movePin:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/pin/' +
				$parameter.issuePinPosition,
			pin:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/pin',
			search: '/repos/issues/search',
			resetTime:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/times',
			startStopwatch:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/stopwatch/start',
			stopStopwatch:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/stopwatch/stop',
			unpin:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/pin',
			update:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue,
			updateAttachment:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/assets/' +
				$parameter.issueAttachmentId,
			updateDeadline:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/deadline',
		},
		issueComment: {
			addReaction:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/comments/' +
				$parameter.issueCommentId +
				'/reactions',
			create:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/comments',
			createAttachment:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/comments/' +
				$parameter.issueCommentId +
				'/assets',
			deleteAttachment:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/comments/' +
				$parameter.issueCommentId +
				'/assets/' +
				$parameter.issueCommentAttachmentId,
			deleteReaction:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/comments/' +
				$parameter.issueCommentId +
				'/reactions',
			delete:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/comments/' +
				$parameter.issueCommentId,
			get:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/comments/' +
				$parameter.issueCommentId,
			getAttachment:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/comments/' +
				$parameter.issueCommentId +
				'/assets/' +
				$parameter.issueCommentAttachmentId,
			getAttachments:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/comments/' +
				$parameter.issueCommentId +
				'/assets',
			getAll:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/comments',
			getReactions:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/comments/' +
				$parameter.issueCommentId +
				'/reactions',
			getRepositoryComments:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/issues/comments',
			update:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/comments/' +
				$parameter.issueCommentId,
			updateAttachment:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/comments/' +
				$parameter.issueCommentId +
				'/assets/' +
				$parameter.issueCommentAttachmentId,
		},
		issueLabel: {
			add:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/issues/' + $parameter.issue + '/labels',
			getAll:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/issues/' + $parameter.issue + '/labels',
			remove:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/issues/' +
				$parameter.issue +
				'/labels/' +
				$parameter.labelIdentifier,
			removeAll:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/issues/' + $parameter.issue + '/labels',
			replace:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/issues/' + $parameter.issue + '/labels',
		},
		label: {
			create: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/labels',
			delete:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/labels/' + $parameter.labelId,
			get: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/labels/' + $parameter.labelId,
			getAll: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/labels',
			update:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/labels/' + $parameter.labelId,
		},
		milestone: {
			create: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/milestones',
			delete:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/milestones/' +
				$parameter.milestoneId,
			get:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/milestones/' +
				$parameter.milestoneId,
			getAll: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/milestones',
			update:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/milestones/' +
				$parameter.milestoneId,
		},
		organization: {
			blockUser: '/orgs/' + $parameter.org + '/blocks/' + $parameter.targetUsername,
			create: '/orgs',
			createActionVariable: '/orgs/' + $parameter.org + '/actions/variables/' + $parameter.actionVariableName,
			createHook: '/orgs/' + $parameter.org + '/hooks',
			createLabel: '/orgs/' + $parameter.org + '/labels',
			createRepo: '/orgs/' + $parameter.org + '/repos',
			createTeam: '/orgs/' + $parameter.org + '/teams',
			delete: '/orgs/' + $parameter.org,
			deleteActionSecret: '/orgs/' + $parameter.org + '/actions/secrets/' + $parameter.actionSecretName,
			deleteActionVariable: '/orgs/' + $parameter.org + '/actions/variables/' + $parameter.actionVariableName,
			deleteAvatar: '/orgs/' + $parameter.org + '/avatar',
			deleteHook: '/orgs/' + $parameter.org + '/hooks/' + $parameter.hookId,
			deleteLabel: '/orgs/' + $parameter.org + '/labels/' + $parameter.labelId,
			deleteMember: '/orgs/' + $parameter.org + '/members/' + $parameter.targetUsername,
			deletePublicMember: '/orgs/' + $parameter.org + '/public_members/' + $parameter.targetUsername,
			get: '/orgs/' + $parameter.org,
			getActionSecrets: '/orgs/' + $parameter.org + '/actions/secrets',
			getActionVariable: '/orgs/' + $parameter.org + '/actions/variables/' + $parameter.actionVariableName,
			getActionVariables: '/orgs/' + $parameter.org + '/actions/variables',
			getActivityFeeds: '/orgs/' + $parameter.org + '/activities/feeds',
			getAll: '/admin/orgs',
			getHook: '/orgs/' + $parameter.org + '/hooks/' + $parameter.hookId,
			getLabel: '/orgs/' + $parameter.org + '/labels/' + $parameter.labelId,
			getManyHooks: '/orgs/' + $parameter.org + '/hooks',
			getManyLabels: '/orgs/' + $parameter.org + '/labels',
			getManyMembers: '/orgs/' + $parameter.org + '/members',
			getManyPublicMembers: '/orgs/' + $parameter.org + '/public_members',
			getManyRepos: '/orgs/' + $parameter.org + '/repos',
			getManyTeams: '/orgs/' + $parameter.org + '/teams',
			getMember: '/orgs/' + $parameter.org + '/members/' + $parameter.targetUsername,
			getPublicMember: '/orgs/' + $parameter.org + '/public_members/' + $parameter.targetUsername,
			getQuota: '/orgs/' + $parameter.org + '/quota',
			getQuotaArtifacts: '/orgs/' + $parameter.org + '/quota/artifacts',
			getQuotaAttachments: '/orgs/' + $parameter.org + '/quota/attachments',
			getQuotaCheck: '/orgs/' + $parameter.org + '/quota/check',
			getQuotaPackages: '/orgs/' + $parameter.org + '/quota/packages',
			getRunnerJobs: '/orgs/' + $parameter.org + '/runners/jobs',
			getRunnerRegistrationToken: '/orgs/' + $parameter.org + '/runners/registration-token',
			listBlockedUsers: '/orgs/' + $parameter.org + '/blocks',
			rename: '/orgs/' + $parameter.org + '/rename',
			searchTeams: '/orgs/' + $parameter.org + '/teams/search',
			setPublicMember: '/orgs/' + $parameter.org + '/public_members/' + $parameter.targetUsername,
			unblockUser: '/orgs/' + $parameter.org + '/blocks/' + $parameter.targetUsername,
			update: '/orgs/' + $parameter.org,
			updateActionVariable: '/orgs/' + $parameter.org + '/actions/variables/' + $parameter.actionVariableName,
			updateAvatar: '/orgs/' + $parameter.org + '/avatar',
			updateHook: '/orgs/' + $parameter.org + '/hooks/' + $parameter.hookId,
			updateLabel: '/orgs/' + $parameter.org + '/labels/' + $parameter.labelId,
			upsertActionSecret: '/orgs/' + $parameter.org + '/actions/secrets/' + $parameter.actionSecretName,
		},
		pullRequest: {
			cancelAutoMerge:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/merge',
			createReview:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/reviews',
			createReviewComment:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/reviews/' +
				$parameter.pullRequestReviewId +
				'/comments',
			createReviewRequests:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/requested_reviewers',
			create: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/pulls',
			dismissReview:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/reviews/' +
				$parameter.pullRequestReviewId +
				'/dismissals',
			deleteReview:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/reviews/' +
				$parameter.pullRequestReviewId,
			deleteReviewComment:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/reviews/' +
				$parameter.pullRequestReviewId +
				'/comments/' +
				$parameter.pullRequestReviewCommentId,
			deleteReviewRequests:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/requested_reviewers',
			get:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest,
			getCommits:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/commits',
			getDiffOrPatch:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'.' +
				$parameter.pullRequestDiffType,
			getFiles:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/files',
			getAll: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/pulls',
			getReviewComment:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/reviews/' +
				$parameter.pullRequestReviewId +
				'/comments/' +
				$parameter.pullRequestReviewCommentId,
			getReview:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/reviews/' +
				$parameter.pullRequestReviewId,
			getReviewComments:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/reviews/' +
				$parameter.pullRequestReviewId +
				'/comments',
			getReviews:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/reviews',
			isMerged:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/merge',
			merge:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/merge',
			submitReview:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/reviews/' +
				$parameter.pullRequestReviewId,
			undismissReview:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/reviews/' +
				$parameter.pullRequestReviewId +
				'/undismissals',
			update:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest,
			updateBranch:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/pulls/' +
				$parameter.pullRequest +
				'/update',
		},
		release: {
			create: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/releases',
			delete:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/releases/' +
				$parameter.releaseId,
			deleteByTag:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/releases/tags/' +
				$parameter.tag,
			get:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/releases/' +
				$parameter.releaseId,
			getAll: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/releases',
			getByTag:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/releases/tags/' +
				$parameter.tag,
			getLatest: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/releases/latest',
			update:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/releases/' +
				$parameter.releaseId,
		},
		releaseAttachment: {
			create: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/releases/' + $parameter.releaseId + '/assets',
			delete:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/releases/' +
				$parameter.releaseId +
				'/assets/' +
				$parameter.attachmentId,
			get:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/releases/' +
				$parameter.releaseId +
				'/assets/' +
				$parameter.attachmentId,
			getAll:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/releases/' +
				$parameter.releaseId +
				'/assets',
			update:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/releases/' +
				$parameter.releaseId +
				'/assets/' +
				$parameter.attachmentId,
		},
			repository: {
				addFlag:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/flags/' +
					$parameter.flag,
				addPushMirror: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/push_mirrors',
				addTeam:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/teams/' +
					$parameter.team,
				addTopic:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/topics/' +
					$parameter.topic,
				applyDiffPatch: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/diffpatch',
				checkFlag:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/flags/' +
					$parameter.flag,
				checkTeam:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/teams/' +
					$parameter.team,
				compare:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/compare/' +
					$parameter.basehead,
				convert: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/convert',
				createActionVariable:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/actions/variables/' +
					$parameter.actionVariableName,
				createFork: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/forks',
				createTag: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/tags',
			createTagProtection:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/tag_protections',
				delete: '/repos/' + $parameter.owner + '/' + $parameter.repository,
				deleteActionSecret:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/actions/secrets/' +
					$parameter.actionSecretName,
				deleteActionVariable:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/actions/variables/' +
					$parameter.actionVariableName,
				deleteAvatar: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/avatar',
				deleteFlag:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/flags/' +
					$parameter.flag,
				deleteFlags: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/flags',
				deleteGitNote:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/git/notes/' +
					$parameter.gitSha,
				deletePushMirror:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/push_mirrors/' +
					$parameter.pushMirrorName,
			deleteTag:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/tags/' +
				$parameter.tag,
			deleteTagProtection:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/tag_protections/' +
				$parameter.tagProtectionId,
				deleteTopic:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/topics/' +
					$parameter.topic,
				get: '/repos/' + $parameter.owner + '/' + $parameter.repository,
				getActionRun:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/actions/runs/' +
					$parameter.actionRunId,
				getActionRunnerJobs:
					'/repos/' + $parameter.owner + '/' + $parameter.repository + '/actions/runners/jobs',
				getActionRuns: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/actions/runs',
				getActionSecrets:
					'/repos/' + $parameter.owner + '/' + $parameter.repository + '/actions/secrets',
				getActionTasks: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/actions/tasks',
				getActionVariable:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/actions/variables/' +
					$parameter.actionVariableName,
				getActionVariables:
					'/repos/' + $parameter.owner + '/' + $parameter.repository + '/actions/variables',
				getActivityFeeds:
					'/repos/' + $parameter.owner + '/' + $parameter.repository + '/activities/feeds',
				getById: '/repositories/' + $parameter.repositoryId,
				getArchive: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/archive/' + $parameter.archive,
				getAssignees: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/assignees',
				getCommitPullRequest:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/commits/' +
					$parameter.commitSha +
					'/pull',
				getCommits: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/commits',
				getEditorConfig:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/editorconfig/' +
					$parameter.editorconfigFilepath,
				getForks: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/forks',
				getFlags: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/flags',
				getGitAnnotatedTag:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/git/tags/' +
					$parameter.gitSha,
				getGitBlob:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/git/blobs/' +
					$parameter.gitSha,
				getGitBlobs: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/git/blobs',
				getGitCommit:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/git/commits/' +
					$parameter.gitSha,
				getGitCommitDiffOrPatch:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/git/commits/' +
					$parameter.gitSha +
					'.' +
					$parameter.diffType,
				getGitNote:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/git/notes/' +
					$parameter.gitSha,
				getGitRefs: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/git/refs',
				getGitRefsByRef:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/git/refs/' +
					$parameter.gitRef,
				getGitTree:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/git/trees/' +
					$parameter.gitSha,
				getIssueConfig: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/issue_config',
				getIssueTemplates:
					'/repos/' + $parameter.owner + '/' + $parameter.repository + '/issue_templates',
				getLanguages: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/languages',
				getNotifications: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/notifications',
				getNewPinAllowed:
					'/repos/' + $parameter.owner + '/' + $parameter.repository + '/new_pin_allowed',
				getPinnedIssues: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/issues/pinned',
				getPinnedPullRequests: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/pulls/pinned',
				getPullRequestByBaseHead:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/pulls/' +
					$parameter.pullBase +
					'/' +
					$parameter.pullHead,
				getPushMirror:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/push_mirrors/' +
					$parameter.pushMirrorName,
				getPushMirrors: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/push_mirrors',
				getRawFile:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/raw/' +
					$parameter.rawFilepath,
				getRawFileOrLfs:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/media/' +
					$parameter.mediaFilepath,
				getRunnerRegistrationToken:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/actions/runners/registration-token',
				getSigningKey: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/signing-key.gpg',
			getTag:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/tags/' +
				$parameter.tag,
			getTags: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/tags',
			getTagProtection:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/tag_protections/' +
				$parameter.tagProtectionId,
			getTagProtections:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/tag_protections',
			getTeams: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/teams',
			getTopics: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/topics',
			getTrackedTimes: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/times',
			getSyncForkBranchInfo:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/sync_fork/' +
				$parameter.branch,
			getSyncForkDefaultInfo: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/sync_fork',
			getReviewers: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/reviewers',
			getStargazers: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/stargazers',
			getSubscribers: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/subscribers',
			getSubscription: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/subscription',
				getMany:
					$parameter.ownerType === 'organization'
						? '/orgs/' + $parameter.owner + '/repos'
						: '/users/' + $parameter.owner + '/repos',
				markNotifications: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/notifications',
				migrate: '/repos/migrate',
				mirrorSync: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/mirror-sync',
				dispatchWorkflow:
					'/repos/' +
					$parameter.owner +
				'/' +
				$parameter.repository +
				'/actions/workflows/' +
				$parameter.workflowFilename +
				'/dispatches',
				replaceFlags: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/flags',
				replaceTopics: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/topics',
				removeTeam:
					'/repos/' +
					$parameter.owner +
					'/' +
						$parameter.repository +
						'/teams/' +
						$parameter.team,
				search: '/repos/search',
				setGitNote:
					'/repos/' +
					$parameter.owner +
					'/' +
					$parameter.repository +
					'/git/notes/' +
					$parameter.gitSha,
			syncForkBranch:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/sync_fork/' +
				$parameter.branch,
			syncForkDefault: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/sync_fork',
			syncPushMirrors: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/push_mirrors-sync',
			transfer: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/transfer',
			transferAccept: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/transfer/accept',
			transferReject: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/transfer/reject',
			unwatch: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/subscription',
			upsertActionSecret:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/actions/secrets/' +
				$parameter.actionSecretName,
			updateActionVariable:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/actions/variables/' +
				$parameter.actionVariableName,
			update: '/repos/' + $parameter.owner + '/' + $parameter.repository,
			updateAvatar: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/avatar',
			updateTagProtection:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/tag_protections/' +
				$parameter.tagProtectionId,
			validateIssueConfig:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/issue_config/validate',
			watch: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/subscription',
		},
		repositoryContent: {
			changeMany: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/contents',
			create:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/contents/' +
				$parameter.filePath,
			delete:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/contents/' +
				$parameter.filePath,
			get:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/contents/' +
				$parameter.filePath,
			getRoot: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/contents',
			update:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/contents/' +
				$parameter.filePath,
		},
		repositoryKey: {
			create: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/keys',
			delete:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/keys/' +
				$parameter.repositoryKeyId,
			get:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/keys/' +
				$parameter.repositoryKeyId,
			getAll: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/keys',
		},
		repositoryTemplate: {
			generate: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/generate',
		},
		team: {
			addMember: '/teams/' + $parameter.teamId + '/members/' + $parameter.targetUsername,
			addRepo: '/teams/' + $parameter.teamId + '/repos/' + $parameter.org + '/' + $parameter.repo,
			delete: '/teams/' + $parameter.teamId,
			get: '/teams/' + $parameter.teamId,
			getActivityFeeds: '/teams/' + $parameter.teamId + '/activities/feeds',
			getManyMembers: '/teams/' + $parameter.teamId + '/members',
			getManyRepos: '/teams/' + $parameter.teamId + '/repos',
			getMember: '/teams/' + $parameter.teamId + '/members/' + $parameter.targetUsername,
			getRepo: '/teams/' + $parameter.teamId + '/repos/' + $parameter.org + '/' + $parameter.repo,
			removeMember: '/teams/' + $parameter.teamId + '/members/' + $parameter.targetUsername,
			removeRepo: '/teams/' + $parameter.teamId + '/repos/' + $parameter.org + '/' + $parameter.repo,
			update: '/teams/' + $parameter.teamId,
		},
		user: {
			addEmail: '/user/emails',
			blockUser: '/user/blocks/' + $parameter.targetUsername,
			checkFollowing: '/user/following/' + $parameter.targetUsername,
			checkStarring: '/user/starred/' + $parameter.owner + '/' + $parameter.repo,
			createActionVariable: '/user/actions/variables/' + $parameter.actionVariableName,
			createGPGKey: '/user/gpg_keys',
			createHook: '/user/hooks',
			createOAuth2Application: '/user/applications/oauth2',
			createRepo: '/user/repos',
			createSSHKey: '/user/keys',
			deleteActionSecret: '/user/actions/secrets/' + $parameter.actionSecretName,
			deleteActionVariable: '/user/actions/variables/' + $parameter.actionVariableName,
			deleteAvatar: '/user/avatar',
			deleteEmail: '/user/emails',
			deleteGPGKey: '/user/gpg_keys/' + $parameter.gpgKeyId,
			deleteHook: '/user/hooks/' + $parameter.hookId,
			deleteOAuth2Application: '/user/applications/oauth2/' + $parameter.oauth2AppId,
			deleteSSHKey: '/user/keys/' + $parameter.sshKeyId,
			follow: '/user/following/' + $parameter.targetUsername,
			getActionVariable: '/user/actions/variables/' + $parameter.actionVariableName,
			getActionVariables: '/user/actions/variables',
			getAuthenticated: '/user',
			getGPGKey: '/user/gpg_keys/' + $parameter.gpgKeyId,
			getGPGKeyToken: '/user/gpg_key_token',
			getHook: '/user/hooks/' + $parameter.hookId,
			getManyEmails: '/user/emails',
			getManyFollowers: '/user/followers',
			getManyFollowing: '/user/following',
			getManyGPGKeys: '/user/gpg_keys',
			getManyHooks: '/user/hooks',
			getManyOrgs: '/user/orgs',
			getManyRepos: '/user/repos',
			getManySSHKeys: '/user/keys',
			getManyStarred: '/user/starred',
			getManyStopwatches: '/user/stopwatches',
			getManySubscriptions: '/user/subscriptions',
			getManyTeams: '/user/teams',
			getManyTrackedTimes: '/user/times',
			getOAuth2Application: '/user/applications/oauth2/' + $parameter.oauth2AppId,
			getOAuth2Applications: '/user/applications/oauth2',
			getQuota: '/user/quota',
			getQuotaArtifacts: '/user/quota/artifacts',
			getQuotaAttachments: '/user/quota/attachments',
			getQuotaCheck: '/user/quota/check',
			getQuotaPackages: '/user/quota/packages',
			getRunnerJobs: '/user/runners/jobs',
			getRunnerRegistrationToken: '/user/runners/registration-token',
			getSettings: '/user/settings',
			getSSHKey: '/user/keys/' + $parameter.sshKeyId,
			listBlockedUsers: '/user/blocks',
			starRepo: '/user/starred/' + $parameter.owner + '/' + $parameter.repo,
			unblockUser: '/user/blocks/' + $parameter.targetUsername,
			unfollow: '/user/following/' + $parameter.targetUsername,
			unstarRepo: '/user/starred/' + $parameter.owner + '/' + $parameter.repo,
			updateActionVariable: '/user/actions/variables/' + $parameter.actionVariableName,
			updateAvatar: '/user/avatar',
			updateHook: '/user/hooks/' + $parameter.hookId,
			updateOAuth2Application: '/user/applications/oauth2/' + $parameter.oauth2AppId,
			updateSettings: '/user/settings',
			upsertActionSecret: '/user/actions/secrets/' + $parameter.actionSecretName,
			verifyGPGKey: '/user/gpg_key_verify',
		},
		users: {
			checkFollowing: '/users/' + $parameter.username + '/following/' + $parameter.targetUsername,
			createToken: '/users/' + $parameter.username + '/tokens',
			deleteToken: '/users/' + $parameter.username + '/tokens/' + $parameter.tokenId,
			get: '/users/' + $parameter.username,
			getActivityFeeds: '/users/' + $parameter.username + '/heatmap',
			getHeatmap: '/users/' + $parameter.username + '/heatmap',
			getManyFollowers: '/users/' + $parameter.username + '/followers',
			getManyFollowing: '/users/' + $parameter.username + '/following',
			getManyGPGKeys: '/users/' + $parameter.username + '/gpg_keys',
			getManyOrgs: '/users/' + $parameter.username + '/orgs',
			getManyRepos: '/users/' + $parameter.username + '/repos',
			getManySSHKeys: '/users/' + $parameter.username + '/keys',
			getManyStarred: '/users/' + $parameter.username + '/starred',
			getManySubscriptions: '/users/' + $parameter.username + '/subscriptions',
			getOrgPermissions: '/users/' + $parameter.username + '/orgs/' + $parameter.org + '/permissions',
			getTokens: '/users/' + $parameter.username + '/tokens',
			search: '/users/search',
		},
		activitypub: {
			getInstanceActor: '/activitypub/actor',
			getPerson: '/activitypub/user-id/' + $parameter.userId,
			getPersonActivity: '/activitypub/user-id/' + $parameter.userId + '/activities/' + $parameter.activityId + '/activity',
			getPersonActivityNote: '/activitypub/user-id/' + $parameter.userId + '/activities/' + $parameter.activityId,
			getPersonFeed: '/activitypub/user-id/' + $parameter.userId + '/outbox',
			getRepository: '/activitypub/repository-id/' + $parameter.repositoryId,
			instanceActorInbox: '/activitypub/actor/inbox',
			instanceActorOutbox: '/activitypub/actor/outbox',
			personInbox: '/activitypub/user-id/' + $parameter.userId + '/inbox',
			repositoryInbox: '/activitypub/repository-id/' + $parameter.repositoryId + '/inbox',
			repositoryOutbox: '/activitypub/repository-id/' + $parameter.repositoryId + '/outbox',
		},
		miscellaneous: {
			getGitignoreTemplate: '/gitignore/templates/' + $parameter.templateName,
			getGitignoreTemplates: '/gitignore/templates',
			getLabelTemplate: '/label/templates/' + $parameter.templateName,
			getLabelTemplates: '/label/templates',
			getLicenseTemplate: '/licenses/' + $parameter.templateName,
			getLicenseTemplates: '/licenses',
			getNodeInfo: '/nodeinfo',
			getSigningKey: '/signing-key.gpg',
			getSSHSigningKey: '/signing-key.ssh',
			getVersion: '/version',
			renderMarkdown: '/markdown',
			renderMarkdownRaw: '/markdown/raw',
			renderMarkup: '/markup',
		},
		notification: {
			getList: '/notifications',
			getNewAvailable: '/notifications/new',
			getRepoList: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/notifications',
			getThread: '/notifications/threads/' + $parameter.notificationId,
			readList: '/notifications',
			readRepoList: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/notifications',
			readThread: '/notifications/threads/' + $parameter.notificationId,
		},
		package: {
			delete: '/packages/' + $parameter.packageOwner + '/' + $parameter.packageType + '/' + $parameter.packageName + '/' + $parameter.packageVersion,
			get: '/packages/' + $parameter.packageOwner + '/' + $parameter.packageType + '/' + $parameter.packageName + '/' + $parameter.packageVersion,
			getFiles: '/packages/' + $parameter.packageOwner + '/' + $parameter.packageType + '/' + $parameter.packageName + '/' + $parameter.packageVersion + '/files',
			linkRepo: '/packages/' + $parameter.packageOwner + '/' + $parameter.packageType + '/' + $parameter.packageName + '/-/link/' + $parameter.linkedRepoName,
			list: '/packages/' + $parameter.packageOwner,
			unlinkRepo: '/packages/' + $parameter.packageOwner + '/' + $parameter.packageType + '/' + $parameter.packageName + '/-/unlink',
		},
		settings: {
			getAPISettings: '/settings/api',
			getAttachmentSettings: '/settings/attachment',
			getRepositorySettings: '/settings/repository',
			getUISettings: '/settings/ui',
		},
		wikiPage: {
			create: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/wiki/new',
			delete:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/wiki/page/' +
				$parameter.pageName,
			get:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/wiki/page/' +
				$parameter.pageName,
			getAll: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/wiki/pages',
			getRevisions:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/wiki/revisions/' +
				$parameter.pageName,
			update:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/wiki/page/' +
				$parameter.pageName,
		},
		webhook: {
			create: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/hooks',
			delete:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/hooks/' + $parameter.webhookId,
			deleteGitHook:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/hooks/git/' + $parameter.gitHookId,
			get:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/hooks/' + $parameter.webhookId,
			getAll: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/hooks',
			getGitHook:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/hooks/git/' + $parameter.gitHookId,
			getGitHooks: '/repos/' + $parameter.owner + '/' + $parameter.repository + '/hooks/git',
			test:
				'/repos/' +
				$parameter.owner +
				'/' +
				$parameter.repository +
				'/hooks/' +
				$parameter.webhookId +
				'/tests',
			updateGitHook:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/hooks/git/' + $parameter.gitHookId,
			update:
				'/repos/' + $parameter.owner + '/' + $parameter.repository + '/hooks/' + $parameter.webhookId,
		},
	}[$parameter.resource] ?? {})[$value]
}}`;

export class GiteaForgejo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Gitea/Forgejo',
		name: 'giteaForgejo',
		icon: {
			light: 'file:../../icons/gitea-forgejo.svg',
			dark: 'file:../../icons/gitea-forgejo.dark.svg',
		},
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Gitea and Forgejo API',
		defaults: {
			name: 'Gitea/Forgejo',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'giteaForgejoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.serverUrl.replace(new RegExp("/$"), "") + "/api/v1"}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Activity Pub',
						value: 'activitypub',
					},
					{
						name: 'Admin',
						value: 'admin',
					},
					{
						name: 'Branch',
						value: 'branch',
					},
					{
						name: 'Branch Protection',
						value: 'branchProtection',
					},
					{
						name: 'Collaborator',
						value: 'collaborator',
					},
					{
						name: 'Commit Status',
						value: 'commitStatus',
					},
					{
						name: 'Issue',
						value: 'issue',
					},
					{
						name: 'Issue Comment',
						value: 'issueComment',
					},
					{
						name: 'Issue Label',
						value: 'issueLabel',
					},
					{
						name: 'Label',
						value: 'label',
					},
					{
						name: 'Milestone',
						value: 'milestone',
					},
					{
						name: 'Miscellaneous',
						value: 'miscellaneous',
					},
					{
						name: 'Notification',
						value: 'notification',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Package',
						value: 'package',
					},
					{
						name: 'Pull Request',
						value: 'pullRequest',
					},
					{
						name: 'Release',
						value: 'release',
					},
					{
						name: 'Release Attachment',
						value: 'releaseAttachment',
					},
					{
						name: 'Repository',
						value: 'repository',
					},
					{
						name: 'Repository Content',
						value: 'repositoryContent',
					},
					{
						name: 'Repository Key',
						value: 'repositoryKey',
					},
					{
						name: 'Repository Template',
						value: 'repositoryTemplate',
					},
					{
						name: 'Setting',
						value: 'settings',
					},
					{
						name: 'Team',
						value: 'team',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
					{
						name: 'Wiki Page',
						value: 'wikiPage',
					},
				],
				default: 'repository',
			},
			{
				displayName: 'Operation Name or ID',
				name: 'operation',
				type: 'options',
				description:
					'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
				noDataExpression: true,
				typeOptions: {
					loadOptionsMethod: 'getOperations',
					loadOptionsDependsOn: ['resource'],
				},
				routing: {
					request: {
						method: operationRequestMethodExpression,
						url: operationRequestUrlExpression,
					},
				},
				default: '',
			},
			...branchDescription,
			...branchProtectionDescription,
			...commitStatusDescription,
			...collaboratorDescription,
			...activityPubDescription,
			...adminDescription,
			...organizationDescription,
			...miscellaneousDescription,
			...notificationDescription,
			...teamDescription,
			...repositoryDescription,
			...repositoryContentDescription,
			...repositoryKeyDescription,
			...repositoryTemplateDescription,
			...settingsDescription,
			...issueDescription,
			...issueCommentDescription,
			...issueLabelDescription,
			...labelDescription,
			...milestoneDescription,
			...pullRequestDescription,
			...packageDescription,
			...releaseDescription,
			...releaseAttachmentDescription,
			...userDescription,
			...usersDescription,
			...webhookDescription,
			...wikiPageDescription,
		],
	};

	methods = {
		loadOptions: {
			getOperations,
		},
		listSearch: {
			getBranchProtections,
			getBranches,
			getIssues,
			getLabels,
			getMilestones,
			getOwners,
			getPullRequests,
			getReleases,
			getRepositories,
			getRepositoryKeys,
			getUsers,
			getWebhooks,
		},
	};

	customOperations = {
		issue: {
			createAttachment: executeIssueCreateAttachment,
		},
		issueComment: {
			createAttachment: executeIssueCommentCreateAttachment,
		},
		miscellaneous: {
			renderMarkdownRaw: executeMiscellaneousRenderMarkdownRaw,
		},
		releaseAttachment: {
			create: executeReleaseAttachmentCreate,
		},
	};
}
