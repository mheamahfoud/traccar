import {useEffect, useState} from 'react'
import {KTIcon, formatTime} from '../../../../../../../_metronic/helpers'
import {CustomButton} from '../../../../../../../_metronic/helpers/components/buttons/CustomButton'
import {useSession} from '../../../core/provider'

const Header = () => {
  const {is_running, running_time} = useSession()
  const [counter, setCounter] = useState(running_time)

  useEffect(() => {
    if (is_running) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1000)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [is_running])


  return (
    <div className='card-header border-0 pt-6 d-flex justify-content-evenly align-items-center'>
      <div>
        <p className='text-center my-1 fs-lg-1  fs-md-1 fs-sm-4 fw-bold' style={{color: '#183f72'}}>
         {formatTime(counter)}
        </p>
      </div>
      <div className='d-flex gap-2'>
        <CustomButton title='start' handleClick={() => {}} disabled={is_running}>
          <i className='bi bi-play fs-2'></i>
        </CustomButton>
        <CustomButton title='stop' handleClick={() => {}}>
          <i className='bi bi-pause fs-2'></i>
        </CustomButton>
      </div>
    </div>
  )
}

export {Header}
