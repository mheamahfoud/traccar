import { Formik } from 'formik';
import { KTCard, KTCardBody, QUERIES, ResponeApiCheck, initialResponseError } from '../../../../../../../_metronic/helpers';
import { Form } from './Form';
//import { update } from '../core/_requests';
import { useLocation } from 'react-router-dom';
import { useNotification } from '../../../../../../../_metronic/hooks/useNotification';
import { AccountForm } from './AccountForm';
import { getAccountCar } from '../core/_requests';
import { useQuery } from 'react-query';
import * as Yup from 'yup'
import { ListLoading } from '../../../../components/table/loading/ListLoading';
const roleSchema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
    password: Yup.string()
        .required('Field is required'),


})

const AccountVehicle = () => {
    const location = useLocation();
    const id: any = location.state;
    const { showNotification } = useNotification();


    const {
        data: acountData,
        isLoading,
    } = useQuery(
        `${QUERIES.VEHICLES_MAKER_LIST_VALUES + id}`,
        () => {
            return getAccountCar(id)
        },

    )
    return (
        <KTCard>

            <KTCardBody className='py-4'>
                <Formik
                    enableReinitialize={true}
                    validationSchema={roleSchema}
                    initialValues={acountData?.data || {}}
                    initialStatus={{ edit: true }}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true)
                        try {

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

                    <AccountForm />
                </Formik>

            </KTCardBody>
            {isLoading && <ListLoading />}
        </KTCard>

    );
}

export default AccountVehicle;
