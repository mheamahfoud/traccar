import { Formik } from 'formik';
import { KTCard, KTCardBody, QUERIES, ResponeApiCheck, addFieldsToFormData, initialResponseError, isNotEmpty } from '../../../../../../../_metronic/helpers';
import { Form } from './Form';
import { roleSchema } from './validationForm';
import { getDriver, update } from '../core/_requests';
import { useLocation } from 'react-router-dom';
import { useNotification } from '../../../../../../../_metronic/hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import { ListDriverPath } from '../../routes/RoutesNames';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
const Edit = () => {
    const navigate=useNavigate();
    const location = useLocation();
    const id: any = location.state
    const { showNotification } = useNotification();
    

    const [enableApi, setEnableApi] = useState<boolean>(true)
    const [editData, setEditData] = useState(null);
    const { data, isLoading } = useQuery(
      `${QUERIES.MANAGE_DRIVER_EDIT_LIST_VALUES}- ${id}`,
      () => {
        return getDriver(id)
      },
      {
        enabled: isNotEmpty(id) && enableApi,
      }
    )
    useEffect(() => {
      if (data) {
        setEditData(data?.data)
        setEnableApi(false)
  
      }
    }, [data])
    return (
        <KTCard>

            <KTCardBody className='py-4'>
                <Formik
                    enableReinitialize={true}
                    validationSchema={roleSchema}
                    initialValues={editData}
                    initialStatus={{ edit: true }}
                    onSubmit={async (values, { setSubmitting }) => {
                        const formData = new FormData();
                        addFieldsToFormData(formData,values )
                        setSubmitting(true)
                        try {
                            const res: ResponeApiCheck = await update(formData);
                            if(res.result=='success'){
                                navigate(ListDriverPath)
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
                        console.log('Formik onReset');
                    }}
                >

                    <Form />
                </Formik>


            </KTCardBody>

        </KTCard>
    );
}

export default Edit;
