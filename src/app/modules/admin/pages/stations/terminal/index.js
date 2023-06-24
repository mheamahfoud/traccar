import React, {useState, useCallback, useEffect, FC} from 'react'
import {makeStyles} from '@mui/styles'
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import {useDispatch, useSelector} from 'react-redux'
import {devicesActions, terminalPathsActions} from '../../../../../../store'
import useFilter from './useFilter'
import MainMap from './MainMap'
import {useAttributePreference} from '../../../../../../_metronic/helpers/common/util/preferences'
import usePersistedState from '../../../../../../_metronic/helpers/common/util/usePersistedState'
import StatusCard from '../../../../../../_metronic/helpers/common/components/StatusCard'
import {GetCurrentTerminal} from '../../../../../../services/traccargps'
import {useLocation} from 'react-router-dom'
import {BusListWrapper, DeviceLIstTemp} from './BusListWrapper'
import {Spinner} from '../../../../../../_metronic/helpers/components/Spinner'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  sidebar: {
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
      right: 0,
      top: '20%',
      height: `calc(100% - ${theme.spacing(3)})`,
      width: theme.dimensions.drawerWidthDesktop,
      margin: theme.spacing(1.5),
      zIndex: 3,
    },
    [theme.breakpoints.down('md')]: {
      height: '100%',
      width: '100%',
    },
  },
  header: {
    pointerEvents: 'auto',
    zIndex: 6,
  },
  footer: {
    pointerEvents: 'auto',
    zIndex: 5,
  },
  middle: {
    flex: 1,
    display: 'grid',
    position: 'fixed',
    right: 0,
    top: '20%',
  },
  contentMap: {
    pointerEvents: 'auto',
    gridArea: '1 / 1',
  },
  contentList: {
    pointerEvents: 'auto',
    gridArea: '1 / 1',
    zIndex: 4,
  },
}))

const MapTerminalPage = () => {
  const classes = useStyles()
  const location = useLocation()
  const id = location.state
  const loading = useSelector((state) => state.terminalPath.loading)
  //start auth
  useEffect(() => {
    dispatch(GetCurrentTerminal(id)).then((res) => {
      if (res.type == 'terminal/fulfilled') {
        if (res.payload.length > 0) {
          dispatch(
            terminalPathsActions.setDevices({
              devices: res?.payload[0].devices,
              terminal: res?.payload[0].terminal,
            })
          )
          dispatch(adsManagerActions.setAds(res?.payload[0]?.ads))
        } else {
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

  //const loading = useSelector((state) => state.devices.loading)

  const dispatch = useDispatch()
  const theme = useTheme()
  const currentDevice = useSelector((state) => state.devices.currentDevice)
  const desktop = useMediaQuery(theme.breakpoints.up('md'))

  const mapOnSelect = useAttributePreference('mapOnSelect', true)

  const selectedDeviceId = useSelector((state) => state.devices.selectedId)
  const positions = useSelector((state) => state.session.positions)
  const [filteredPositions, setFilteredPositions] = useState([])
  const selectedPosition = filteredPositions.find(
    (position) => selectedDeviceId && position.deviceId === selectedDeviceId
  )

  const [filteredDevices, setFilteredDevices] = useState([])

  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = usePersistedState('filter', {
    statuses: [],
    groups: [],
  })
  const [filterSort, setFilterSort] = usePersistedState('filterSort', '')
  const [filterMap, setFilterMap] = usePersistedState('filterMap', false)

  const [devicesOpen, setDevicesOpen] = useState(desktop)
  const [eventsOpen, setEventsOpen] = useState(false)

  const onEventsClick = useCallback(() => setEventsOpen(true), [setEventsOpen])

  const [filterDevices, setFilterDevices] = useState([])

  useEffect(() => {
    if (!desktop && mapOnSelect && selectedDeviceId) {
      setDevicesOpen(false)
    }
  }, [desktop, mapOnSelect, selectedDeviceId])
  useFilter(
    keyword,
    filterDevices,
    filter,
    filterSort,
    filterMap,
    positions,
    setFilteredDevices,
    setFilteredPositions
  )

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className='h-100 w-100 position-relative'>
          <MainMap
            filteredPositions={filteredPositions}
            selectedPosition={selectedPosition}
            onEventsClick={onEventsClick}
          />

          <BusListWrapper devices={filteredDevices} keyword={keyword} setKeyword={setKeyword} />

          {selectedDeviceId && (
            <StatusCard
              deviceId={selectedDeviceId}
              position={selectedPosition}
              onClose={() => dispatch(devicesActions.selectId(null))}
              desktopPadding={360}
              ishow={true}
            />
          )}
        </div>
      )}
    </>
  )
}

export default MapTerminalPage
