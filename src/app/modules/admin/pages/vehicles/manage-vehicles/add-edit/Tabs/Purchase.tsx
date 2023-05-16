import React from 'react';
import FormikInputLabel from '../../../../../components/formik/FormikInputLabel';
import FormikFile from '../../../../../components/formik/FormikFile';
import { useIntl } from 'react-intl';

const Purchase = () => {
    const intel = useIntl()
    return (
        <div
            className='d-flex flex-column scroll-y me-n7 pe-7'
        >

            <div className='separator separator-dashed my-5'></div>
            <div className='row'>
                <div className='col-md-6 col-sm-6 col-xs-12'>
                    <FormikInputLabel
                        title={intel.formatMessage({ id: 'exp_name' })}
                        name={'exp_name'}
                        isRequired={false}
                    />
                </div>
                <div className='col-md-6 col-sm-6 col-xs-12'>
                    <FormikInputLabel
                        title={intel.formatMessage({ id: 'exp_amount' })}
                        name={'exp_amount'}
                        isRequired={false}
                        type='number'
                    />
                </div>

            

            </div>

        </div>
    );
}

export default Purchase;
