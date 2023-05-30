import { Formik } from 'formik';
import { KTCard, KTCardBody, QUERIES, ResponeApiCheck, initialResponseError } from '../../../../../../../_metronic/helpers';
import { roleSchema } from './validationForm';
import { addAds, addVehicle, create } from '../core/_requests';
import { useNotification } from '../../../../../../../_metronic/hooks/useNotification';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListPath } from '../../routes/RoutesNames';
import { FormAds } from './FormAds';
import { FormVehicle } from './FormVehicle';

const AddVehicle = () => {
    const navigate=useNavigate();
    const { showNotification } = useNotification();
    const location = useLocation()
    const data: any = location.state
    return (
        <KTCard>
            <KTCardBody className='py-4'>
                <Formik
                    enableReinitialize={true}
                  //  validationSchema={roleSchema}
                    initialValues={{path_id:data?.id,  vehicles_id:[], name:data?.name }}
                    initialStatus={{ edit: false }}
                    onSubmit={async (values :any, { setSubmitting }) => {
                    
                        setSubmitting(true)
                        try {
                            const res: ResponeApiCheck = await addVehicle(values);
                            if(res.result=='success'){
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
                        console.log('Formik onReset');
                    }}
                >
 
                    <FormVehicle  />
                </Formik>


            </KTCardBody>

        </KTCard>
    );
}

export default AddVehicle;
