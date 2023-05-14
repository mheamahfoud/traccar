import { FC} from 'react'
import { useFormikContext } from 'formik'
import { ListLoading } from '../../../../components/table/loading/ListLoading'
import SubmitButton from '../../../../components/buttons/SubmitButton'
import ResetButton from '../../../../components/buttons/ResetButton'
import { useIntl } from 'react-intl'
import FormikInputLabel from '../../../../components/formik/FormikInputLabel'
import FormikFile from '../../../../components/formik/FormikFile'
import FormikSwitch from '../../../../components/formik/FormikCheckBox'


const Form: FC = () => {
    const intel = useIntl()
    const { handleSubmit, resetForm, isSubmitting, isValid, touched } = useFormikContext();

    return (
        <>
            <form className='form' onSubmit={handleSubmit} noValidate>
                {/* begin::Scroll */}
                <div
                    className='d-flex flex-column scroll-y me-n7 pe-7'
                >
                    <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'display_name' })}
                                name={'displayname'}
                                isRequired={true}
                            />
                        </div>
                        <div className='col-md-6 col-sm-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'vehicle_type' })}
                                name={'vehicletype'}
                                isRequired={true}
                            />
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'no_seats' })}
                                name={'seats'}
                                type='number'
                                isRequired={true}
                            />
                        </div>
                        <div className='col-md-6 col-sm-12'>
                            <FormikSwitch
                                title={intel.formatMessage({ id: 'is_enable' })}
                                name={'isenable'}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                            <FormikFile
                                title={intel.formatMessage({ id: 'icon' })}
                                name={'icon'}
                                isRequired={false}

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
