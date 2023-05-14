import { Formik } from 'formik';
import { KTCard, KTCardBody, ResponeApiCheck, initialResponseError } from '../../../../../../../_metronic/helpers';
import { Form } from './Form';
import { initialVehicle } from '../core/_models';
import { roleSchema } from './validationForm';
//import { update } from '../core/_requests';
import { useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useNotification } from '../../../../../../../_metronic/hooks/useNotification';

const Edit = () => {
    const location = useLocation();
    const data: any = location.state;
    const { showNotification } = useNotification();

    return (
        <KTCard>

            <KTCardBody className='py-4'>
                <Formik
                    enableReinitialize={true}
                    validationSchema={roleSchema}
                    initialValues={data}
                    initialStatus={{ edit: true }}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true)
                        try {
                            //values['icon']=values['icon_file'];
                            //delete values['icon_file']
                          //  const res: ResponeApiCheck = await update(values);
                           // showNotification(res)
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
