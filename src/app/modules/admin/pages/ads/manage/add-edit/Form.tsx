import {FC} from 'react'
import {useFormikContext} from 'formik'
import {ListLoading} from '../../../../components/table/loading/ListLoading'
import SubmitButton from '../../../../components/buttons/SubmitButton'
import ResetButton from '../../../../components/buttons/ResetButton'
import {useIntl} from 'react-intl'
import FormikInputLabel from '../../../../components/formik/FormikInputLabel'
import FormikSelectInput from '../../../../components/formik/FormikSelectInput'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {getStationList} from '../../../vehicles/core/_requests'
import {useQuery} from 'react-query'
import FormikFile from '../../../../components/formik/FormikFile'
import { FieldLink } from '../../../../../../../_metronic/utlis/formik'
import FormikAudio from '../../../../components/formik/FormikAudio'

const Form: FC = () => {

  const intel = useIntl()

  const {handleSubmit, resetForm, isSubmitting, isValid, touched} = useFormikContext()
  return (
    <>
      {(
        <form className='form' onSubmit={handleSubmit} noValidate encType="multipart/form-data">
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
                <FormikInputLabel
                  title={intel.formatMessage({id: 'period'})}
                  name={'period'}
                  isRequired={false}
                  type='number'
                />
              </div>

              <div className='col-md-6 col-sm-12'>
                <FormikAudio
                  title={intel.formatMessage({id: 'link'})}
                  name={'link'}
                  isRequired={false}
                  fieldFile={FieldLink}
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
      {(isSubmitting) && <ListLoading />}
    </>
  )
}

export {Form}
