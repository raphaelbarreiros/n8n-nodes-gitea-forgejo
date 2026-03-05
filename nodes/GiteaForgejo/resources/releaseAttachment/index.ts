import type { INodeProperties } from 'n8n-workflow';
import {
	ownerSelect,
	releaseAttachmentId,
	releaseIdSelect,
	repositorySelect,
} from '../../shared/descriptions';
import { releaseAttachmentCreateDescription } from './create';
import { releaseAttachmentDeleteDescription } from './delete';
import { releaseAttachmentGetDescription } from './get';
import { releaseAttachmentGetManyDescription } from './getAll';
import { releaseAttachmentUpdateDescription } from './update';

const showOnlyForReleaseAttachments = {
	resource: ['releaseAttachment'],
};

const showOnlyForReleaseAttachmentById = {
	resource: ['releaseAttachment'],
	operation: ['get', 'delete', 'update'],
};

export const releaseAttachmentDescription: INodeProperties[] = [
	{
		...ownerSelect,
		displayOptions: {
			show: showOnlyForReleaseAttachments,
		},
	},
	{
		...repositorySelect,
		displayOptions: {
			show: showOnlyForReleaseAttachments,
		},
	},
	{
		...releaseIdSelect,
		displayOptions: {
			show: showOnlyForReleaseAttachments,
		},
	},
	{
		...releaseAttachmentId,
		displayOptions: {
			show: showOnlyForReleaseAttachmentById,
		},
	},
	...releaseAttachmentCreateDescription,
	...releaseAttachmentDeleteDescription,
	...releaseAttachmentGetDescription,
	...releaseAttachmentGetManyDescription,
	...releaseAttachmentUpdateDescription,
];
