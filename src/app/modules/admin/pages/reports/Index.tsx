import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { ThemeProvider, StyledEngineProvider } from '@mui/material'
import { PageLink, PageTitle } from '../../../../../_metronic/layout/core'
import { useIntl } from 'react-intl'

import { ReplyPath, ReportEventPath, eventBreadcrumbs, tripBreadcrumbs } from './routes/RoutesName'
import theme from '../../../../../_metronic/helpers/common/theme'
import { ReportTripWrapper } from './summery-report/List'
import ReplayMap from './map-reply/replyMap'
import { ReportEventWrapper } from './report-event/List'




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
              <Route
                path='trip-report'
                element={
                  <>
                    <PageTitle breadcrumbs={tripBreadcrumbs}>
                      {intl.formatMessage(
                        { id: 'manage_object' },
                        { name: intl.formatMessage({ id: 'trip_report' }) }
                      )}{' '}
                    </PageTitle>
                    <ReportTripWrapper />
                  </>
                }
              />
              <Route
                path='event-report'
                element={
                  <>
                    <PageTitle breadcrumbs={eventBreadcrumbs}>
                      {intl.formatMessage(
                        { id: 'manage_object' },
                        { name: intl.formatMessage({ id: 'trip_event' }) }
                      )}{' '}
                    </PageTitle>
                    <ReportEventWrapper />
                  </>
                }
              />

            </Route>
            <Route index element={<Navigate to={ReplyPath} />} />
          </Routes>
        </ThemeProvider>
      </StyledEngineProvider >
    </>
  )
}

export default ReportsPage
