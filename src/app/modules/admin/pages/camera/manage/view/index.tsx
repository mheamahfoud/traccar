import { FC } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { QUERIES, isNotEmpty } from '../../../../../../../_metronic/helpers';
import { getCameraToVehicle } from '../core/_requests';
import { Spinner } from '../../../../../../../_metronic/helpers/components/Spinner';
import VedioPlayer from '../../../vedio-stream/components/LiveStream';

const VeiewCameraVehicle: FC = () => {
    const location = useLocation();
    const id: any = location.state;
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
                data && (<div className='d-flex flex-wrap justify-content-evenly'>
                    {
                        data.map((item, index) => {
                            return (
                                < VedioPlayer title={`camera ${index}`} />
                            )
                        })
                    }
                </div>)
            }
            {
                !data && <Spinner />
            }
        </>
    );
}

export default VeiewCameraVehicle;
