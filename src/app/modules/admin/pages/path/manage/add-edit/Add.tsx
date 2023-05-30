import { Formik } from 'formik';
import { KTCard, KTCardBody, QUERIES, ResponeApiCheck, initialResponseError } from '../../../../../../../_metronic/helpers';
import { Form } from './Form';
import { roleSchema } from './validationForm';
import { create } from '../core/_requests';
import { useNotification } from '../../../../../../../_metronic/hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import { ListPath } from '../../routes/RoutesNames';
import { AddinitialPathModel} from '../core/_models';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getTerminalList } from '../../../core/commonRequests';


const Add = () => {
    const navigate=useNavigate();
    const { showNotification } = useNotification();
    const [enableApi, setEnableApi] = useState<boolean>(true);
    const {
      data: terminalList,
    } = useQuery(
      `${QUERIES.ALL_Terminal_LIST_VALUES}`,
      () => {
        return getTerminalList()
      },
      {
        enabled: enableApi
      }
    )
    return (
        <KTCard>

            <KTCardBody className='py-4'>
                <Formik
                    enableReinitialize={true}
                    validationSchema={roleSchema}
                    initialValues={AddinitialPathModel}
                    initialStatus={{ edit: false }}
                    onSubmit={async (values :any, { setSubmitting }) => {
                        values['count']=values['terminal'].length
                        setSubmitting(true)
                        try {
                            const res: ResponeApiCheck = await create(values);
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
 
                    <Form terminalList={terminalList}  />
                </Formik>


            </KTCardBody>

        </KTCard>
    );
}

export default Add;
