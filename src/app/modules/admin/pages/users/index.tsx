import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import {useIntl} from 'react-intl'

import AddDriver from './manage-driver/add-edit/Add'
import EditDriver from './manage-driver/add-edit/Edit'

import AddUser from './manage-user/add-edit/Add'
import EditUser from './manage-user/add-edit/Edit'

import AddPilot from './manage-pilot/add-edit/Add'
import EditPilot from './manage-pilot/add-edit/Edit'

import {ManageUsertWrapper} from './manage-user/List'
import {ManagePilotWrapper} from './manage-pilot/List'

import {ListUserPath, driverBreadcrumbs, userBreadcrumbs} from './routes/RoutesNames'
import {ManageDriverWrapper} from './manage-driver/List'

const UsersPage = () => {
  const intl = useIntl()
  return (
    <Routes>
      <Route element={<Outlet />}>
        //#region driver
        <Route
          path='manage-user'
          element={
            <>
              <PageTitle breadcrumbs={userBreadcrumbs}>
                {intl.formatMessage({id: 'user'})}
              </PageTitle>
              <ManageUsertWrapper />
            </>
          }
        />
        <Route
          path='add-user'
          element={
            <>
              <PageTitle breadcrumbs={userBreadcrumbs}>
                {intl.formatMessage({id: 'add_object'}, {name: intl.formatMessage({id: 'user'})})}
              </PageTitle>
              <AddUser />
            </>
          }
        />
        <Route
          path='edit-user'
          element={
            <>
              <PageTitle breadcrumbs={userBreadcrumbs}>
                {intl.formatMessage({id: 'edit_object'}, {name: intl.formatMessage({id: 'user'})})}{' '}
              </PageTitle>
              <EditUser />
            </>
          }
        />
        <Route
          path='manage-driver'
          element={
            <>
              <PageTitle breadcrumbs={driverBreadcrumbs}>
                {intl.formatMessage({id: 'driver'})}
              </PageTitle>
              <ManageDriverWrapper />
            </>
          }
        />
        <Route
          path='add-driver'
          element={
            <>
              <PageTitle breadcrumbs={driverBreadcrumbs}>
                {intl.formatMessage({id: 'add_object'}, {name: intl.formatMessage({id: 'driver'})})}
              </PageTitle>
              <AddDriver />
            </>
          }
        />
        <Route
          path='edit-driver'
          element={
            <>
              <PageTitle breadcrumbs={driverBreadcrumbs}>
                {intl.formatMessage(
                  {id: 'edit_object'},
                  {name: intl.formatMessage({id: 'driver'})}
                )}{' '}
              </PageTitle>
              <EditDriver />
            </>
          }
        />
        <Route
          path='manage-pilot'
          element={
            <>
              <PageTitle breadcrumbs={userBreadcrumbs}>
                {intl.formatMessage({id: 'pilot'})}
              </PageTitle>
              <ManagePilotWrapper />
            </>
          }
        />
        <Route
          path='add-pilot'
          element={
            <>
              <PageTitle breadcrumbs={userBreadcrumbs}>
                {intl.formatMessage({id: 'add_object'}, {name: intl.formatMessage({id: 'pilot'})})}
              </PageTitle>
              <AddPilot />
            </>
          }
        />
        <Route
          path='edit-pilot'
          element={
            <>
              <PageTitle breadcrumbs={userBreadcrumbs}>
                {intl.formatMessage({id: 'edit_object'}, {name: intl.formatMessage({id: 'pilot'})})}{' '}
              </PageTitle>
              <EditPilot />
            </>
          }
        />
      </Route>

      <Route index element={<Navigate to={ListUserPath} />} />
    </Routes>
  )
}
export default UsersPage
