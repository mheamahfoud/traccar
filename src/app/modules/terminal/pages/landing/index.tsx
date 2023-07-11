import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bus from "../../../../../_metronic/assets/car/Bus.jpg"
import "./style.css";
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
const Landing = () => {
  const navigate = useNavigate();
  const landingTime = 2
  /* useSelector(
    (state) => state.periodTimePage.landingTime
  );*/
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/terminal/map");
    }, landingTime * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [landingTime]);




  return (
    <div className="image-container-driver">
      <img src={Bus} />

    </div>

  );
};

export default Landing;
