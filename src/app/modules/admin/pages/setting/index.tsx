import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../../_metronic/layout/core'
import { useIntl } from 'react-intl';

import AddWorkingTime from './manage-work-time/add-edit/Add';
import EditWorkingTime from './manage-work-time/add-edit/Edit';

import { ListWorkTimePath, WorkTimeBreadcrumbs } from './routes/RoutesNames';
import { ManageWorkinTimeListWrapper } from './manage-work-time/List';

//import { ManageVehiclesListWrapper } from './manage-vehicles/List';


const SettingPage = () => {
  const intl = useIntl();
  return (
    <Routes>
      <Route element={<Outlet />}>
        //#region Manage Vehicles
        <Route
          path='work-time'
          element={
            <>
              <PageTitle breadcrumbs={WorkTimeBreadcrumbs}>{intl.formatMessage({ id: "work_time" })} </PageTitle>
              <ManageWorkinTimeListWrapper />
            </>
          }
        />
        <Route
          path='add-work-time'
          element={
            <>
              <PageTitle breadcrumbs={WorkTimeBreadcrumbs}>{intl.formatMessage({ id: "add_object" }, { name: intl.formatMessage({ id: "work-time" }) })}</PageTitle>
              <AddWorkingTime />
            </>
          }
        />
        <Route
          path='edit-work-time'
          element={
            <>
              <PageTitle breadcrumbs={WorkTimeBreadcrumbs}>{intl.formatMessage({ id: "edit_object" }, { name: intl.formatMessage({ id: "work-time" }) })}</PageTitle>
              <EditWorkingTime />
            </>
          }
        />

       </Route>
      <Route index element={<Navigate to={ListWorkTimePath} />} />

    </Routes>

  )
}
export default SettingPage

