import type { INodeProperties } from 'n8n-workflow';
import { repositoryBaseDescription } from './base';
import { repositoryListDescription } from './list';

export const repositoryDescription: INodeProperties[] = [
	...repositoryBaseDescription,
	...repositoryListDescription,
];
