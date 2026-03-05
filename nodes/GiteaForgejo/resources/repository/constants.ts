export const showOnlyForRepositories = {
	resource: ['repository'],
};

export const showOnlyForRepositoryByName = {
	resource: ['repository'],
	operation: [
		'addFlag',
		'addPushMirror',
		'addTeam',
		'addTopic',
		'applyDiffPatch',
		'checkFlag',
		'checkTeam',
		'compare',
		'convert',
		'createFork',
		'createTag',
		'createTagProtection',
		'deleteAvatar',
		'delete',
		'deleteGitNote',
		'deleteFlag',
		'deleteFlags',
		'deleteTag',
		'deleteTagProtection',
		'deleteTopic',
		'deletePushMirror',
		'get',
		'getActivityFeeds',
		'getArchive',
		'getActionRuns',
		'getActionRun',
		'getActionRunnerJobs',
		'getActionSecrets',
		'getActionTasks',
		'getActionVariable',
		'getActionVariables',
		'getAssignees',
		'getCommitPullRequest',
		'getCommits',
		'getEditorConfig',
		'getFlags',
		'getForks',
		'getGitAnnotatedTag',
		'getGitBlob',
		'getGitBlobs',
		'getGitCommit',
		'getGitCommitDiffOrPatch',
		'getGitNote',
		'getGitRefs',
		'getGitRefsByRef',
		'getGitTree',
		'getLanguages',
		'getIssueConfig',
		'getIssueTemplates',
		'getNotifications',
		'getNewPinAllowed',
		'getPinnedIssues',
		'getPinnedPullRequests',
		'getPullRequestByBaseHead',
		'getPushMirror',
		'getPushMirrors',
		'getRawFile',
		'getRawFileOrLfs',
		'getRunnerRegistrationToken',
		'getSigningKey',
		'getReviewers',
		'getStargazers',
		'getSubscribers',
		'getSubscription',
		'getSyncForkBranchInfo',
		'getSyncForkDefaultInfo',
		'getTag',
		'getTagProtection',
		'getTagProtections',
		'getTags',
		'getTeams',
		'getTopics',
		'getTrackedTimes',
		'removeTeam',
		'replaceTopics',
		'setGitNote',
		'markNotifications',
		'mirrorSync',
		'deleteActionSecret',
		'deleteActionVariable',
		'createActionVariable',
		'updateActionVariable',
		'upsertActionSecret',
		'dispatchWorkflow',
		'replaceFlags',
		'syncForkBranch',
		'syncForkDefault',
		'syncPushMirrors',
		'transfer',
		'transferAccept',
		'transferReject',
		'unwatch',
		'update',
		'updateAvatar',
		'updateTagProtection',
		'watch',
		'validateIssueConfig',
	],
};

export const showOnlyForRepositoryByOwner = {
	resource: ['repository'],
	operation: [...showOnlyForRepositoryByName.operation, 'getMany'],
};

export const showOnlyForRepositoryUpdate = {
	resource: ['repository'],
	operation: ['update'],
};

export const showOnlyForRepositoryGetMany = {
	resource: ['repository'],
	operation: ['getMany'],
};

export const showOnlyForRepositorySearch = {
	resource: ['repository'],
	operation: ['search'],
};

export const showOnlyForRepositoryMigrate = {
	resource: ['repository'],
	operation: ['migrate'],
};

export const showOnlyForRepositoryGetActionRuns = {
	resource: ['repository'],
	operation: ['getActionRuns'],
};

export const showOnlyForRepositoryGetPushMirrors = {
	resource: ['repository'],
	operation: ['getPushMirrors'],
};

export const showOnlyForRepositoryPushMirrorByName = {
	resource: ['repository'],
	operation: ['getPushMirror', 'deletePushMirror'],
};

export const showOnlyForRepositoryAddPushMirror = {
	resource: ['repository'],
	operation: ['addPushMirror'],
};

export const showOnlyForRepositoryGetActionTasks = {
	resource: ['repository'],
	operation: ['getActionTasks'],
};

export const showOnlyForRepositoryActionRunById = {
	resource: ['repository'],
	operation: ['getActionRun'],
};

export const showOnlyForRepositoryActionRunnerJobs = {
	resource: ['repository'],
	operation: ['getActionRunnerJobs'],
};

export const showOnlyForRepositoryGetActionSecrets = {
	resource: ['repository'],
	operation: ['getActionSecrets'],
};

export const showOnlyForRepositoryGetActionVariables = {
	resource: ['repository'],
	operation: ['getActionVariables'],
};

export const showOnlyForRepositoryActionSecretByName = {
	resource: ['repository'],
	operation: ['upsertActionSecret', 'deleteActionSecret'],
};

export const showOnlyForRepositoryActionVariableByName = {
	resource: ['repository'],
	operation: [
		'getActionVariable',
		'createActionVariable',
		'updateActionVariable',
		'deleteActionVariable',
	],
};

export const showOnlyForRepositoryDispatchWorkflow = {
	resource: ['repository'],
	operation: ['dispatchWorkflow'],
};

export const showOnlyForRepositoryGetNotifications = {
	resource: ['repository'],
	operation: ['getNotifications'],
};

