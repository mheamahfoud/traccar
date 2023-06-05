import React, { useState } from 'react'
import './style.css'
import DeviceList from './DeviceList'
import { KTIcon } from '../../../../../../_metronic/helpers'
import { useSelector } from 'react-redux'
import TruckPath from '../../../../car/components/sidebar/TruckPath'

export const DeviceLIstTemp = ({ devices, keyword, setKeyword }) => {
  const terminals = useSelector((state: any) => state.truckPath.terminals);

  const [showSerach, setShowSearch] = useState(false);
  // alert(JSON.stringify(devices))
  return (
    <div className='container-list-devices d-flex '>
      {terminals.map((item, index) => {
        return (
          <TruckPath key={index} status={item.status}>
            {item.name}
          </TruckPath>
        );
      })}
      {/* <DeviceList devices={devices} /> */}
    </div>
  )
}
