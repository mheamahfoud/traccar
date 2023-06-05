/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useSelector} from 'react-redux'
import {useAuth} from '../../../../../app/modules/auth'
import {
  ReportPermissions,
  RolesPermissions,
  SettingPermission,
  UserPermissions,
  VehiclePermissions,
  WorkingDayPermissions,
} from '../../../../helpers/permissions'
import { AdminMenu } from './AdminMenu'
import { UserType } from '../../../../utlis/constants'
import { DriverMenu } from './DriverMenu'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const userTypes = useSelector((state: any) => state.pageTimeManager?.userTypes)
  const {currentUser} = useAuth()

  return (
    <>
       {currentUser.type == UserType.ADMIN &&  <AdminMenu/> }
       {currentUser.type == UserType.DRIVER &&  <DriverMenu/> }

      
    </>
  )
}

export {SidebarMenuMain}
