# n8n-nodes-gitea-forgejo

This is an n8n community node. It lets you use Gitea and Forgejo in your n8n workflows.

Gitea and Forgejo are self-hostable Git forges with a GitHub-compatible API surface.

## Installation

Follow the n8n community nodes installation guide:

https://docs.n8n.io/integrations/community-nodes/installation/

## Operations

This node covers all non-deprecated Gitea/Forgejo API v1 endpoints across every resource group.

### Activity Pub (11 operations)

Get Instance Actor, Get Person, Get Person Activity, Get Person Activity Note, Get Person Feed, Get Repository, Instance Actor Inbox/Outbox, Person Inbox, Repository Inbox/Outbox.

### Admin (42 operations)

Quota groups & rules, system hooks, cron jobs, runner registration, user management (create/update/delete/rename, emails, public keys, orgs, repos), unadopted repositories, email search.

### Branch (5 operations)

Create, Delete, Get, Get Many, Update.

### Branch Protection (5 operations)

Create, Delete, Get, Get Many, Update.

### Collaborator (5 operations)

Add, Get, Get Many, Get Permission, Remove.

### Commit Status (4 operations)

Create, Get Combined By Ref, Get Many By Ref, Get Many By SHA.

### Issue (36 operations)

Full issue lifecycle: create/update/delete, blocks & dependencies, reactions, subscriptions, time tracking, stopwatches, pinning, attachments, timeline, search.

### Issue Comment (14 operations)

Create/update/delete, attachments, reactions, repository-wide listing.

### Issue Label (5 operations)

Add, Get Many, Remove, Remove All, Replace.

### Label (5 operations)

Create, Delete, Get, Get Many, Update.

### Milestone (5 operations)

Create, Delete, Get, Get Many, Update.

### Miscellaneous (13 operations)

Gitignore templates, label templates, license templates, NodeInfo, signing keys (GPG & SSH), version, Markdown/markup rendering.

### Notification (7 operations)

Get List, Get New Available, Get Repository List, Get Thread, Mark List as Read, Mark Repository List as Read, Mark Thread as Read.

### Organization (49 operations)

Create/update/delete, members & public members, teams, labels, hooks, action variables & secrets, activity feeds, quota, runner registration, user blocking, rename.

### Package (6 operations)

Delete, Get, Get Files, Link to Repository, List, Unlink From Repository.

### Pull Request (24 operations)

Create/update, merge, auto-merge, reviews (create/submit/dismiss/delete), review comments, review requests, commits, files, diff/patch, branch update.

### Release (8 operations)

Create, Delete, Delete By Tag, Get, Get Many, Get By Tag, Get Latest, Update.

### Release Attachment (5 operations)

Create, Delete, Get, Get Many, Update.

### Repository (101 operations)

Full `/repos/*` parity: CRUD, forks, topics, flags, push mirrors, tags & tag protections, git objects (blobs, trees, commits, refs, notes), action runs/tasks/variables/secrets, issue config & templates, pinned issues/PRs, notifications, assignees, reviewers, stargazers, subscribers, tracked times, signing key, editor config, languages, archive, raw files, fork sync, transfer, and more.

### Repository Content (6 operations)

Change Many, Create, Delete, Get, Get Root, Update.

### Repository Key (4 operations)

Create, Delete, Get, Get Many.

### Repository Template (1 operation)

Generate.

### Setting (4 operations)

Get API Settings, Get Attachment Settings, Get Repository Settings, Get UI Settings.

### Team (12 operations)

Add Member, Add Repo, Delete, Get, Get Activity Feeds, Get Many Members, Get Many Repos, Get Member, Get Repo, Remove Member, Remove Repo, Update.

### User (62 operations)

Authenticated user: emails, GPG keys, SSH keys, OAuth2 applications, hooks, starred repos, followed users, blocked users, action variables & secrets, quota, runner jobs & registration, settings, avatar, stopwatches, subscriptions, teams, tracked times. Public user lookup by username.

### Users (17 operations)

Public profile lookups: get, search, followers, following, GPG keys, SSH keys, repos, starred, subscriptions, orgs & permissions, heatmap, tokens (admin).

### Webhook (10 operations)

Create, Delete, Get, Get Many, Test, Update, plus Git hook variants (Get, Get Many, Delete, Update).

### Wiki Page (6 operations)

Create, Delete, Get, Get Many, Get Revisions, Update.

## Credentials

Use the `Gitea/Forgejo API` credential:

- **Server URL**: your forge base URL, e.g. `https://codeberg.org` or `https://git.example.com`
- **Access Token**: a personal access token with scopes required for the operations you use

The credential test calls `GET /api/v1/user`.

## Compatibility

- Built as an n8n community node package (`n8nNodesApiVersion: 1`)
- TypeScript + `@n8n/node-cli` build workflow

## Releases and npm publishing

- Tag-driven publishing is configured in `.github/workflows/release.yml`.
- Pushing a tag like `v0.1.2` runs lint/build, publishes to npm with provenance, and creates a GitHub Release with generated notes.
- Preferred authentication is npm trusted publishing (OIDC), which does not require storing a long-lived `NPM_TOKEN` secret.
- Optional fallback: if `NPM_TOKEN` is present in GitHub secrets, it is used by `npm publish`.
- For trusted publishing setup, configure this repo as a trusted publisher in your package settings on npmjs.com and point it to `release.yml`.

## Usage Notes

- Enter your server base URL without `/api/v1`; the node appends it automatically.
- For repository lists, select whether the owner is a user or an organization.
- List-search fields support dynamic lookup for owners, users, repositories, issues, pull requests, branches, labels, milestones, webhooks, and releases.

## Resources

- n8n community nodes docs: https://docs.n8n.io/integrations/#community-nodes
- Forgejo API usage docs: https://forgejo.org/docs/latest/user/api-usage/
- Gitea API usage docs: https://docs.gitea.com/usage/api-usage

## Version History

- **0.1.2**: Complete resource coverage — adds Activity Pub (11 ops), Miscellaneous (13 ops), Notification (7 ops), Package (6 ops), Setting (4 ops). Fixes safe pagination in all list-search helpers, boolean field guards in Release Update, and various code-quality improvements from PR review.
- **0.1.1**: Full non-deprecated Gitea/Forgejo API v1 parity — 431 operations across 23 resources covering all swagger resource groups. Adds Admin, Organization, Team, Users, Pull Request, Release, Issue Label, Wiki Page, Repository Content, Repository Key, Repository Template, Branch Protection, Commit Status, Collaborator, Milestone, Label, Webhook, Release Attachment. Includes dynamic list-search helpers and shared field descriptors.
- **0.1.0**: Initial release — Repository, Issue, Issue Comment, User resources.
