import React from "react";
import styled from "styled-components";
import Truck from '../../../../../_metronic/assets/driver/Truck.png';
import Arrive_Truck from '../../../../../_metronic/assets/driver/Arrive_Truck.png';
import { TruckPathBackgrounColors,TruckPathColors } from "../../../../../_metronic/utlis/constants";
const Container = styled.div`
  border-radius: 10px;
  width: 250px;
  padding: 15px 8px;
  font-size: 18px;
  font-weight: 400;
  color: ${(props) => TruckPathColors[props.status]};
  background-color: ${(props) => TruckPathBackgrounColors[props.status]};
  display: flex;
  gap: 5px;
  align-items: center;
  position: relative;
  height: 60px;
`;
const TruckPath = ({ ...props }) => {

    const { status } = props;
    return (
        <Container status={status} >
            <img src={status==0 ? Arrive_Truck : Truck} style={{ width: '18px', height: '18px' }}></img>
            {props?.children}
        </Container>
    )
}

export default TruckPath
