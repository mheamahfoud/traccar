import {Formik} from 'formik'
import {
  KTCard,
  KTCardBody,
  QUERIES,
  ResponeApiCheck,
  initialResponseError,
} from '../../../../../../../_metronic/helpers'
import {Form} from './Form'
import {roleSchema} from './validationForm'
import {getPermissionStation, getRoleList, update} from '../core/_requests'
import {useLocation} from 'react-router-dom'
import {useNotification} from '../../../../../../../_metronic/hooks/useNotification'
import {useNavigate} from 'react-router-dom'
import {useQuery} from 'react-query'
import {ListLoading} from '../../../../components/table/loading/ListLoading'
import {FormPermission} from './FormPermission'
const ManagePermission = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const id: any = location.state
  const {showNotification} = useNotification()

  const {data: roleList} = useQuery(`${QUERIES.STATION_ROLE_LIST_VALUES}`, () => {
    return getRoleList()
  })
  const {data: permissionStation} = useQuery(`${QUERIES.STATION_PERMISSION_VALUES}`, () => {
    return getPermissionStation(id)
  })

  return (
    <KTCard>
      {roleList && permissionStation && (
        <KTCardBody className='py-4'>
          <Formik
            enableReinitialize={true}
            initialValues={roleList.reduce(
              (obj, cur) => ({
                ...obj,
                [cur.id]: permissionStation.map((x) => x.id).includes(cur.id),
              }),
              {}
            )}
            initialStatus={{edit: true}}
            onSubmit={async (values, {setSubmitting}) => {
              console.log(values)
              setSubmitting(true)
              try {
                var result = Object.keys(values).filter(x=>values[x]).map((key) => {
                  if (values[key]) return {role_id: parseInt(key)}
                })
                console.log(result)
                //   setSubmitting(false)
                // const res: ResponeApiCheck = await update(values);
                // if(res.result=='success'){
                //     navigate(ListPath)
                // }
                //     showNotification(res)
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
            <FormPermission roleList={roleList || []} />
          </Formik>
        </KTCardBody>
      )}
      {(!permissionStation || !roleList) && <ListLoading />}
    </KTCard>
  )
}

export default ManagePermission
