import maplibregl from 'maplibre-gl'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {map} from '../core/MapView'
import {usePreference} from '../../../../../_metronic/helpers/common/util/preferences'


const MapDefaultCamera = () => {
  const selectedDeviceId = useSelector((state: any) => state.devices.selectedId)
  const positions = useSelector((state: any) => state.session.positions)
  const stations = useSelector((state: any) => state.devices.stations)
  const defaultLatitude = usePreference('latitude')
  const defaultLongitude = usePreference('longitude')
  const defaultZoom = usePreference('zoom', 0)

  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    
   // if (selectedDeviceId) {
     // setInitialized(true)
   // } else 
  // if (!initialized) {
      if (defaultLatitude && defaultLongitude) {
        map.jumpTo({
          center: [defaultLongitude, defaultLatitude],
          zoom: defaultZoom,
        })
        setInitialized(true)
      } else {
  
        const coordinates: any = Object.values(positions).map((item: any) => [
          item.longitude,
          item.latitude,
        ])
       // alert(JSON.stringify(coordinates))
          stations.map((item, index) => {
          coordinates.push(
            [item.longitude, item.latitude]
          )
        })

        console.log(coordinates)
        if (coordinates.length > 1) {
          const bounds = coordinates.reduce(
            (bounds, item) => bounds.extend(item),
            new maplibregl.LngLatBounds(coordinates[0], coordinates[1])
          )
          const canvas = map.getCanvas()
          map.fitBounds(bounds, {
            duration: 0,
            padding: Math.min(canvas.width, canvas.height) * 0.1,
          })
          setInitialized(true)
        } else if (coordinates.length) {
          const [individual] = coordinates
          map.jumpTo({
            center: individual,
            zoom: Math.max(map.getZoom(),13 ),
          })
          setInitialized(true)
        }
      }
    //}
  }, [initialized, defaultLatitude, defaultLongitude, defaultZoom,positions])

  return null
}
//
export default MapDefaultCamera
