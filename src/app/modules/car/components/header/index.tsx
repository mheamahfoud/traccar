import React from "react";
import styled from 'styled-components'
import { Left } from "./Left";
import { Right } from "./Right";

const Conatainer = styled.div`
  display: flex;
  height: 120px;
  width: 100%;
  background-color: #d9d9d9;
  padding-bottom: 8px;
 
`;


export const Header = () => {
  return (
    <Conatainer>
      {/* <Left />
      <Right /> */}
    </Conatainer>
  );
};
