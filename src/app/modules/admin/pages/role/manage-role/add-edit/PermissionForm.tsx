import {FC, Fragment} from 'react'
import {FieldArray, useFormikContext} from 'formik'
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
import {FieldLink} from '../../../../../../../_metronic/utlis/formik'
import FormikAudio from '../../../../components/formik/FormikAudio'
import IconButton from '../../../../components/buttons/IconButton'
import FormikSwitch from '../../../../components/formik/FormikCheckBox'
import {getPermissions} from '../core/_requests'
import FormikCheckBoxArray from '../../../../components/formik/FormikCheckBoxArray'
interface Props {
  role_name :string,
  role_id:number
}
const PermissionForm: FC<Props> = ({role_name,role_id}) => {

  const intel = useIntl()
  const {data: permissionList} = useQuery(
    `${QUERIES.PERMISSION_LIST_VALUES}`,
    () => {
      return getPermissions()
    },
    {
      refetchOnMount: true,
    }
  )
  const {handleSubmit, resetForm, isSubmitting, isValid, touched, values} = useFormikContext()
  return (
    <>
      {
        <form className='form' onSubmit={handleSubmit} noValidate encType='multipart/form-data'>
          {/* begin::Scroll */}
          <div className='d-flex flex-column scroll-y me-n7 pe-7'>
            <div className='row'>
              <FormikCheckBoxArray
                options={[{permissions: permissionList,name:role_name,id:role_id }]|| []}
                name='permissions'
                title='Permissions'
                group={role_name}
              />
            </div>
          </div>
          {/* begin::Actions */}
          <div className='text-center pt-15'>
            <ResetButton resetForm={resetForm} isSubmitting={isSubmitting} />
            <SubmitButton isSubmitting={isSubmitting} isValid={isValid} touched={touched} />
          </div>
          {/* end::Actions */}
        </form>
      }
      {(isSubmitting  || !permissionList) && <ListLoading />}
    </>
  )
}

export {PermissionForm}
