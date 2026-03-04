# n8n-nodes-gitea-forgejo

This is an n8n community node. It lets you use Gitea and Forgejo in your n8n workflows.

Gitea and Forgejo are self-hostable Git forges with a GitHub-compatible API surface.

## Installation

Follow the n8n community nodes installation guide:

https://docs.n8n.io/integrations/community-nodes/installation/

## Operations

This node currently supports:

- Repository
  - Get
  - Get Many (by owner)
- Issue
  - Get
  - Get Many
  - Create
- Issue Comment
  - Get Many (for an issue)
  - Create
- User
  - Get
  - Get Authenticated

## Credentials

Use the `Gitea/Forgejo API` credential:

- Server URL: your forge base URL, for example `https://codeberg.org` or `https://git.example.com`
- Access Token: a personal access token with scopes required for the operations you use

The credential test calls `GET /api/v1/user`.

## Compatibility

- Built as an n8n community node package (`n8nNodesApiVersion: 1`)
- TypeScript + `@n8n/node-cli` build workflow

## Releases and npm publishing

- Tag-driven publishing is configured in `.github/workflows/release.yml`.
- Pushing a tag like `v0.1.1` runs lint/build, publishes to npm with provenance, and creates a GitHub Release with generated notes.
- Preferred authentication is npm trusted publishing (OIDC), which does not require storing a long-lived `NPM_TOKEN` secret.
- Optional fallback: if `NPM_TOKEN` is present in GitHub secrets, it is used by `npm publish`.
- For trusted publishing setup, configure this repo as a trusted publisher in your package settings on npmjs.com and point it to `release.yml`.

## Usage Notes

- Enter your server base URL without `/api/v1`; the node appends it automatically.
- For repository lists, select whether the owner is a user or an organization.
- List-search fields support dynamic lookup for users, repositories, and issues.

## Resources

- n8n community nodes docs: https://docs.n8n.io/integrations/#community-nodes
- Forgejo API usage docs: https://forgejo.org/docs/latest/user/api-usage/
- Gitea API usage docs: https://docs.gitea.com/usage/api-usage

## Version History

- 0.1.0: Initial Gitea/Forgejo node implementation (Repository, Issue, Issue Comment, User)
