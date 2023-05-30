import {FC, useState} from 'react'
import {useFormikContext} from 'formik'
import {ListLoading} from '../../../../components/table/loading/ListLoading'
import SubmitButton from '../../../../components/buttons/SubmitButton'
import ResetButton from '../../../../components/buttons/ResetButton'
import {useIntl} from 'react-intl'
import FormikInputLabel from '../../../../components/formik/FormikInputLabel'
import FormikSelectInput from '../../../../components/formik/FormikSelectInput'
import {useQuery} from 'react-query'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {getCountryList, getVehicleList} from '../../../core/commonRequests'
import FormikSwitch from '../../../../components/formik/FormikCheckBox'

const Form: FC = () => {
  const [enableApi, setEnableApi] = useState<boolean>(true)
  //#region api
  const {data: countrList} = useQuery(
    `${QUERIES.ALL_Vehicle_LIST_VALUES}`,
    () => {
      return getVehicleList()
    },
    {
      enabled: enableApi,
    }
  )
  const intel = useIntl()
  const {handleSubmit, resetForm, isSubmitting, isValid, touched} = useFormikContext()
  return (
    <>
      <form className='form' onSubmit={handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div className='d-flex flex-column scroll-y me-n7 pe-7'>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <FormikInputLabel
                title={intel.formatMessage({id: 'name'})}
                name={'name'}
                isRequired={true}
              />
            </div>
            <div className='col-md-6 col-sm-12'>
              <FormikSelectInput
                title={intel.formatMessage({id: 'ads'})}
                name={'ads_id'}
                isRequired={true}
                options={countrList || []}
              />
            </div>

            <div className='col-md-6 col-sm-12'>
              <FormikSwitch title={intel.formatMessage({id: 'maintenance'})} name={'maintenance'} />
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
      {isSubmitting && <ListLoading />}
    </>
  )
}

export {Form}
