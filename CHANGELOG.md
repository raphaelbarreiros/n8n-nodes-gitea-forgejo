# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-03-05

### Added

- **Activity Pub** resource (11 operations): Get Instance Actor, Get Person, Get Person Activity, Get Person Activity Note, Get Person Feed, Get Repository, Instance Actor Inbox, Instance Actor Outbox, Person Inbox, Repository Inbox, Repository Outbox.
- **Miscellaneous** resource (13 operations): Gitignore templates (get/list), label templates (get/list), license templates (get/list), NodeInfo, GPG signing key, SSH signing key, version, Markdown rendering (standard, raw, markup).
- **Notification** resource (7 operations): Get List, Get New Available, Get Repository List, Get Thread, Mark List as Read, Mark Repository List as Read, Mark Thread as Read.
- **Package** resource (6 operations): Delete, Get, Get Files, Link to Repository, List, Unlink From Repository.
- **Setting** resource (4 operations): Get API Settings, Get Attachment Settings, Get Repository Settings, Get UI Settings.

### Fixed

- `release` · Update: boolean fields (`draft`, `hide_archive_links`, `prerelease`) now only sent in the request body when the corresponding toggle is explicitly set, preventing unintentional overwrites.
- All list-search helpers (`getIssues`, `getPullRequests`, and others): safe `(response ?? []).length` guard eliminates runtime errors when the API returns `null` instead of an empty array.
- `label` · Update: description for `color` field now matches `label` · Create.
- `users` · Get: removed duplicate operation entry.
- `repositoryKey` · Create: `tokenId` minimum value corrected.
- `repositoryContent` · operations: renamed `filepath` parameter to `filePath` for consistency.

## [0.1.1] - 2025

### Added

- Full non-deprecated Gitea/Forgejo API v1 parity across all swagger resource groups.
- New resources: Admin (42 ops), Organization (49 ops), Team (12 ops), Users (17 ops), Pull Request (24 ops), Release (8 ops), Release Attachment (5 ops), Issue Label (5 ops), Label (5 ops), Milestone (5 ops), Wiki Page (6 ops), Repository Content (6 ops), Repository Key (4 ops), Repository Template (1 op), Branch Protection (5 ops), Commit Status (4 ops), Collaborator (5 ops), Webhook (10 ops).
- Expanded Issue resource to 36 operations (blocks, dependencies, reactions, subscriptions, time tracking, stopwatches, pinning, attachments, timeline).
- Expanded Issue Comment to 14 operations (attachments, reactions, repository-wide listing).
- Expanded User to 62 operations.
- Expanded Repository to 101 operations.
- Dynamic list-search helpers: `getOwners`, `getUsers`, `getRepositories`, `getIssues`, `getPullRequests`, `getBranches`, `getBranchProtections`, `getLabels`, `getMilestones`, `getReleases`, `getRepositoryKeys`, `getWebhooks`.
- Shared field descriptors (`ownerSelect`, `repositorySelect`, `issueSelect`, `usernameSelect`).

### Fixed

- CI build failure resolved; routing for dynamic operations restored.

## [0.1.0] - 2025

### Added

- Initial release with Repository (Get, Get Many), Issue (Get, Get Many, Create), Issue Comment (Get Many, Create), and User (Get, Get Authenticated) resources.
- `GiteaForgejoApi` credential with token auth and `/user` credential test.
- Forgejo logo (light/dark SVG icons).
- Tag-driven npm publish workflow (`.github/workflows/release.yml`).
