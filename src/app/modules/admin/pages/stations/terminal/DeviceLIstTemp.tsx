import React, { useState } from 'react'
import './style.css'
import DeviceList from './DeviceList'
import { KTIcon } from '../../../../../../_metronic/helpers'
import { useSelector } from 'react-redux'
import TruckPath from '../../../../driver/components/sidebar/TruckPath'
import { formatSeconds } from '../../../../../../reactHelper'
const generateName = (index) => {
  const numbers = ["الأول", "الثاني", " الثالث", "الرابع", "الخامس" , "السادس","السابع","الثامن","التاسع","العاشر"];
  return `الباص ${numbers[index]}`;
};
export const DeviceLIstTemp = ({ devices, keyword, setKeyword }) => {
  const deviceDistance = useSelector((state:any) => state.terminalPath.deviceDistance);
  const [showSerach, setShowSearch] = useState(false);
  // alert(JSON.stringify(devices))
  return (
    <div className='container-list-devices d-flex '>
        {Object.keys(deviceDistance).map((key, index) => {
          return (
            <TruckPath key={index} distance={parseFloat(deviceDistance[key].distance).toFixed(2) + 'km' } duration={formatSeconds(deviceDistance[key].duration)}>
              {generateName(index)}
            </TruckPath>
          );
        })}

    
      {/* <DeviceList devices={devices} /> */}
    </div>
  )
}
