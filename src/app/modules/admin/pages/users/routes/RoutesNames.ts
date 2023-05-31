import { PageLink } from "../../../../../../_metronic/layout/core";

const Users = '/admin/users/';


export const ListUserPath = Users + 'manage-user';
export const AddUserPath = Users + 'add-user';
export const EditUserPath = Users + 'edit-user';

export const ListPilotPath = Users + 'manage-user-type';
export const AddPilotPath = Users + 'add-user-type';
export const EditPilotPath = Users + 'edit-user-type';


export const ListDriverPath = Users + 'manage-driver';
export const AddDriverPath = Users + 'add-driver';
export const EditDriverPath = Users + 'edit-driver';

export const driverBreadcrumbs: Array<PageLink> = [
    {
        title: 'Manage Driver',
        path: ListDriverPath,
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

export const userBreadcrumbs: Array<PageLink> = [
    {
        title: 'Manage User',
        path: ListUserPath,
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

export const pilotBreadcrumbs: Array<PageLink> = [
    {
        title: 'Manage Pilot',
        path: ListPilotPath,
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



