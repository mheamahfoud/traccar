import { PageLink } from "../../../../../../_metronic/layout/core";

const BaseUrl = '/admin/setting/';


export const ListWorkTimePath = BaseUrl + 'work-time';
export const AddWorkTimePath = BaseUrl + 'add-work-time';
export const EditWorkTimePath = BaseUrl + 'edit-work-time';



export const ListTypesPath = BaseUrl + 'vehicle-types';
export const AddTypesPath = BaseUrl + 'add-vehicle-types';
export const EditTypesPath = BaseUrl + 'edit-vehicle-types';

export const ListMakerPath = BaseUrl + 'vehicle-makers';
export const AddMakerPath = BaseUrl + 'add-vehicle-makers';
export const EditMakerPath = BaseUrl + 'edit-vehicle-makers';






export const ListModelsPath = BaseUrl + 'vehicle-models';
export const AddModelPath = BaseUrl + 'add-vehicle-models';
export const EditModelPath = BaseUrl + 'edit-vehicle-models';




export const ListGroupsPath = BaseUrl + 'vehicle-groups';
export const AddGroupPath = BaseUrl + 'add-vehicle-groups';
export const EditGroupsPath = BaseUrl + 'edit-vehicle-groups';


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

export const groupsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Vehicle Groups',
        path: ListGroupsPath,
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
export const VehiclesBreadcrumbs: Array<PageLink> = [
    {
        title: 'Manage Vehicles',
        path: ListTypesPath,
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
export const typesBreadcrumbs: Array<PageLink> = [
    {
        title: 'Vehicle Types',
        path: ListTypesPath,
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

export const colorsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Vehicle Colors',
        path: ListMakerPath,
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

export const makersBreadcrumbs: Array<PageLink> = [
    {
        title: 'Vehicle Makers',
        path: ListMakerPath,
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

export const modelssBreadcrumbs: Array<PageLink> = [
    {
        title: 'Vehicle Models',
        path: ListModelsPath,
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
