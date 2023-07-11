import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Left } from './Left'
import { Right } from './Right'
import { useSelector } from 'react-redux'
import ArrowLogo from '../../../../../_metronic/assets/car/arrow1.png'
import Logo from '../../../../../_metronic/assets/car/Asset-3powered-saas.png'

import { useAuth } from '../../../auth'
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
  
`
const ArriveTime = styled.div`
  display: flex;
  align-items: center;
  color: white;
  flex-direction: column;
  color: #04615c;
  font-size: 25px;
  font-weight: 600;
  direction: ltr;
`
const CurrentTime = styled.div`
  color: white;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #04615c;
  height: 70%;
  font-style: revert;
`
const Icon = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
`
const CurrentTime1 = styled.div`
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #04615c;
  height: 70%;
  font-style: revert;
  gap: 20px;
  align-items: center;
`
export const Footer = () => {
  const { currentUser } = useAuth()
  const predectedTime = useSelector((state: any) => state.truckPath.predectedTime)
  const [clockTime, setClockTime] = useState<any>(new Date())
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
  const convertTimeFormat = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    const formattedTime = `${minutes} minutes, ${seconds} seconds`;
    return formattedTime;
  }
  return (
    <Conatainer>
      <div className='d-flex align-items-center'>
        <ArriveTime >
          <p className='m-auto'>الوقت المتوقع للوصول</p>
          {/* <p className='m-auto'>5 Minutes, 34 Seconds </p> */}
          {<span className='arrival-time'>{convertTimeFormat(predectedTime)}</span>}
        </ArriveTime>
        <Icon>
          <img src={ArrowLogo}></img>
        </Icon>
        <CurrentTime1>
          <span className='w-150'>الوقت الحالي</span>
          <span className='w-150'> {clockTime.toLocaleTimeString([], { hour12: false })}</span>
        </CurrentTime1>
      </div>

      <CurrentTime className={"px-4"} style={{position:'absolute' , left:'0'}} >
        <img src={Logo}  style={{marginRight:'auto'}}  width={'120px'}></img>
      </CurrentTime>
    </Conatainer>
  )
}
