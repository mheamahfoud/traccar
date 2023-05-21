import {FC} from 'react'
import {useFormikContext} from 'formik'
import {ListLoading} from '../../../../components/table/loading/ListLoading'
import SubmitButton from '../../../../components/buttons/SubmitButton'
import ResetButton from '../../../../components/buttons/ResetButton'
import {useIntl} from 'react-intl'
import FormikInputLabel from '../../../../components/formik/FormikInputLabel'
import {useQuery} from 'react-query'
import {QUERIES} from '../../../../../../../_metronic/helpers'
import {getRoleList} from '../core/_requests'
import FormikSwitch from '../../../../components/formik/FormikCheckBox'
import { RoleResponse } from '../core/_models'
interface Props {
    roleList :RoleResponse
}
const FormPermission: FC<Props> = ({roleList}) => {
  const intel = useIntl()
  const {handleSubmit, resetForm, isSubmitting, isValid, touched} = useFormikContext()

  return (
    <>
      <form className='form' onSubmit={handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div className='d-flex flex-column scroll-y me-n7 pe-7'>
          <div className='row'>
            {roleList.map((item) => {
              return (
                <div className='col-md-12 col-sm-12'>
                  <FormikSwitch
                    title={item?.name}
                    name={item.id.toString()}
                  />
                </div>
              )
            })}
          </div>
        </div>
        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <ResetButton resetForm={resetForm} isSubmitting={isSubmitting} />
          <SubmitButton isSubmitting={isSubmitting} isValid={isValid} touched={touched} />
        </div>
        {/* end::Actions */}
      </form>
      {(isSubmitting || !roleList) && <ListLoading />}
    </>
  )
}

export {FormPermission}
