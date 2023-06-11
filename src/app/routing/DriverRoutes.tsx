import { Route, Navigate, Routes } from 'react-router-dom'
import { SuspensedView } from '../../_metronic/helpers/components/SuspensedView'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import { lazy } from 'react';
import { ReportTripDriver } from '../modules/driver/reports/report-trip-driver/List';
const AccountDriverPage = lazy(() => import('../modules/driver/accounts/AccountPage'))
const SessionDriverPage = lazy(() => import('../modules/driver/sessions/SessionPage'))
const WorkingDaysDriverPage = lazy(() => import('../modules/driver/work-days'))
const TripsDriverPage = lazy(() => import('../modules/driver/trips'))

const DriverRoutes = () => {
    return (
        <Routes>
      
        </Routes>
    );
}

export default DriverRoutes;
