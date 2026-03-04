import type { INodeProperties } from 'n8n-workflow';
import { usernameSelect } from '../../shared/descriptions';

const showOnlyForUsers = {
	resource: ['user'],
};

const showOnlyForUserGet = {
	resource: ['user'],
	operation: ['get'],
};

export const userDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUsers,
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a user by username',
				description: 'Get a user by username',
				routing: {
					request: {
						method: 'GET',
						url: '=/users/{{$parameter.username}}',
					},
				},
			},
			{
				name: 'Get Authenticated',
				value: 'getAuthenticated',
				action: 'Get the authenticated user',
				description: 'Get the authenticated user',
				routing: {
					request: {
						method: 'GET',
						url: '/user',
					},
				},
			},
		],
		default: 'getAuthenticated',
	},
	{
		...usernameSelect,
		displayOptions: {
			show: showOnlyForUserGet,
		},
	},
];
