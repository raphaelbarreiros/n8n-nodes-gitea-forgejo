import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { repositoryTemplateGenerateDescription } from './generate';

const showOnlyForRepositoryTemplate = {
	resource: ['repositoryTemplate'],
};

export const repositoryTemplateDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayName: 'Template Owner',
		displayOptions: {
			show: showOnlyForRepositoryTemplate,
		},
	},
	{
		...repositorySelect,
		displayName: 'Template Repository',
		displayOptions: {
			show: showOnlyForRepositoryTemplate,
		},
	},
	...repositoryTemplateGenerateDescription,
];
