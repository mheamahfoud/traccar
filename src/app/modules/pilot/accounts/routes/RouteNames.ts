import { PageLink } from "../../../../../_metronic/layout/core";

const baseRoute = '/pilot/account/'

export const DashBoardPath = baseRoute + 'current-trip';

export const CurrentTripsPath = baseRoute + 'current-trip';
export const OldTripsPath = baseRoute + 'old-trip';


export const accountBreadCrumbs: Array<PageLink> = [
    {
      title: 'Account',
      path: '/pilot/account/current-trip',
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