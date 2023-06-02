import { Formik } from 'formik'
import {
  KTCard,
  KTCardBody,
  QUERIES,
  ResponeApiCheck,
  initialResponseError,
} from '../../../../../../../_metronic/helpers'
import { roleSchema } from './validationForm'
import { addAds, create, getAdsPathList } from '../core/_requests'
import { useNotification } from '../../../../../../../_metronic/hooks/useNotification'
import { useLocation, useNavigate } from 'react-router-dom'
import { ListPath } from '../../routes/RoutesNames'
import { FormAds } from './FormAds'
import { roleAdsSchema } from './adsValidation'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { Spinner } from '../../../../components/Spinner'
import { ManageAdsListWrapper } from '../ads-path/List'
import { useIntl } from 'react-intl'

const AddAds = () => {
  const intel = useIntl()
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const location = useLocation()
  const data: any = location.state;
  const [enableApi, setEnableApi] = useState<boolean>(true)
  const { data: ads } = useQuery(
    `${QUERIES.ALL_ADS_PATH_LIST_VALUES}- ${data?.id}`,
    () => {
      return getAdsPathList(data?.id)
    },
    {
      enabled: enableApi && data?.id != undefined,
    }
  )
  //ads.length > 0 ? ads[0]?.value :
  return (
    <KTCard>
      <KTCardBody className='py-4'>
        {ads && <Formik
          enableReinitialize={true}
          validationSchema={roleAdsSchema}
          initialValues={{ path_id: data?.id, ads_id: null, time: null, name: data?.name }}
          initialStatus={{ edit: false }}
          onSubmit={async (values: any, { setSubmitting }) => {
            setSubmitting(true)
            try {
              const res: ResponeApiCheck = await addAds(values)
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
          <FormAds />
        </Formik>}
        <h3>{intel.formatMessage({ id:'list_ads'})}</h3>
        <div className='separator separator-dashed my-5'></div>
        <ManageAdsListWrapper path_id={data?.id} />
        {!ads && <Spinner />}
      </KTCardBody>
    </KTCard>
  )
}

export default AddAds
