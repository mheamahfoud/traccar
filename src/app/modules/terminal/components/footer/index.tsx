import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import ArrowLogo from '../../../../../_metronic/assets/car/arrow1.png'
import Logo from '../../../../../_metronic/assets/car/asset-powered-saas.png'

import {useAuth} from '../../../auth'
const Conatainer = styled.div`
  height: 90px;
  width: calc(100% - 400px);
  margin-right: auto;
  background-color: #d9d9d9;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 7rem;
  text-transform: capitalize;
`
const Right = styled.div`
  gap: 20px;
`
const CurrentLocation = styled.div`
  display: flex;
  align-items: center;
  color: white;
  flex-direction: column;
  color: #04615c;
  font-size: 25px;
  direction: ltr;

`

const ArriveTime = styled.div`
  display: flex;
  align-items: center;
  color: white;
  flex-direction: column;
  color: #04615c;
  font-size: 25px;
  direction: ltr;
`

const Icon = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`
const CurrentTime = styled.div`
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #04615c;
  height: 70%;
  font-style: revert;
  align-items: center;
`

const Left = styled.div`
  position: absolute;
  left: 0;
  bottom: 12px;
`
export const Footer = () => {
  const deviceStatus = useSelector((state: any) => state.terminalPath.deviceStatus)
  const terminalInfo =useSelector((state:any) => state.terminalPath.terminalInfo);
  const {currentUser} = useAuth()
  const predectedTime = useSelector((state: any) => state.truckPath.predectedTime)
  const [clockTime, setClockTime] = useState<any>(new Date())
  const [arriveTime, setArriveTime] = useState<any>(new Date())
  useEffect(() => {
    const [hours, minutes, seconds] = currentUser ? currentUser.current_time.split(':') : []
    const initialTime = new Date()
    initialTime.setHours(parseInt(hours))
    initialTime.setMinutes(parseInt(minutes))
    initialTime.setSeconds(parseInt(seconds))
    setClockTime(initialTime)

    
    const intervalId = setInterval(() => {
      setClockTime((prevTime) => new Date(prevTime.getTime() + 1000))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const totalSeconds=deviceStatus?.[0]?.duration ? deviceStatus?.[0]?.duration :0;
    const [hours, minutes, seconds] = currentUser ? currentUser.current_time.split(':') : []
    const minutes1 = Math.floor(totalSeconds / 60);
    const seconds1 = totalSeconds % 60;
    
    const initialTime = new Date()
    initialTime.setHours(parseInt(hours) + 0)
    initialTime.setMinutes(parseInt(minutes) + minutes1)
    initialTime.setSeconds(parseInt(seconds) + seconds1)
    setArriveTime(initialTime)

    const intervalId = setInterval(() => {
      setArriveTime((prevTime) => new Date(prevTime.getTime() + 1000))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [deviceStatus])

  function convertSecondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    return `${minutes} Minutes ${parseInt(remainingSeconds.toLocaleString())} Seconds`;
  }
  return (
    <Conatainer>
      <Right className='d-flex align-items-center'>
        <CurrentLocation>
          <p className='m-auto'>موقعك الحالي</p>
          {/* <p className='m-auto'>5 Minutes, 34 Seconds </p> */}
          {<span >{terminalInfo?.name}</span>}
        </CurrentLocation>
        <Icon>
          <img src={ArrowLogo}></img>
        </Icon>
        <ArriveTime>
          <p className='m-auto'>الوقت المتبقي للوصول</p>
          {/* <p className='m-auto'>5 Minutes, 34 Seconds </p> */}
          {<span >{convertSecondsToTime(deviceStatus?.[0]?.duration)}</span>}
        </ArriveTime>
        <Icon>
          <img src={ArrowLogo}></img>
        </Icon>
        <CurrentTime className={'d-flex flex-column align-items-center'}>
          <div>
            <span className='w-150' style={{position: 'relative', bottom: '5px'}}>
              الوقت الحالي
            </span>
            <span className='w-150'> {clockTime.toLocaleTimeString([], {hour12: false})}</span>
          </div>
          <div>
            <span className='w-150' style={{position: 'relative', bottom: '5px'}}>
              وقت الوصول
            </span>
            <span className='w-150'> {arriveTime.toLocaleTimeString([], {hour12: false})}</span>
          </div>
        </CurrentTime>
      </Right>

      <Left className={'px-4'}>
        <img src={Logo} width={'120px'}></img>
      </Left>
    </Conatainer>
  )
}
