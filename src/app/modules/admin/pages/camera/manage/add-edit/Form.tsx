import {FC} from 'react'
import {useFormikContext} from 'formik'
import SubmitButton from '../../../../components/buttons/SubmitButton'
import ResetButton from '../../../../components/buttons/ResetButton'
import {useIntl} from 'react-intl'
import FormikInputLabel from '../../../../components/formik/FormikInputLabel'
import { useQuery } from 'react-query'
import { QUERIES } from '../../../../../../../_metronic/helpers'
import { getVehicleList } from '../../../core/commonRequests'
import FormikSelectInput from '../../../../components/formik/FormikSelectInput'
import { Spinner } from '../../../../../../../_metronic/helpers/components/Spinner'

const Form: FC = () => {

  const intel = useIntl();
  //#region api
  const {
      data: vehicleList,
  } = useQuery(
      `${QUERIES.ALL_Vehicle_LIST_VALUES}`,
      () => {
          return getVehicleList()
      },
      { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  )

  const {handleSubmit, resetForm, isSubmitting, isValid, touched} = useFormikContext()
  return (
    <>
      {vehicleList && (
        <form className='form' onSubmit={handleSubmit} noValidate >
          {/* begin::Scroll */}
          <div className='d-flex flex-column scroll-y me-n7 pe-7'>
            <div className='row'>
              <div className='col-md-6 col-sm-12'>
                <FormikSelectInput
                  title={intel.formatMessage({id: 'vehicle'})}
                  name={'vehicles_id'}
                  isRequired={true}
                  options={vehicleList || []}
                />
              </div>

              <div className='col-md-6 col-sm-12'>
                <FormikInputLabel
                  title={intel.formatMessage({id: 'code'})}
                  name={'code'}
                  isRequired={false}
                />
              </div>
              <div className='col-md-6 col-sm-12'>
                <FormikInputLabel
                  title={intel.formatMessage({id: 'link'})}
                  name={'link'}
                  isRequired={false}
                />
              </div>
            </div>
          </div>
          {/* begin::Actions */}
          <div className='text-center pt-15'>
            <ResetButton resetForm={resetForm} isSubmitting={isSubmitting} />
            <SubmitButton isSubmitting={isSubmitting} isValid={isValid} touched={touched} />
          </div>
          {/* end::Actions */}
        </form>
      )}
      {(isSubmitting ||  !vehicleList) && <Spinner />}
    </>
  )
}

export {Form}
