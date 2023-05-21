import {Localize} from '../../../../../../_metronic/i18n/Localize'
import {PageLink} from '../../../../../../_metronic/layout/core'
const baseRoute = '/admin/reports/'

export const ReplyPath = baseRoute + 'reply-map';


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
