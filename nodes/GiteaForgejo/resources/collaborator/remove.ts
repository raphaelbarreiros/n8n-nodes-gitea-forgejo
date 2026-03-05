import type { INodeProperties } from 'n8n-workflow';
import { collaboratorSelect } from '../../shared/descriptions';

const showOnlyForCollaboratorRemove = {
	operation: ['remove'],
	resource: ['collaborator'],
};

export const collaboratorRemoveDescription: INodeProperties[] = [
	{
		...collaboratorSelect,
		displayOptions: {
			show: showOnlyForCollaboratorRemove,
		},
	},
];
