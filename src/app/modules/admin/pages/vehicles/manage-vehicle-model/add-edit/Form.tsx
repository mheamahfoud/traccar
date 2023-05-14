import { FC } from 'react'
import { useFormikContext } from 'formik'
import { ListLoading } from '../../../../components/table/loading/ListLoading'
import SubmitButton from '../../../../components/buttons/SubmitButton'
import ResetButton from '../../../../components/buttons/ResetButton'
import { useIntl } from 'react-intl'
import FormikInputLabel from '../../../../components/formik/FormikInputLabel'
import FormikSelectInput from '../../../../components/formik/FormikSelectInput'
import { useQuery } from 'react-query'
import { QUERIES } from '../../../../../../../_metronic/helpers'
import { getMakerList } from '../../core/_requests'
import FormikInputDate from '../../../../components/formik/FormikInputDate'



const Form: FC = () => {
    const intel = useIntl()
    const {
        data: makerList,
      } = useQuery(
        `${QUERIES.VEHICLES_MAKER_LIST_VALUES}`,
        () => {
          return getMakerList()
        },
  
      )
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
                            <FormikSelectInput
                                title={intel.formatMessage({ id: 'make' })}
                                name={'make_id'}
                                isRequired={true}
                                options={makerList?.data || []}
                            />
                        </div>
                        <div className='col-md-6 col-sm-12'>
                            <FormikInputLabel
                                title={intel.formatMessage({ id: 'model' })}
                                name={'model'}
                                isRequired={true}
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
