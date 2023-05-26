import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {ThemeProvider, StyledEngineProvider} from '@mui/material'
import { PageTitle} from '../../../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import AddWorkingCar from './manage-working-cars//add-edit/Add'
import EditWorkingCar from './manage-working-cars/add-edit/Edit'
import {Breadcrumbs, ListWorkingCarsDaysPath} from './routes/RoutesNames'
import {ManageWorkingCarsDaysWrapper} from './manage-working-cars/List'
import theme from '../../../../../_metronic/helpers/common/theme'
const WorkingDaysPage = () => {
  const intl = useIntl()
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<Outlet />}>
              //#region Manage Vehicles
              <Route
                path='manage-cars'
                element={
                  <>
                    <PageTitle breadcrumbs={Breadcrumbs}>
                      {intl.formatMessage(
                        {id: 'manage_object'},
                        {name: intl.formatMessage({id: 'cars_working_days'})}
                      )}{' '}
                    </PageTitle>
                    <ManageWorkingCarsDaysWrapper />
                  </>
                }
              />
              <Route
                path='add-cars-working-days'
                element={
                  <>
                    <PageTitle breadcrumbs={Breadcrumbs}>
                      {intl.formatMessage(
                        {id: 'add_object'},
                        {name: intl.formatMessage({id: 'cars_working_days'})}
                      )}
                    </PageTitle>
                    <AddWorkingCar />
                  </>
                }
              />
              <Route
                path='edit-cars-working-days'
                element={
                  <>
                    <PageTitle breadcrumbs={Breadcrumbs}>
                      {intl.formatMessage(
                        {id: 'add_object'},
                        {name: intl.formatMessage({id: 'cars_working_days'})}
                      )}
                    </PageTitle>
                    <EditWorkingCar />
                  </>
                }
              />
          
            </Route>
            <Route index element={<Navigate to={ListWorkingCarsDaysPath} />} />
          </Routes>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}

export default WorkingDaysPage
