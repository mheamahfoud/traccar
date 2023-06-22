import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { QUERIES, isNotEmpty } from '../../../../../../../_metronic/helpers';
import { getCameraToVehicle } from '../core/_requests';
import { Spinner } from '../../../../../../../_metronic/helpers/components/Spinner';
import VedioPlayer from '../../../vedio-stream/components/LiveStream';
import { CameraShow } from '../core/_models';
import SplitStyle from './SplitStyle';
import SingleStyle from './SingleStyle';

const ViewCameraVehicle: FC = () => {
    const location = useLocation();
    const id: any = location.state;
    const [displayStyle, setDisplayStyle] = useState(CameraShow.Four); // Default display style is 'four'

    const handleStyleChange = (style) => {
        setDisplayStyle(style);
    };
    const {
        data: data,
    } = useQuery(
        `${QUERIES.CAMERA_VEHICLE_LIST_VALUES}`,
        () => {
            return getCameraToVehicle(id)
        },
        { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false, enabled: isNotEmpty(id) }
    )
    return (
        <>
            {
                data && (

                    <div className="container">
                        <header>
                            <button className={`btn ${displayStyle == CameraShow.Four ? 'btn-danger' : 'btn-primary'} mx-1`} onClick={() => handleStyleChange(CameraShow.Four)}>Option 1</button>
                            <button className={`btn ${displayStyle == CameraShow.Three ? 'btn-danger' : 'btn-primary'}  mx-1`} onClick={() => handleStyleChange(CameraShow.Three)}>Option 2</button>
                            <button className={`btn ${displayStyle == CameraShow.Split ? 'btn-danger' : 'btn-primary'}  mx-1`} onClick={() => handleStyleChange(CameraShow.Split)}>Option 3</button>
                            <button className={`btn ${displayStyle == CameraShow.Single ? 'btn-danger' : 'btn-primary'}  mx-1` } onClick={() => handleStyleChange(CameraShow.Single)}>Option 4</button>
                        </header>
                        <div className="row d-flex">

                            {displayStyle === CameraShow.Four && (
                                <>
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <div className="col-md-3 ">
                                                    < VedioPlayer title={`camera ${index}`} />
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            )}


                            {displayStyle === CameraShow.Three && (
                                <>
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <div className="col-md-4">
                                                    < VedioPlayer title={`camera ${index}`} />
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            )}


                            {displayStyle === CameraShow.Split && (
                                <SplitStyle data={data} />
                            )}


                            {displayStyle === CameraShow.Single && (
                                <SingleStyle />
                            )}
                        </div>
                    </div>



                )
            }
            {
                !data && <Spinner />
            }
        </>
    );
}

export default ViewCameraVehicle;
