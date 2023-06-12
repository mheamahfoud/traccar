import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import { useAuth } from '../modules/auth'
import { UserType } from '../../_metronic/utlis/constants'
import { CarPage } from '../modules/car'
import AccountPilotPage from '../modules/pilot/accounts/AccountPage'
import { SuspensedView } from '../../_metronic/helpers/components/SuspensedView'
import TerminalPage from '../modules/terminal/TerminalPage'

import { lazy, } from 'react'

import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'


// const DashboardWrapper = lazy(() => import('../pages/dashboard/DashboardWrapper'))
const TripPage = lazy(() => import('../modules/admin/pages/trips'))
const WorkingDaysPage = lazy(() => import('../modules/admin/pages/workingTime'))
const SettingPage = lazy(() => import('../modules/admin/pages/setting'))
const AdsPage = lazy(() => import('../modules/admin/pages/ads'))
const UsersPage = lazy(() => import('../modules/admin/pages/users'))

const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
// const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

const VechilesPage = lazy(() => import('../modules/admin/pages/vehicles'))
const StationPage = lazy(() => import('../modules/admin/pages/stations'))

const PublicMapPage = lazy(() => import('../modules/admin/pages/publicMap/map'))
const ReportsPage = lazy(() => import('../modules/admin/pages/reports/Index'))
const TerminalListPage = lazy(() => import('../modules/admin/pages/terminals'))
const PathPage = lazy(() => import('../modules/admin/pages/path'))
const RolePage = lazy(() => import('../modules/admin/pages/role'))
const LiveVedioPage = lazy(() => import('../modules/admin/pages/vedio-stream'))
const CameraPage = lazy(() => import('../modules/admin/pages/camera'))
const CarOutServicePage = lazy(() => import('../modules/admin/pages/car-out-service'))

import { ReportTripDriver } from '../modules/driver/reports/report-trip-driver/List';

const AccountDriverPage = lazy(() => import('../modules/driver/accounts/AccountPage'))
const SessionDriverPage = lazy(() => import('../modules/driver/sessions/SessionPage'))
const WorkingDaysDriverPage = lazy(() => import('../modules/driver/work-days'))
const TripsDriverPage = lazy(() => import('../modules/driver/trips'))

