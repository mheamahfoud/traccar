import React from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import ArrowIcon from '../../../../../_metronic/assets/car/arrow.png'
import MapICon from '../../../../../_metronic/assets/car/map-icon.png'
const Conatainer = styled.div`
  display: flex;
  height: 90px;
  background-color: #d9d9d9;
  width: calc(100% - 400px);
  margin-right: auto;
  padding-right: 8rem;
  justify-content: center;
  
`
const Station = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 20px;
 

`

const NextStation = styled.div`
  font-weight: 300;
  color: #04615c;
  font-size: 25px;
  font-weight: 600;
`
const Icon = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
`
const HallName = styled.h1`
  color: white;
  font-weight: 700;
  font-size: 4rem;
  color: #04615c;
`
const Map = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-style: revert;
`

const ImageMap = styled.img`
  left: 20px;
  top: 5px;
  position: absolute;
  width: 92px;
  height: 76px;
  z-index: 19;
`

export const Header = () => {
  const nextTerminal = useSelector((state: any) => state.truckPath.nextTerminal)
  return (
    <Conatainer >
      <Station>
        <NextStation style={{display: 'flex', gap: '20px'}}  >
          <div style={{display: 'flex', flexDirection: 'column',textAlign:'center'}}>
            <div> المحطة القادمة </div>
            <div>Next Station </div>
          </div>

          <Icon>
            <img src={ArrowIcon}></img>
          </Icon>
        </NextStation>

        <HallName>{nextTerminal?.name}</HallName>
      </Station>

      <Map>
        <ImageMap src={MapICon} />
        {/* <span className='arrival-title'>وقت الوصول المتوقع</span>
        <span className='arrival-time'>{predectedTime}</span> */}
      </Map>
    </Conatainer>
  )
}
