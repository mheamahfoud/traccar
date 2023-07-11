/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { Header } from './components/header'
import { Sidebar } from './components/sidebar'
import './index.css'
import Advertisement from './pages/advertisment'
import { useDispatch, useSelector } from 'react-redux'
import { LinearProgress } from '@mui/material'
import { adsManagerActions } from '../../../store'
import { truckPathActions } from '../../../store'
import SocketController from './SocketController'
import { GetCurrentDevice, GetPageTimes } from '../../../services/traccargps'

const CarLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector((state: any) => state.truckPath.loading)
  const checkArriveTerminal = useSelector((state: any) => state.truckPath.checkArriveTerminal)
  const showAds = useSelector((state: any) => state.adsManager?.showAds)
  const location = useLocation()
  const id: any = location.state

  //start auth
  useEffect(() => {
    dispatch(GetCurrentDevice(id)).then((res) => {
      if (res.type == 'device/fulfilled') {
        if (res?.payload.length > 0) {
          dispatch(
            truckPathActions.setTerminals({
              id: res?.payload[0].id,
              terminal: res?.payload[0]?.terminal,
            })
          )
          dispatch(adsManagerActions.setAds(res?.payload[0]?.ads))
        }

        dispatch(GetPageTimes())
      }
    })

  }, [])

  ///check arrival
  useEffect(() => {
    if (checkArriveTerminal) {
      closeAds()
      navigate('/car/dest')
    }
  }, [checkArriveTerminal])

  //check ads
  useEffect(() => {
    const interval = setInterval(() => {
      if (!checkArriveTerminal) dispatch(adsManagerActions.checkShowAds())
    }, 3 * 1000)
    return () => clearInterval(interval)
  }, [dispatch])

  const closeAds = () => {
    dispatch(adsManagerActions.setShowAds(false))
  }

  return loading ? (
    <LinearProgress />
  ) : (
    <>
      <SocketController />
      <div className='container-car'>
        <Header />
        <div className='main-car'>
            <Sidebar />
          <div className='content-car'>
            {!showAds && <Outlet />}
            {showAds && <Advertisement closeAds={closeAds} />}
          </div>
        </div>
        <Header />
      </div>
    </>
  )
}

export { CarLayout }
