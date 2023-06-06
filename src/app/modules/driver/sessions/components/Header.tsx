import React, { useEffect, useState } from 'react'
import {useSession} from '../core/provider'
import { formatTime } from '../../../../../_metronic/helpers';

export const HeaderSession = () => {
  const {vehicles_name,total_time} = useSession();
  const [counter, setCounter] = useState(total_time)
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1000); // Increase the counter by 1000 milliseconds (1 second)
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className='card-body py-4'>
      <div>
        {vehicles_name && (
          <p className='text-center my-1 fs-md-2 fs-sm-1 fw-bold'>License Plate :{vehicles_name}</p>
        )}
        <button className='btn btn-primary me-5 w-100'>
          <span className='fs-md-2 fs-sm-1'>{formatTime(counter)}</span>
        </button>
      </div>
    </div>
  )
}
