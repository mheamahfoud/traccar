import React from 'react'
import './style.css'
import DeviceList from './DeviceList'
import { KTIcon } from '../../../../../../_metronic/helpers'

export const DeviceLIstTemp = ({devices,keyword,setKeyword}) => {
 // alert(JSON.stringify(devices))
  return (
    <div className='container-list-devices d-flex '>
      <div className='card-title'>
        <div className='d-flex align-items-center position-relative my-1'>
          {<KTIcon iconName='magnifier' className='fs-1 position-absolute ms-6' />}
          <input
            type='text'
            data-kt-user-table-filter='search'
            className='form-control form-control-solid w-250px ps-14'
            placeholder='Search user'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
      <DeviceList devices={devices} />
    </div>
  )
}
