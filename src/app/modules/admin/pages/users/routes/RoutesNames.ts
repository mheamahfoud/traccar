import { PageLink } from "../../../../../../_metronic/layout/core";

const Users = '/admin/users/';


export const ListUserPath = Users + 'manage-user';
export const AddUserPath = Users + 'add-user';
export const EditUserPath = Users + 'edit-user';

export const ListPilotPath = Users + 'manage-pilot';
export const AddPilotPath = Users + 'add-pilot';
export const EditPilotPath = Users + 'edit-pilot';


export const ListDriverPath = Users + 'manage-driver';
export const AddDriverPath = Users + 'add-driver';
export const EditDriverPath = Users + 'edit-driver';


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



export const driverBreadcrumbs: Array<PageLink> = [
    {
        title: 'Manage Driver',
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
