import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import MyPage from '../pages/MyPage'
import { useAuth } from '../modules/auth'
import { UserType } from '../../_metronic/utlis/constants'

import { CarPage } from '../modules/driver'
import PublicMapPage from '../modules/admin/pages/publicMap/map'



const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  const VechilesPage = lazy(() => import('../modules/admin/pages/vehicles'))
  const StationPage = lazy(() => import('../modules/admin/pages/stations'))
  const TerminalPage = lazy(() => import('../modules/terminal/TerminalPage'))
  const { currentUser } = useAuth()
  return (
    <Routes>
      //#region Admin
      {currentUser?.type == UserType.ADMIN && (
        <Route element={<MasterLayout />}>
          <Route index element={<Navigate to='/dashboard' />} />
          {/* Redirect to Dashboard after success login/registartion */}
          <Route path='auth/*' element={<Navigate to='/dashboard' />} />
          {/* Pages */}
          <Route path='/my-page' element={<MyPage />} />

          <Route path='dashboard' element={<DashboardWrapper />} />
          <Route path='builder' element={<BuilderPageWrapper />} />
          <Route path='menu-test' element={<MenuTestPage />} />
          {/* Lazy Modules */}
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
            path='/admin/public-map/*'
            element={
              <SuspensedView>
                <PublicMapPage />
              </SuspensedView>
            }
          />
          <Route
            path='apps/user-management/*'
            element={
              <SuspensedView>
                <UsersPage />
              </SuspensedView>
            }
          />
          {/* Page Not Found */}
        </Route>
      )}
      //#endregion //#region Car
      {currentUser?.type == UserType.CAR && (
        <Route path='auth/*' element={<Navigate to='/car' />} />
      )}
      {currentUser?.type == UserType.CAR && <Route path='/' element={<Navigate to='/car' />} />}
      {currentUser?.type == UserType.CAR && (
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
      {currentUser?.type == UserType.TERMINAL && (
        <Route path='auth/*' element={<Navigate to='/terminal' />} />
      )}
      {currentUser?.type == UserType.TERMINAL && (
        <Route path='/' element={<Navigate to='/terminal' />} />
      )}
      {currentUser?.type == UserType.TERMINAL && (
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

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
