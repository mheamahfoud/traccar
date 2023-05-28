import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../../_metronic/layout/core'
import { useIntl } from 'react-intl';

import AddWorkingTime from './manage-work-time/add-edit/Add';
import EditWorkingTime from './manage-work-time/add-edit/Edit';



import AddInfractionType from './manage-infraction-type/add-edit/Add';
import EditInfractionType from './manage-infraction-type/add-edit/Edit';


import AddReasonCancel from './manage-reason-cancel/add-edit/Add';
import EditInReasonCancel from './manage-reason-cancel/add-edit/Edit';


import { InfractionTypeBreadcrumbs, ListWorkTimePath, ReasonCancelBreadcrumbs, WorkTimeBreadcrumbs } from './routes/RoutesNames';
import { ManageWorkinTimeListWrapper } from './manage-work-time/List';
import { ManageInfractionTypeListWrapper } from './manage-infraction-type/List';
import { ManageReasonCancelListWrapper } from './manage-reason-cancel/List';

//import { ManageVehiclesListWrapper } from './manage-vehicles/List';


const SettingPage = () => {
  const intl = useIntl();
  return (
    <Routes>
      <Route element={<Outlet />}>
        //#region Manage Shift
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
              <PageTitle breadcrumbs={WorkTimeBreadcrumbs}>{intl.formatMessage({ id: "add_object" }, { name: intl.formatMessage({ id: "work_time" }) })}</PageTitle>
              <AddWorkingTime />
            </>
          }
        />
        <Route
          path='edit-work-time'
          element={
            <>
              <PageTitle breadcrumbs={WorkTimeBreadcrumbs}>{intl.formatMessage({ id: "edit_object" }, { name: intl.formatMessage({ id: "work_time" }) })}</PageTitle>
              <EditWorkingTime />
            </>
          }
        />
        //#endregion

        //#region  Manage Infraction Type
        <Route
          path='infraction-type'
          element={
            <>
              <PageTitle breadcrumbs={InfractionTypeBreadcrumbs}>{intl.formatMessage({ id: "infraction_type" })} </PageTitle>
              <ManageInfractionTypeListWrapper />
            </>
          }
        />
        <Route
          path='add-infraction-type'
          element={
            <>
              <PageTitle breadcrumbs={InfractionTypeBreadcrumbs}>{intl.formatMessage({ id: "add_object" }, { name: intl.formatMessage({ id: "infraction_type" }) })}</PageTitle>
              <AddInfractionType />

            </>
          }
        />
        <Route
          path='edit-infraction-type'
          element={
            <>
              <PageTitle breadcrumbs={InfractionTypeBreadcrumbs}>{intl.formatMessage({ id: "edit_object" }, { name: intl.formatMessage({ id: "infraction_type" }) })}</PageTitle>
              <EditInfractionType />
            </>
          }
        />
        //#endregion


        //#region  Reason Cancel

        <Route
          path='reason-cancel'
          element={
            <>
              <PageTitle breadcrumbs={ReasonCancelBreadcrumbs}>{intl.formatMessage({ id: "reason_cancel" })} </PageTitle>
              <ManageReasonCancelListWrapper />
            </>
          }
        />
        <Route
          path='add-reason-cancel'
          element={
            <>
              <PageTitle breadcrumbs={ReasonCancelBreadcrumbs}>{intl.formatMessage({ id: "add_object" }, { name: intl.formatMessage({ id: "reason_cancel" }) })}</PageTitle>
              <AddReasonCancel />

            </>
          }
        />
        <Route
          path='edit-reason-cancel'
          element={
            <>
              <PageTitle breadcrumbs={ReasonCancelBreadcrumbs}>{intl.formatMessage({ id: "edit_object" }, { name: intl.formatMessage({ id: "reason_cancel" }) })}</PageTitle>
              <EditInReasonCancel />
            </>
          }
        />
        //#endregion
      </Route>


      <Route index element={<Navigate to={ListWorkTimePath} />} />

    </Routes>

  )
}
export default SettingPage

