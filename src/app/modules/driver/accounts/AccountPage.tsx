import React from 'react'
import {Navigate, Route, Routes, Outlet} from 'react-router-dom'
import {AccountHeader} from './AccountHeader'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CurrentTripsPath, accountBreadCrumbs} from './routes/RouteNames'
import {ManageCurrentTripListWrapper} from './components/current-trip/List'
import { ManageOldTripListWrapper } from './components/old-trip/List'

const AccountDriverPage: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <AccountHeader />
            <Outlet />
          </>
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
        <Route
          path='old-trip'
          element={
            <>
              <PageTitle breadcrumbs={accountBreadCrumbs}>Old Trip</PageTitle>
              <ManageOldTripListWrapper />
            </>
          }
        />
        <Route index element={<Navigate to={CurrentTripsPath} />} />
      </Route>
    </Routes>
  )
}

export default AccountDriverPage
