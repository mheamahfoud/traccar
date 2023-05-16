
import { QUERIES, ResponeApiCheck, addFieldsToFormData, initialResponseError } from '../../../../../../../_metronic/helpers';
import { initialVehicle } from '../core/_models';
import { create, getVehicleInfo } from '../core/_requests';
import { ListVehiclesPath } from '../../routes/RoutesNames';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomAppBar from '../../../../components/appbar/CustomAppBar';
import { TabWrapper } from '../../../../components/appbar/TabWrapper';
import GeneralInfo from './Tabs/GeneralInfo';
import PhysicalInfo from './Tabs/physicalInfo';
import Insurance from './Tabs/Insurance';
import Purchase from './Tabs/Purchase';
import { useQuery } from 'react-query';
import { ListLoading } from '../../../../components/table/loading/ListLoading';

const View = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id: any = location.state;
    const [data, setData] = useState<any>({});
    const {
        data: dataInfo,
        isLoading
    } = useQuery(
        `${QUERIES.MANAGE_Details_VEHICLE}-${id}`,
        () => {
            return getVehicleInfo(id)
        },

    )
    const [tab, setTab] = useState(0)
    useEffect(() => {
        if (dataInfo) {
            let initData = dataInfo?.data;
            setData({
                ...initData, insurance_number: initData?.meta_data.ins_number, exp_date: initData.meta_data.ins_exp_date
            }
            )
        }
    }, [dataInfo])
    return (
        <>
            <div className='mb-10'>
            </div>
            <div className='card card-custom'>
                <CustomAppBar labels={['generalInfo', 'physicalInfo', 'insurance', 'purchase_info',]} setSelectedTab={setTab} selectedTab={tab} />
                <div className='card-body py-4'>
                    <div className='tab-content pt-3'>
                        <TabWrapper index={0} selectedTab={tab}>
                            <GeneralInfo data={data} />
                        </TabWrapper>

                        <TabWrapper index={1} selectedTab={tab}>
                            <PhysicalInfo data={data} />
                        </TabWrapper>

                        <TabWrapper index={2} selectedTab={tab}>
                            <Insurance data={data} />
                        </TabWrapper>
                        <TabWrapper index={3} selectedTab={tab}>
                            <Purchase data={data} />
                        </TabWrapper>
                        {/* <TabWrapper index={0} selectedTab={tab}>
                            <GeneralInfo />
                        </TabWrapper>
                        <TabWrapper index={1} selectedTab={tab}>
                            <PhysicalInfo />
                        </TabWrapper>


                        <TabWrapper index={2} selectedTab={tab}>
                            <Insurance />
                        </TabWrapper>

                        <TabWrapper index={3} selectedTab={tab}>
                            <Purchase />
                        </TabWrapper> */}



                    </div>
                </div>

            </div>
            {isLoading && <ListLoading />}
        </>





    );
}

export default View;
