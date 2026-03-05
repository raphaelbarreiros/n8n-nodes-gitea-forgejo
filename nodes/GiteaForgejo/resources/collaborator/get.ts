import type { INodeProperties } from 'n8n-workflow';
import { collaboratorSelect } from '../../shared/descriptions';

const showOnlyForCollaboratorGet = {
	operation: ['get'],
	resource: ['collaborator'],
};

export const collaboratorGetDescription: INodeProperties[] = [
	{
		...collaboratorSelect,
		displayOptions: {
			show: showOnlyForCollaboratorGet,
		},
	},
];
