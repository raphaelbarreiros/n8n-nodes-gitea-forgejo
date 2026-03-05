import type { INodeProperties } from 'n8n-workflow';
import { ownerSelect, repositorySelect } from '../../shared/descriptions';
import { collaboratorAddDescription } from './add';
import { collaboratorGetDescription } from './get';
import { collaboratorGetManyDescription } from './getAll';
import { collaboratorGetPermissionDescription } from './getPermission';
import { collaboratorRemoveDescription } from './remove';

const showOnlyForCollaborators = {
	resource: ['collaborator'],
};

export const collaboratorDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForCollaborators,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForCollaborators,
		},
	},
	...collaboratorAddDescription,
	...collaboratorGetDescription,
	...collaboratorGetManyDescription,
	...collaboratorGetPermissionDescription,
	...collaboratorRemoveDescription,
];
