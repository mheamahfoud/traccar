import moment from 'moment'
import { FC } from 'react'
import { ShiftDriverReport } from '../../core/_models'
import { KTIcon } from '../../../../../../../../_metronic/helpers'

type Props = {
  count?: number
}
const CustomCell: FC<Props> = ({ count }) => {
 return (
    <div>
         <KTIcon iconName='eye-slash' className='fs-1' /> {count}
      
    </div>
 )
}



export { CustomCell }
