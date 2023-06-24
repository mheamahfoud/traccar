import {useSelector} from 'react-redux'
import {formatSeconds} from '../../../../../../reactHelper'
import TruckPath from '../../../../terminal/components/sidebar/TruckPath'
import styled from 'styled-components'
const generateName = (index) => {
  const numbers = [
    'الأول',
    'الثاني',
    ' الثالث',
    'الرابع',
    'الخامس',
    'السادس',
    'السابع',
    'الثامن',
    'التاسع',
    'العاشر',
  ]
  return `الباص ${numbers[index]}`
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  z-index: 5000;
  background: white;
  align-items: center;
  gap: 20px;
  padding: 0 10px;
  overflow: auto;
`
export const BusListWrapper = ({devices, keyword, setKeyword}) => {
  const deviceDistance = useSelector((state: any) => state.terminalPath.deviceDistance)
  return (
    <Container className='d-flex '>
      {Object.keys(deviceDistance).map((key, index) => {
        return (
          <TruckPath
            key={index}
            distance={parseFloat(deviceDistance[key].distance).toFixed(2) + 'km'}
            duration={formatSeconds(deviceDistance[key].duration)}
          >
            {/* //   {generateName(index)} */}
            {deviceDistance[key].name}
          </TruckPath>
        )
      })}
    </Container>
  )
}
