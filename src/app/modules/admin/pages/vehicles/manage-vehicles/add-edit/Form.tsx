import { FC } from 'react'
import { useFormikContext } from 'formik'
import { ListLoading } from '../../../../components/table/loading/ListLoading'
import SubmitButton from '../../../../components/buttons/SubmitButton'
import ResetButton from '../../../../components/buttons/ResetButton'
import { useIntl } from 'react-intl'
import FormikInputLabel from '../../../../components/formik/FormikInputLabel'
import FormikFile from '../../../../components/formik/FormikFile'
import FormikSwitch from '../../../../components/formik/FormikCheckBox'
import FormikSelectInput from '../../../../components/formik/FormikSelectInput'
import { useQuery } from 'react-query'
import { getColorList, getEngineTypeList, getGroupList, getMakerList, getModelList, getTypeList } from '../../core/_requests'
import { QUERIES } from '../../../../../../../_metronic/helpers'


const Form: FC = () => {
    const intel = useIntl()
    const { handleSubmit, resetForm, isSubmitting, isValid, touched } = useFormikContext();
    const {
        data: makerList,
    } = useQuery(
        `${QUERIES.VEHICLES_MAKER_LIST_VALUES}`,
        () => {
            return getMakerList()
        },

    )
    const {
        data: modelList,
    } = useQuery(
        `${QUERIES.VEHICLES_MODEL_LIST_VALUES}`,
        () => {
            return getModelList()
        },

    )
    const {
        data: typeList,
    } = useQuery(
        `${QUERIES.VEHICLES_TYPE_LIST_VALUES}`,
        () => {
            return getTypeList()
        },

    )
    const {
        data: colorList,
    } = useQuery(
        `${QUERIES.VEHICLES_COLOR_LIST_VALUES}`,
        () => {
            return getColorList()
        },

    )
    const {
        data: groupList,
    } = useQuery(
        `${QUERIES.VEHICLES_GROUP_LIST_VALUES}`,
        () => {
            return getGroupList()
        },

    )
    const {
        data: engineTypeList,
    } = useQuery(
        `${QUERIES.VEHICLES_ENGINE_TYPE_LIST_VALUES}`,
        () => {
            return getEngineTypeList()
        },

    )

    return (
        <>
            <form className='form' onSubmit={handleSubmit} noValidate>
                {/* begin::Scroll */}
                <div
                    className='d-flex flex-column scroll-y me-n7 pe-7'
                >
                    <div className='row'>
                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikSelectInput
                                title={intel.formatMessage({ id: 'make' })}
                                name={'make_id'}
                                isRequired={true}
                                options={makerList?.data ||  []}
                            />
                        </div>
                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikSelectInput
                                title={intel.formatMessage({ id: 'model' })}
                                name={'model_id'}
                                isRequired={true}
                                options={modelList?.data ||  []}
                            />
                        </div>

                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikSelectInput
                                title={intel.formatMessage({ id: 'color' })}
                                name={'color_id'}
                                isRequired={true}
                                options={colorList?.data ||  []}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikSelectInput
                                title={intel.formatMessage({ id: 'engine_type' })}
                                name={'engine_type'}
                                isRequired={true}
                                options={engineTypeList?.data ||  []}
                            />
                        </div>
                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikSelectInput
                                title={intel.formatMessage({ id: 'type' })}
                                name={'type_id'}
                                isRequired={true}
                                options={typeList?.data ||  []}
                            />
                        </div>

                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikSelectInput
                                title={intel.formatMessage({ id: 'group' })}
                                name={'group_id'}
                                isRequired={true}
                                options={groupList?.data ||  []}
                            />
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'horse_power' })}
                                name={'horse_power'}
                                isRequired={true}
                                type='number'
                            />
                        </div>
                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'year' })}
                                name={'year'}
                                isRequired={true}
                                type='number'
                            />
                        </div>

                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'vin' })}
                                name={'vin'}
                                isRequired={true}
                            />
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'average_km_l' })}
                                name={'horse_power'}
                                isRequired={true}
                                type='number'
                            />
                        </div>

                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'license_plate' })}
                                name={'license_plate'}
                                isRequired={true}

                            />
                        </div>


                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'int_mileage' })}
                                name={'int_mileage'}
                                isRequired={false}
                                type='number'
                            />
                        </div>
                    </div>




                    <div className='row'>
                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'gps_code' })}
                                name={'gps_code'}
                                isRequired={true}

                            />
                        </div>

                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'lic_exp_date' })}
                                name={'lic_exp_date'}
                                isRequired={false}
                                type={'date'}
                            />
                        </div>


                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'reg_exp_date' })}
                                name={'reg_exp_date'}
                                isRequired={false}
                                type={'date'}

                            />
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikFile
                                title={intel.formatMessage({ id: 'vehicle_image' })}
                                name={'vehicle_image'}
                                isRequired={false}

                            />
                        </div>

                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <FormikSwitch
                                title={intel.formatMessage({ id: 'in_service' })}
                                name={'in_service'}
                            />
                        </div>



                    </div>

                </div>

                {/* begin::Actions */}
                <div className='text-center pt-15'>
                    <ResetButton
                        resetForm={resetForm}
                        isSubmitting={isSubmitting}
                    />
                    <SubmitButton
                        isSubmitting={isSubmitting}
                        isValid={isValid}
                        touched={touched}
                    />
                </div>
                {/* end::Actions */}
            </form>
            {(isSubmitting) && <ListLoading />}
        </>
    )
}

export { Form }
