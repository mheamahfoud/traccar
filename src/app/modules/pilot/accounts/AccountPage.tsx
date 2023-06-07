import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {AccountHeader} from './AccountHeader'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CurrentTripsPath, accountBreadCrumbs} from './routes/RouteNames'
import {ManageCurrentTripListWrapper} from './components/current-trip/List'

const AccountPilotPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <div className='d-flex flex-wrap gap-5'>
            <AccountHeader />
            <Outlet />
          </div>
        }
      >
        <Route
          path='current-trip'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Current Trip</PageTitle>
              <ManageCurrentTripListWrapper />
            </>
          }
        />
        {/* <Route
          path='old-trip'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Old Trip</PageTitle>
              <ManageOldTripListWrapper />
            </>
          }
        /> */}
        <Route index element={<Navigate to={CurrentTripsPath} />} />
      </Route>
    </Routes>
  )
}

export default AccountPilotPage
