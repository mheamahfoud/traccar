import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TruckPath from "./TruckPath";
import { useSelector } from "react-redux";
import { useAuth } from "../../../auth";
import { formatSeconds } from "../../../../../reactHelper";
const Container = styled.div`
  height: 100%;
  width: 100%;
  gap: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  font-family: sans-serif;
`;

const Top = styled.div`
  height: 400px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;

`;

const Bottom = styled.div`
  border-top: 1px solid gray;
  position: relative;
  margin-top: 25px;
  width: 80%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Desc = styled.p`
  font-size: 25px;
  font-weight: 400;
  display: inline-flex;
  gap: 10px;
  color: blue;
`;
const startTime = new Date('2023-03-28T15:04:02');
const generateName = (index) => {
  const numbers = ["الأول", "الثاني", " الثالث", "الرابع", "الخامس" , "السادس","السابع","الثامن","التاسع","العاشر"];
  return `الباص ${numbers[index]}`;
};
export const Sidebar = () => {
 const deviceDistance = useSelector((state:any) => state.terminalPath.deviceDistance);
  const { currentUser } = useAuth();
  const [clockTime, setClockTime] = useState<any>(new Date());
  useEffect(() => {
    const [hours, minutes, seconds] = currentUser? currentUser.current_time.split(":") : [];
    const initialTime = new Date();
    initialTime.setHours(parseInt(hours));
    initialTime.setMinutes(parseInt(minutes));
    initialTime.setSeconds(parseInt(seconds));
    setClockTime(initialTime);

    const intervalId = setInterval(() => {
      setClockTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <Container>
      <Top>

      {Object.keys(deviceDistance).map((key, index) => {
          return (
            <TruckPath key={index} distance={parseFloat(deviceDistance[key].distance).toFixed(2) + 'km' } duration={formatSeconds(deviceDistance[key].duration)}>
              {generateName(index)}
            </TruckPath>
          );
        })}

      </Top>
      <Bottom>
        <Desc>
          <span> الوقت الحالي </span>
          <span style={{ color: "red" }}>
            {clockTime.toLocaleTimeString([], { hour12: false })}
          </span>
        </Desc>
      </Bottom>
    </Container>
  );
};
