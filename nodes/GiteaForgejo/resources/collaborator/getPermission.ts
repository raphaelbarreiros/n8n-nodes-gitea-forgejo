import type { INodeProperties } from 'n8n-workflow';
import { collaboratorSelect } from '../../shared/descriptions';

const showOnlyForCollaboratorGetPermission = {
	operation: ['getPermission'],
	resource: ['collaborator'],
};

export const collaboratorGetPermissionDescription: INodeProperties[] = [
	{
		...collaboratorSelect,
		displayOptions: {
			show: showOnlyForCollaboratorGetPermission,
		},
	},
];
