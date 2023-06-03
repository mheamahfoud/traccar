import {Formik} from 'formik'

import {useLocation, useNavigate} from 'react-router-dom'

import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {useNotification} from '../../../../../../../_metronic/hooks/useNotification'
import {
  KTCard,
  KTCardBody,
  ResponeApiCheck,
  initialResponseError,
} from '../../../../../../../_metronic/helpers'
import {PermissionForm} from '../../permissions/PermissionForm'
import {addPermissionToUser} from '../../core/_requests'

const AddPermissionRoleUser = () => {
  const navigate = useNavigate()
  const {showNotification} = useNotification()
  const location = useLocation()
  const {data}: any = location.state
  // const {data: myPermissionList} = useQuery(
  //   `${QUERIES.ROLE_PERMISSION_LIST_VALUES}- ${id}`,
  //   () => {
  //     return getPermissionRole(id)
  //   },
  //   {
  //     refetchOnMount: true,
  //   }
  // )
alert(JSON.stringify(data))
  return (
    <KTCard>
      <KTCardBody className='py-4'>
        <Formik
          enableReinitialize={true}
          // validationSchema={roleSchema}
          initialValues={{
            all_permissions: [
              // {
              //   roles_id: 1,
              //   permissions: [1],
              // },
            ],
          }}
          initialStatus={{edit: false}}
          onSubmit={async (values, {setSubmitting}) => {
            console.log(values)
            setSubmitting(true)
            try {
              const res: ResponeApiCheck = await addPermissionToUser(values, data?.id)
              if (res.result == 'success') {
                //  navigate(ListRolePath)
              }
              showNotification(res)
            } catch (ex) {
              showNotification({error_description: ex, ...initialResponseError})
              console.error(ex)
            } finally {
              setSubmitting(true)
            }
          }}
          onReset={(values) => {
            console.log('Formik onReset')
          }}
        >
     {  data &&   <PermissionForm name={data?.name} />}
        </Formik>
      </KTCardBody>
    </KTCard>
  )
}

export default AddPermissionRoleUser
