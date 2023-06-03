import {FC, Fragment, useEffect} from 'react'
import {FieldArray, useFormikContext} from 'formik'

import {useIntl} from 'react-intl'
import { useQuery } from 'react-query'
import FormikCheckBoxArray from '../../../components/formik/FormikCheckBoxArray'
import ResetButton from '../../..//components/buttons/ResetButton'
import SubmitButton from '../../../components/buttons/SubmitButton'
import { QUERIES } from '../../../../../../_metronic/helpers'
import { ListLoading } from '../../../components/table/loading/ListLoading'
import { getPermissions } from '../../role/manage-role/core/_requests'
import FormikCheckBoxGroup from '../../../components/formik/FormikCheckBoxGroup'
import { getPermissionRoles } from '../core/_requests'
interface Props {
  name:string
}
const PermissionForm: FC<Props> = ({name}) => {

  const intel = useIntl()
  const {data: listRoles} = useQuery(
    `${QUERIES.PERMISSION_ROLE_LIST_VALUES}`,
    () => {
      return getPermissionRoles()
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
         {listRoles &&  <div className='d-flex flex-column scroll-y me-n7 pe-7'>
            <div className='row'>
              <FormikCheckBoxGroup
                options={listRoles || []}
                name='all_permissions'
                title='Permissions'
                group={name}
              />
            </div>
          </div>}
          {/* begin::Actions */}
          <div className='text-center pt-15'>
            <ResetButton resetForm={resetForm} isSubmitting={isSubmitting} />
            <SubmitButton isSubmitting={isSubmitting} isValid={isValid} touched={touched} />
          </div>
          {/* end::Actions */}
        </form>
      }
      {(isSubmitting  || !listRoles) && <ListLoading />}
    </>
  )
}

export {PermissionForm}
