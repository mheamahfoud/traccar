import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {ThemeProvider, StyledEngineProvider} from '@mui/material'
import {PageLink, PageTitle} from '../../../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import ReplayMap from './replyMap'
import { ReplyPath } from './routes/RoutesName'
import theme from '../../../../../_metronic/helpers/common/theme'




const ReportsPage = () => {
  const intl = useIntl()
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<Outlet />}>
              //#region Manage Vehicles
              <Route
                path='reply-map'
                element={
                  <>
                    <ReplayMap />
                  </>
                }
              />
            </Route>
            <Route index element={<Navigate to={ReplyPath} />} />
          </Routes>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}

export default ReportsPage