export const showOnlyForRepositoryMarkNotifications = {
	resource: ['repository'],
	operation: ['markNotifications'],
};

export const showOnlyForRepositoryGetActivityFeeds = {
	resource: ['repository'],
	operation: ['getActivityFeeds'],
};

export const showOnlyForRepositoryFlagByName = {
	resource: ['repository'],
	operation: ['addFlag', 'checkFlag', 'deleteFlag'],
};

export const showOnlyForRepositoryReplaceFlags = {
	resource: ['repository'],
	operation: ['replaceFlags'],
};

export const showOnlyForRepositoryGetEditorConfig = {
	resource: ['repository'],
	operation: ['getEditorConfig'],
};

export const showOnlyForRepositoryApplyDiffPatch = {
	resource: ['repository'],
	operation: ['applyDiffPatch'],
};

export const showOnlyForRepositoryCreateFork = {
	resource: ['repository'],
	operation: ['createFork'],
};

export const showOnlyForRepositoryGetManyForks = {
	resource: ['repository'],
	operation: ['getForks'],
};

export const showOnlyForRepositoryGetManyCommits = {
	resource: ['repository'],
	operation: ['getCommits'],
};

export const showOnlyForRepositoryArchive = {
	resource: ['repository'],
	operation: ['getArchive'],
};

export const showOnlyForRepositoryGetRawFileOrLfs = {
	resource: ['repository'],
	operation: ['getRawFileOrLfs'],
};

export const showOnlyForRepositoryGetRawFile = {
	resource: ['repository'],
	operation: ['getRawFile'],
};

export const showOnlyForRepositoryPullRequestByBaseHead = {
	resource: ['repository'],
	operation: ['getPullRequestByBaseHead'],
};

export const showOnlyForRepositoryGitBlobByShas = {
	resource: ['repository'],
	operation: ['getGitBlobs'],
};

export const showOnlyForRepositoryGitRef = {
	resource: ['repository'],
	operation: ['getGitRefsByRef'],
};

export const showOnlyForRepositoryGitSha = {
	resource: ['repository'],
	operation: [
		'deleteGitNote',
		'getGitAnnotatedTag',
		'getGitBlob',
		'getGitCommit',
		'getGitCommitDiffOrPatch',
		'getGitNote',
		'getGitTree',
		'setGitNote',
	],
};

export const showOnlyForRepositoryGitCommitDiffOrPatch = {
	resource: ['repository'],
	operation: ['getGitCommitDiffOrPatch'],
};

export const showOnlyForRepositoryGitCommit = {
	resource: ['repository'],
	operation: ['getGitCommit'],
};

export const showOnlyForRepositoryGitNote = {
	resource: ['repository'],
	operation: ['getGitNote'],
};

export const showOnlyForRepositorySetGitNote = {
	resource: ['repository'],
	operation: ['setGitNote'],
};

export const showOnlyForRepositoryGetGitTree = {
	resource: ['repository'],
	operation: ['getGitTree'],
};

export const showOnlyForRepositoryCommitSha = {
	resource: ['repository'],
	operation: ['getCommitPullRequest'],
};

export const showOnlyForRepositoryCompare = {
	resource: ['repository'],
	operation: ['compare'],
};

export const showOnlyForRepositoryGetManyUsers = {
	resource: ['repository'],
	operation: ['getStargazers', 'getSubscribers'],
};

export const showOnlyForRepositoryGetManyTopics = {
	resource: ['repository'],
	operation: ['getTopics'],
};

export const showOnlyForRepositoryGetManyTags = {
	resource: ['repository'],
	operation: ['getTags'],
};

export const showOnlyForRepositoryGetTrackedTimes = {
	resource: ['repository'],
	operation: ['getTrackedTimes'],
};

export const showOnlyForRepositorySyncForkByBranch = {
	resource: ['repository'],
	operation: ['getSyncForkBranchInfo', 'syncForkBranch'],
};

export const showOnlyForRepositoryTopicByName = {
	resource: ['repository'],
	operation: ['addTopic', 'deleteTopic'],
};

export const showOnlyForRepositoryReplaceTopics = {
	resource: ['repository'],
	operation: ['replaceTopics'],
};

export const showOnlyForRepositoryTagByName = {
	resource: ['repository'],
	operation: ['getTag', 'deleteTag'],
};

export const showOnlyForRepositoryCreateTag = {
	resource: ['repository'],
	operation: ['createTag'],
};

export const showOnlyForRepositoryTagProtectionById = {
	resource: ['repository'],
	operation: ['getTagProtection', 'updateTagProtection', 'deleteTagProtection'],
};

export const showOnlyForRepositoryTagProtectionWrite = {
	resource: ['repository'],
	operation: ['createTagProtection', 'updateTagProtection'],
};

export const showOnlyForRepositoryTeamByName = {
	resource: ['repository'],
	operation: ['checkTeam', 'addTeam', 'removeTeam'],
};

export const showOnlyForRepositoryTransfer = {
	resource: ['repository'],
	operation: ['transfer'],
};

export const showOnlyForRepositoryById = {
	resource: ['repository'],
	operation: ['getById'],
};

export const showOnlyForRepositoryUpdateAvatar = {
	resource: ['repository'],
	operation: ['updateAvatar'],
};
