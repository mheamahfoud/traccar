import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TruckPath from "./TruckPath";
import { useSelector } from "react-redux";
import { useAuth } from "../../../auth";
import Logo from "../../../../../_metronic/assets/driver/1KKIA-logo.png"
import back2 from "../../../../../_metronic/assets/driver/back2.png"
const Wrapper = styled.div`
  position: fixed;
  top: 0;
 background-image: url(${back2});
background-size: cover;
background-repeat: no-repeat;
  width: 400px;
  height: 100vh;
  right: 0;
  z-index: 2;



`;
const Container = styled.div`
  height: 100%;
  width: 100%;

  font-family: sans-serif;

`;

const Top = styled.div`
  height: 400px;


`;

const Bottom = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ImageLogo = styled.img`
  background-size: cover;
  object-fit: fill;
  height: 100px;
  width: 100%;
`;
const Desc = styled.p`
  font-size: 25px;
  font-weight: 400;
  display: inline-flex;
  gap: 10px;
  color: blue;
`;
const startTime = new Date('2023-03-28T15:04:02');

export const Sidebar = () => {
  const terminals = useSelector((state: any) => state.truckPath.terminals);
  const { currentUser } = useAuth();
  const [clockTime, setClockTime] = useState<any>(new Date());
  useEffect(() => {
    const [hours, minutes, seconds] = currentUser ? currentUser.current_time.split(":") : [];
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
    <Wrapper className="">
      <Container className="d-flex flex-column align-items-center " >
        <Top >
          {/* <ImageLogo src={Logo} /> */}
          {/* {terminals.map((item, index) => {
            return (
              <TruckPath key={index} status={item.status}>
                {item.name}
              </TruckPath>
            );
          })} */}
        </Top>
        <Bottom className="d-flex flex-column gap-5 align-items-center py-6">
          {terminals.map((item, index) => {
            return (
              <TruckPath key={index} status={item.status}>
                {item.name}
              </TruckPath>
            );
          })}
          {/* <Desc>
            <span> الوقت الحالي </span>
            <span style={{ color: "red" }}>
              {clockTime.toLocaleTimeString([], { hour12: false })}
            </span>
          </Desc> */}
        </Bottom>
      </Container>
    </Wrapper>
  );
};
