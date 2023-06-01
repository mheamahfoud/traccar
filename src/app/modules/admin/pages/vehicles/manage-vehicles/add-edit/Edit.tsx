import { Formik } from 'formik';
import { KTCard, KTCardBody, ResponeApiCheck, addFieldsToFormData, initialResponseError } from '../../../../../../../_metronic/helpers';
import { Form } from './Form';
import { initialVehicle } from '../core/_models';
import { roleSchema } from './validationForm';
//import { update } from '../core/_requests';
import { useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useNotification } from '../../../../../../../_metronic/hooks/useNotification';
import { ListVehiclesPath } from '../../routes/RoutesNames';
import { useNavigate } from 'react-router-dom';
import { update } from '../core/_requests';
import { useEffect, useState } from 'react';
import { ListLoading } from '../../../../components/table/loading/ListLoading';
const Edit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const payloadData = location.state;
    const [data, setData] = useState<any>(payloadData);

    useEffect(() => {
        if (data) {
           console.log(data)
            setData({
                ...data, insurance_number: data.meta_data.ins_number, exp_date: data.meta_data.ins_exp_date,

                exp_name : '',exp_amount:''
            }
            )
        }
        else {
            navigate(ListVehiclesPath)
        }

    }, [payloadData])
    const { showNotification } = useNotification();
    return (

        data && <Formik
            enableReinitialize={true}
            // validationSchema={roleSchema}
            initialValues={data}
            initialStatus={{ edit: true }}
            onSubmit={async (values, { setSubmitting }) => {
                const formData = new FormData();
                addFieldsToFormData(formData, values)
                setSubmitting(true)
                try {
                    const res: ResponeApiCheck = await update(formData, values?.id);
                    if (res.result == 'success') {
                        navigate(ListVehiclesPath)
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



    );
}

export default Edit;
