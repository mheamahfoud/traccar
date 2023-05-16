import { FC, useEffect, useState } from 'react'
import { useFormikContext } from 'formik'
import { ListLoading } from '../../../../components/table/loading/ListLoading'
import SubmitButton from '../../../../components/buttons/SubmitButton'
import ResetButton from '../../../../components/buttons/ResetButton'
import CustomAppBar from '../../../../components/appbar/CustomAppBar'
import GeneralInfo from './Tabs/GeneralInfo'
import { TabWrapper } from '../../../../components/appbar/TabWrapper'
import Insurance from './Tabs/Insurance'
import Purchase from './Tabs/Purchase'
import PhysicalInfo from './Tabs/physicalInfo'

const Form: FC = () => {
    const [tab, setTab] = useState(0)
    const { handleSubmit, resetForm, isSubmitting, isValid, touched } = useFormikContext();
    return (
        <>
            <div className='mb-10'>
            </div>
            <div className='card card-custom'>
                <CustomAppBar labels={['generalInfo','physicalInfo', 'insurance', 'purchase_info',]} setSelectedTab={setTab} selectedTab={tab} />
                <form className='form' onSubmit={handleSubmit} noValidate encType="multipart/form-data">
                    <div className='card-body py-4'>
                        <div className='tab-content pt-3'>
                            <TabWrapper index={0} selectedTab={tab}>
                                <GeneralInfo />
                            </TabWrapper>
                            <TabWrapper index={1} selectedTab={tab}>
                                <PhysicalInfo />
                            </TabWrapper>


                            <TabWrapper index={2} selectedTab={tab}>
                                <Insurance />
                            </TabWrapper>

                            <TabWrapper index={3} selectedTab={tab}>
                                <Purchase/>
                            </TabWrapper>

                            {/* begin::Actions */}
                            <div className='text-center pt-15'>
                                <ResetButton
                                    resetForm={resetForm}
                                    isSubmitting={isSubmitting}
                                />
                                <SubmitButton
                                    isSubmitting={isSubmitting}
                                    isValid={true}
                                    touched={touched}
                                />
                            </div>
                            {/* end::Actions */}

                        </div>
                    </div>
                </form>
                {(isSubmitting) && <ListLoading />}
            </div>
        </>

    )
}

export { Form }





