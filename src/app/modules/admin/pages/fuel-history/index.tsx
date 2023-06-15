import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { ThemeProvider, StyledEngineProvider } from '@mui/material'
import { PageTitle } from '../../../../../_metronic/layout/core'
import { useIntl } from 'react-intl'
import Add from './manage/add-edit/Add';
import Edit from './manage/add-edit/Edit'
import { Breadcrumbs, ListPath } from './routes/RoutesNames'
import { ManageListWrapper } from './manage/List'
import theme from '../../../../../_metronic/helpers/common/theme'

const FuelHistoryPage = () => {
  const intl = useIntl()
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<Outlet />}>
              <Route
                path='manage-fuel-history'
                element={
                  <>
                    <PageTitle breadcrumbs={Breadcrumbs}>
                      {intl.formatMessage(
                        { id: 'manage_object' },
                        { name: intl.formatMessage({ id: 'fuel_history' }) }
                      )}{' '}
                    </PageTitle>
                    <ManageListWrapper />
                  </>
                }
              />
              <Route
                path='add-fuel-history'
                element={
                  <>
                    <PageTitle breadcrumbs={Breadcrumbs}>
                      {intl.formatMessage(
                        { id: 'add_object' },
                        { name: intl.formatMessage({ id: 'fuel_history' }) }
                      )}
                    </PageTitle>
                    <Add />
                  </>
                }
              />
              <Route
                path='edit-fuel-history'
                element={
                  <>
                    <PageTitle breadcrumbs={Breadcrumbs}>
                      {intl.formatMessage(
                        { id: 'add_object' },
                        { name: intl.formatMessage({ id: 'fuel_history' }) }
                      )}
                    </PageTitle>
                    <Edit />
                  </>
                }
              />

            </Route>
            <Route index element={<Navigate to={ListPath} />} />
          </Routes>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}

export default FuelHistoryPage
