import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { QUERIES, isNotEmpty } from '../../../../../../../_metronic/helpers';
import { getCameraToVehicle } from '../core/_requests';
import { Spinner } from '../../../../../../../_metronic/helpers/components/Spinner';
import VedioPlayer from '../../../vedio-stream/components/LiveStream';

const VeiewCameraVehicle: FC = () => {
    const location = useLocation();
    const id: any = location.state;
    const [displayStyle, setDisplayStyle] = useState('four'); // Default display style is 'four'

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

                    // <div className='d-flex flex-wrap justify-content-evenly'>
                    //     {
                    //         data.map((item, index) => {
                    //             return (
                    //                 < VedioPlayer title={`camera ${index}`} />
                    //             )
                    //         })
                    //     }
                    // </div>
                    <div className="container">
                        <header>
                            {/* Header content */}
                            <button onClick={() => handleStyleChange('four')}>Option 1</button>
                            <button onClick={() => handleStyleChange('three')}>Option 2</button>
                            <button onClick={() => handleStyleChange('split')}>Option 3</button>
                            <button onClick={() => handleStyleChange('single')}>Option 4</button>
                        </header>
                        <div className="row d-flex">

                            {displayStyle === 'four' && (
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


                            {displayStyle === 'three' && (
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


                            {displayStyle === 'split' && (
                                <>
                                    <div className="col-md-10">
                                        < VedioPlayer title={`camera ${1}`} />
                                    </div>
                                    <div className="col-md-2">
                                        <div className="row">
                                            <>
                                                {
                                                    data.map((item, index) => {
                                                        return (
                                                            <div className="col-md-12">
                                                                < VedioPlayer title={`camera ${index}`} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </>
                                        </div>
                                    </div>
                                </>
                            )}


                            {displayStyle === 'single' && (
                                <div className="col-md-12">
                                    <div>
                                        < VedioPlayer title={`camera ${1}`} />
                                    </div>
                                </div>
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

export default VeiewCameraVehicle;
