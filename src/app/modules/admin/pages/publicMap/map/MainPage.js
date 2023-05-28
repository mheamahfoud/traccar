import React, {useState, useCallback, useEffect, FC} from 'react'
import {Paper} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import {useDispatch, useSelector} from 'react-redux'
import DeviceList from './DeviceList'

// import StatusCard from '../common/components/StatusCard';
import {devicesActions, layoutManagerActions} from '../../../../../../store'
// import usePersistedState from '../common/util/usePersistedState';
import EventsDrawer from './EventsDrawer'
import useFilter from './useFilter'
import MainToolbar from './MainToolbar'
import MainMap from './MainMap'
import {useAttributePreference} from '../../../../../../_metronic/helpers/common/util/preferences'
import usePersistedState from '../../../../../../_metronic/helpers/common/util/usePersistedState'
import StatusCard from '../../../../../../_metronic/helpers/common/components/StatusCard'
import {KTCard} from '../../../../../../_metronic/helpers'
import {GetStationInfo} from '../../../../../../services/traccargps'
import {ListLoading} from '../../../components/table/loading/ListLoading'
import {useLocation} from 'react-router-dom'
import { map } from '../../../../apps/map/core/MapView'
// import { useAttributePreference } from '../common/util/preferences';
import { DeviceLIstTemp } from './DeviceLIstTemp'
import { isDeviceWithinBounds, useEffectAsync } from '../../../../../../reactHelper'
import { object } from 'yup'
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

const Main = () => {
  const classes = useStyles()
  const location = useLocation()
  const station_id = location.state
  const loading = useSelector((state) => state.devices.loading)

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

  const onEventsClick = useCallback(() => setEventsOpen(true), [setEventsOpen]);

  const [filterDevices,setFilterDevices]=useState([])

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

  // useEffect(() => {
  //   dispatch(devicesActions.initStations([]));
  //   dispatch(layoutManagerActions.setToolbar(false))
  //   return () => {
  //     dispatch(layoutManagerActions.setToolbar(true))
  //   }
  // }, [])

  useEffectAsync(async () => {
    let email = "test@test.test";
    let password = "test";
    const auth = btoa(`${email}:${password}`);
    const response = await fetch('http://173.249.51.233:8082/api/devices', {
      credentials: 'include',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    if (response.ok) {
      dispatch(devicesActions.refresh(await response.json()));
    
    } else {
      throw Error(await response.text());
    }
  }, []);

  map.on('moveend', () => {
    const bounds = map.getBounds();
    const visibleDevices = Object.values(positions).filter(device =>
      isDeviceWithinBounds(device, bounds)
    );

    setFilterDevices(visibleDevices.map((item)=>item.deviceId))

  });

  return (
    <>
      {loading ? (
        <ListLoading />
      ) : (
        <div className='h-100 w-100'>
          <MainMap
            filteredPositions={filteredPositions}
            selectedPosition={selectedPosition}
            onEventsClick={onEventsClick}
          />

          {/* <Paper square elevation={3} className={classes.header}>
              { <MainToolbar
                keyword={keyword}
                setKeyword={setKeyword}
              /> }
            </Paper> */}
          <DeviceLIstTemp  devices={filteredDevices} keyword={keyword} setKeyword={setKeyword}/>
          {/* <div className=''>
            <DeviceList devices={filteredDevices} />
          </div> */}

          {/* { <EventsDrawer open={eventsOpen} onClose={() => setEventsOpen(false)} /> } */}
          {selectedDeviceId && (
            <StatusCard
              deviceId={selectedDeviceId}
              position={selectedPosition}
              onClose={() => dispatch(devicesActions.selectId(null))}
              desktopPadding={360}
              //theme.dimensions.drawerWidthDesktop
            />
          )}
        </div>
      )}
    </>
  )
}

export default Main


