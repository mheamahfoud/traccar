import { Formik } from 'formik'
import {
  KTCard,
  KTCardBody,
  QUERIES,
  ResponeApiCheck,
  initialResponseError,
  isNotEmpty,
} from '../../../../../../../_metronic/helpers'
import { Form } from './Form'
import { roleSchema } from './validationForm'
import { getEditTrip, update } from '../core/_requests'
import { useLocation } from 'react-router-dom'
import { useNotification } from '../../../../../../../_metronic/hooks/useNotification'
import { useNavigate } from 'react-router-dom'
import { ListPath } from '../../routes/RoutesNames'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { Spinner } from '../../../../components/Spinner'

const Edit = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const id: any = location.state
  const { showNotification } = useNotification()
  const [enableApi, setEnableApi] = useState<boolean>(true)
  const [editData, setEditData] = useState(null);
  const { data, isLoading } = useQuery(
    `${QUERIES.TRIP_LIST_QUERY_TABLE}- ${id}`,
    () => {
      return getEditTrip(id)
    },
    {
      enabled: isNotEmpty(id) && enableApi,
    }
  )
  useEffect(() => {
    if (data) {
      setEnableApi(false)

    }
  }, [data])

  return (
    <KTCard>
      <KTCardBody className='py-4'>
        {data && <Formik
          enableReinitialize={true}
          validationSchema={roleSchema}
          initialValues={data}
          initialStatus={{ edit: true }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
              const res: ResponeApiCheck = await update(values)
              if (res.result == 'success') {
                navigate(ListPath)
              }
              showNotification(res)
            } catch (ex) {
              showNotification({ error_description: ex, ...initialResponseError })
              console.error(ex)
            } finally {
              setSubmitting(true)
            }
          }}
          onReset={(values) => {
            console.log('Formik onReset')
          }}
        >
          <Form />
        </Formik>}
        {!data && <Spinner />}
      </KTCardBody>
    </KTCard>
  )
}

export default Edit
