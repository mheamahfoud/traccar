/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import {Outlet, Link, useNavigate, useLocation} from 'react-router-dom'
import {Header} from './components/header'
import {Sidebar} from './components/sidebar'
import './index.css'
import Advertisement from './pages/advertisment'
import {useDispatch, useSelector} from 'react-redux'
import {LinearProgress} from '@mui/material'
import {adsManagerActions, terminalPathsActions} from '../../../store'
import {truckPathActions} from '../../../store'
import SocketController from './SocketController'
import {GetCurrentDevice, GetCurrentTerminal, GetPageTimes} from '../../../services/traccargps'

const TerminalLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector((state: any) => state.terminalPath.loading)
  const checkArriveTerminal = useSelector((state: any) => state.terminalPath.checkArriveTerminal)
  const showAds = useSelector((state: any) => state.adsManager?.showAds)
  const location = useLocation()
  const id: any = location.state

  //start auth
  useEffect(() => {
    dispatch(GetCurrentTerminal(id)).then((res) => {
      if (res.type == 'terminal/fulfilled') {
        if (res.payload.length > 0) {
          dispatch(
            terminalPathsActions.setDevices({
              devices: res?.payload[0].devices?.map((x) => x.id),
              terminal: res?.payload[0].terminal,
            })
          )
          dispatch(adsManagerActions.setAds(res?.payload[0]?.ads))
        }
        else{
          dispatch(
            terminalPathsActions.setDevices({
              devices: [],
              terminal: [],
            })
          )
          dispatch(adsManagerActions.setAds([]))
        }

        dispatch(GetPageTimes())
      }
    })
  }, [])

  ///check arrival
  useEffect(() => {
    if (checkArriveTerminal) {
      closeAds()
      navigate('/terminal/dest')
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
      {<SocketController />}
      <div className='container-car'>
        <Header />
        <div className='main-car'>
          <div className='sidebar-car'>
            <Sidebar />
          </div>
          <div className='content-car'>
            {!showAds && <Outlet />}
            { showAds && <Advertisement closeAds={closeAds} />}
          </div>
        </div>
      </div>
    </>
  )
}

export {TerminalLayout}
