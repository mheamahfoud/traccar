import React, { useState } from 'react'
import './style.css'
import DeviceList from './DeviceList'
import { KTIcon } from '../../../../../../_metronic/helpers'

export const DeviceLIstTemp = ({ devices, keyword, setKeyword }) => {
  const [showSerach, setShowSearch] = useState(false);
  // alert(JSON.stringify(devices))
  return (
    <div className='container-list-devices1 d-flex '>
      <div className='card-title'>
        {showSerach && <div className='d-flex align-items-center position-relative my-1'>
          <div className='fs-1 position-absolute ms-6'>
            <KTIcon iconName='magnifier' className='fs-1' />
          </div>

          <div className='fs-1 position-absolute me-6' style={{ cursor: 'pointer',right:'0' }} onClick={
            () => {
              setKeyword('')
              setShowSearch(showSerach => !showSerach)
            }
          }>
            <KTIcon iconName='trash' className='fs-1' />
          </div>

          <input
            type='text'
            data-kt-user-table-filter='search'
            className='form-control form-control-solid w-250px ps-14'
            placeholder='Search user'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}

          />
        </div>}
        {!showSerach &&
          <div className='d-flex align-items-center position-relative my-1' style={{ cursor: 'pointer' }} onClick={
            () => {
              setShowSearch(showSerach => !showSerach)
            }
          }>
            {<KTIcon iconName='magnifier' className='fs-1 ms-6' />}
          </div>
        }
      </div>
      <DeviceList devices={devices} />
    </div>
  )
}
