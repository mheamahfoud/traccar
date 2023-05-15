
import { ResponeApiCheck, addFieldsToFormData, initialResponseError } from '../../../../../../../_metronic/helpers';
import { initialVehicle } from '../core/_models';
import { create } from '../core/_requests';
import { ListVehiclesPath } from '../../routes/RoutesNames';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomAppBar from '../../../../components/appbar/CustomAppBar';
import { TabWrapper } from '../../../../components/appbar/TabWrapper';
import GeneralInfo from './Tabs/GeneralInfo';
import PhysicalInfo from './Tabs/physicalInfo';
import Insurance from './Tabs/Insurance';
import Purchase from './Tabs/Purchase';

const View = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState<any>(location.state);
    const [tab, setTab] = useState(0)
    useEffect(() => {
        setData({
            ...data, insurance_number: data.meta_data.ins_number, exp_date: data.meta_data.ins_exp_date
        }
        )
    }, [])
    return (
        <>
            <div className='mb-10'>
            </div>
            <div className='card card-custom'>
                <CustomAppBar labels={['generalInfo', 'physicalInfo', 'insurance', 'purchase_info',]} setSelectedTab={setTab} selectedTab={tab} />
                <div className='card-body py-4'>
                    <div className='tab-content pt-3'>
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
        </>





    );
}

export default View;
