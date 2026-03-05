import type { INodeProperties } from 'n8n-workflow';

const r = 'activitypub';

export const activityPubDescription: INodeProperties[] = [
	{
		displayName: 'Repository ID',
		name: 'repositoryId',
		type: 'number',
		required: true,
		default: 1,
		typeOptions: { minValue: 1 },
		description: 'The numeric ID of the repository',
		displayOptions: {
			show: {
				resource: [r],
				operation: ['getRepository', 'repositoryInbox', 'repositoryOutbox'],
			},
		},
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
		default: 1,
		typeOptions: { minValue: 1 },
		description: 'The numeric ID of the user',
		displayOptions: {
			show: {
				resource: [r],
				operation: [
					'getPerson',
					'getPersonActivity',
					'getPersonActivityNote',
					'getPersonFeed',
					'personInbox',
				],
			},
		},
	},
	{
		displayName: 'Activity ID',
		name: 'activityId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the activity',
		displayOptions: {
			show: {
				resource: [r],
				operation: ['getPersonActivity', 'getPersonActivityNote'],
			},
		},
	},
];
