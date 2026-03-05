import type { INodeProperties } from 'n8n-workflow';
import { collaboratorSelect } from '../../shared/descriptions';

const showOnlyForCollaboratorAdd = {
	operation: ['add'],
	resource: ['collaborator'],
};

export const collaboratorAddDescription: INodeProperties[] = [
	{
		...collaboratorSelect,
		displayOptions: {
			show: showOnlyForCollaboratorAdd,
		},
	},
	{
		displayName: 'Permission',
		name: 'permission',
		type: 'options',
		options: [
			{
				name: 'Admin',
				value: 'admin',
			},
			{
				name: 'Read',
				value: 'read',
			},
			{
				name: 'Write',
				value: 'write',
			},
		],
		default: 'read',
		description: 'Permission to grant the collaborator',
		displayOptions: {
			show: showOnlyForCollaboratorAdd,
		},
		routing: {
			send: {
				type: 'body',
				property: 'permission',
				value: '={{$value || undefined}}',
			},
		},
	},
];