const PrivateRoutes = () => {
  const { currentUser } = useAuth()

  return (
    <Routes>
      {currentUser?.type == UserType.ADMIN && (

        <Route element={<MasterLayout />}>
          <Route path='dashboard' element={<DashboardWrapper />} />
          <Route path='auth/*' element={<Navigate to='/dashboard' />} />
          <Route
            path='crafted/pages/profile/*'
            element={
              <SuspensedView>
                <ProfilePage />
              </SuspensedView>
            }
          />
          <Route
            path='crafted/pages/wizards/*'
            element={
              <SuspensedView>
                <WizardsPage />
              </SuspensedView>
            }
          />
          <Route
            path='crafted/widgets/*'
            element={
              <SuspensedView>
                <WidgetsPage />
              </SuspensedView>
            }
          />
          <Route
            path='crafted/account/*'
            element={
              <SuspensedView>
                <AccountPage />
              </SuspensedView>
            }
          />
          <Route
            path='apps/chat/*'
            element={
              <SuspensedView>
                <ChatPage />
              </SuspensedView>
            }
          />

          <Route
            path='/admin/vehicles/*'
            element={
              <SuspensedView>
                <VechilesPage />
              </SuspensedView>
            }
          />

          <Route
            path='/admin/stations/*'
            element={
              <SuspensedView>
                <StationPage />
              </SuspensedView>
            }
          />
          <Route
            path='/admin/terminals/*'
            element={
              <SuspensedView>
                <TerminalListPage />
              </SuspensedView>
            }
          />
          <Route
            path='/admin/trips/*'
            element={
              <SuspensedView>
                <TripPage />
              </SuspensedView>
            }
          />

          <Route
            path='/admin/reports/*'
            element={
              <SuspensedView>
                <ReportsPage />
              </SuspensedView>
            }
          />
          <Route
            path='/admin/public-map/*'
            element={
              <SuspensedView>
                <PublicMapPage />
              </SuspensedView>
            }
          />

          <Route
            path='/admin/working-days/*'
            element={
              <SuspensedView>
                <WorkingDaysPage />
              </SuspensedView>
            }
          />

          <Route
            path='/admin/setting/*'
            element={
              <SuspensedView>
                <SettingPage />
              </SuspensedView>
            }
          />

          <Route
            path='/admin/path/*'
            element={
              <SuspensedView>
                <PathPage />
              </SuspensedView>
            }
          />

          <Route
            path='/admin/ads/*'
            element={
              <SuspensedView>
                <AdsPage />
              </SuspensedView>
            }
          />

          <Route
            path='/admin/users/*'
            element={
              <SuspensedView>
                <UsersPage />
              </SuspensedView>
            }
          />
          <Route
            path='/admin/roles/*'
            element={
              <SuspensedView>
                <RolePage />
              </SuspensedView>
            }
          />

          <Route
            path='/admin/live-vedio'
            element={
              <SuspensedView>
                <LiveVedioPage />
              </SuspensedView>
            }
          />

          <Route
            path='/admin/camera/*'
            element={
              <SuspensedView>
                <CameraPage />
              </SuspensedView>
            }
          />
             <Route
            path='/admin/car-out-service/*'
            element={
              <SuspensedView>
                <CarOutServicePage />
              </SuspensedView>
            }
          />
        </Route>




      )}
      {currentUser?.type == UserType.DRIVER && (
        <Route element={<MasterLayout />}>
          <Route path='auth/*' element={<Navigate to='/driver/account/' />} />
          <Route
            path='driver/account/*'
            element={
              <SuspensedView>
                <AccountDriverPage />
              </SuspensedView>
            }
          ></Route>
          <Route
            path='driver/session'
            element={
              <SuspensedView>
                <SessionDriverPage />
              </SuspensedView>
            }
          ></Route>
          <Route
            path='driver/report'
            element={
              <SuspensedView>
                <ReportTripDriver />
              </SuspensedView>
            }
          ></Route>
          <Route
            path='driver/trips/*'
            element={
              <SuspensedView>
                <TripsDriverPage />
              </SuspensedView>
            }
          ></Route>
          <Route
            path='driver/working/*'
            element={
              <SuspensedView>
                <WorkingDaysDriverPage />
              </SuspensedView>
            }
          ></Route>
        </Route>
      )}
      {(currentUser?.type == UserType.OTHER) && (
        <Route element={<MasterLayout />}>
          <Route path='auth/*' element={<Navigate to='/pilot/account/' />} />
          <Route
            path='pilot/account/*'
            element={
              <SuspensedView>
                <AccountPilotPage />
              </SuspensedView>
            }
          ></Route>
        </Route>
      )}
      //#endregion //#region Car
      {(currentUser?.type == UserType.CAR || currentUser?.type == UserType.ADMIN) && (
        <Route path='auth/*' element={<Navigate to='/car' />} />
      )}
      {(currentUser?.type == UserType.CAR || currentUser?.type == UserType.ADMIN) && (
        <Route path='/' element={<Navigate to='/car' />} />
      )}
      {(currentUser?.type == UserType.CAR || currentUser?.type == UserType.ADMIN) && (
        <Route
          path='car/*'
          element={
            <SuspensedView>
              <CarPage />
            </SuspensedView>
          }
        ></Route>
      )}
      //#endregion //#region Terminal
      {(currentUser?.type == UserType.TERMINAL || currentUser?.type == UserType.ADMIN) && (
        <Route path='auth/*' element={<Navigate to='/terminal' />} />
      )}
      {(currentUser?.type == UserType.TERMINAL || currentUser?.type == UserType.ADMIN) && (
        <Route path='/' element={<Navigate to='/terminal' />} />
      )}
      {(currentUser?.type == UserType.TERMINAL || currentUser?.type == UserType.ADMIN) && (
        <Route
          path='terminal/*'
          element={
            <SuspensedView>
              <TerminalPage />
            </SuspensedView>
          }
        ></Route>
      )}
      //#endregion
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  )
}



export { PrivateRoutes }
