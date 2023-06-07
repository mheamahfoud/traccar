import moment from 'moment'
import {FC} from 'react'
import {TripDriverReport} from '../../core/_models'
import {KTIcon} from '../../../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'
type Props = {
  count?: number
}
const CustomCell: FC<Props> = ({count}) => {
  return (
    <div className='d-inline-flex justify-content-center align-items-center'>
      <Link
        className={
          `nav-link text-active-primary me-2 ` +
          (location.pathname === '/driver/account/current-trip' && 'active')
        }
        to={'#'}
      >
        <KTIcon iconName='eye' className='fs-1' />
      </Link>

      <span> {count}</span>
    </div>
  )
}

export {CustomCell}
