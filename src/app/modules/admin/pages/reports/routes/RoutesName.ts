import {Localize} from '../../../../../../_metronic/i18n/Localize'
import {PageLink} from '../../../../../../_metronic/layout/core'
const baseRoute = '/admin/reports/'

export const ReplyPath = baseRoute + 'reply-map';
export const ReportTripPath = baseRoute + 'trip-report';
export const ReportEventPath = baseRoute + 'event-report';

export const Breadcrumbs: Array<PageLink> = [
  {
    title: 'Reports',
    path: ReplyPath,
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

export const tripBreadcrumbs: Array<PageLink> = [
  {
    title: 'Manage Trip Reports',
    path: ReportTripPath,
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

export const eventBreadcrumbs: Array<PageLink> = [
  {
    title: 'Manage Trip Event',
    path: ReportEventPath,
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
