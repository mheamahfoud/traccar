import { PageLink } from "../../../../../../_metronic/layout/core";

const BaseUrl = '/admin/setting/';


export const ListWorkTimePath = BaseUrl + 'work-time';
export const AddWorkTimePath = BaseUrl + 'add-work-time';
export const EditWorkTimePath = BaseUrl + 'edit-work-time';


export const ListInfractionTypePath = BaseUrl + 'infraction-type';
export const AddInfractionTypePath = BaseUrl + 'add-infraction-type';
export const EditInfractionTypePath = BaseUrl + 'edit-infraction-type';


export const ListReasonCancelPath = BaseUrl + 'reason-cancel';
export const AddReasonCancelPath = BaseUrl + 'add-reason-cancel';
export const EditReasonCancelPath = BaseUrl + 'edit-reason-cancel';




export const WorkTimeBreadcrumbs: Array<PageLink> = [
    {
        title: 'Manage Working Time',
        path: ListWorkTimePath,
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]


export const InfractionTypeBreadcrumbs: Array<PageLink> = [
    {
        title: 'Manage Infraction Type',
        path: ListWorkTimePath,
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]


export const ReasonCancelBreadcrumbs: Array<PageLink> = [
    {
        title: 'Manage Reason  Cancel',
        path: ListWorkTimePath,
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]