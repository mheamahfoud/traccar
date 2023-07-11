import React from "react";
import styled from "styled-components";
import Arrive_Truck from '../../../../../_metronic/assets/car/Arrive_Truck.png';
import { TruckPathBackgrounColors,TruckPathColors } from "../../../../../_metronic/utlis/constants";
interface Props {
    distance:number
  }

const Container = styled.div<Props>`
  border-radius: 10px;
  width: 250px;
  padding: 15px 8px;
  font-size: 18px;
  font-weight: 400;
  color: ${(props) => TruckPathColors[0]};
  background-color: ${(props) => props.distance < 800 ? TruckPathBackgrounColors[0] :TruckPathBackgrounColors[1]};
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 60px;
`;
const TruckPath = ({ ...props }) => {

    const { distance ,duration} = props;
    return (
        <Container status={status} distance={distance} >
            <div style={{display:'flex', justifyContent:'center' ,alignItems:'center' ,gap:'4px'}}>
                <img src={ Arrive_Truck} style={{ width: '18px', height: '18px' }}></img>
                {props?.children}
            </div>
            {/* <span style={{marginLeft:'8px'}}>{distance}</span> */}
            <span style={{marginLeft:'8px'}}>{duration}</span>
        </Container>
    )
}

export default TruckPath
