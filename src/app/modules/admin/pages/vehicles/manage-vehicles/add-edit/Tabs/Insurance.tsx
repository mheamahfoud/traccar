import React from 'react';
import FormikInputLabel from '../../../../../components/formik/FormikInputLabel';
import FormikFile from '../../../../../components/formik/FormikFile';
import FormikSelectInput from '../../../../../components/formik/FormikSelectInput';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getColorList, getEngineTypeList, getGroupList, getMakerList, getModelList, getTypeList } from '../../../core/_requests';
import { QUERIES } from '../../../../../../../../_metronic/helpers';
import FormikSwitch from '../../../../../components/formik/FormikCheckBox';
import { FieldDocument, FieldImage } from '../../../../../../../../_metronic/utlis/formik';

const Insurance = () => {


    //#endregion fetch data
    const intel = useIntl()
    return (

        <div
            className='d-flex flex-column scroll-y me-n7 pe-7'
        >

            <div className='separator separator-dashed my-5'></div>
            <div className='row'>
                <div className='col-md-6 col-sm-6 col-xs-12'>
                    <FormikInputLabel
                        title={intel.formatMessage({ id: 'insurance_number' })}
                        name={'insurance_number'}
                        isRequired={false}
                        type='number'
                    />
                </div>
                <div className='col-md-6 col-sm-6 col-xs-12'>
                    <FormikInputLabel
                        title={intel.formatMessage({ id: 'exp_date' })}
                        name={'exp_date'}
                        isRequired={false}
                        type='date'
                    />
                </div>

                <div className='col-md-6 col-sm-6 col-xs-12'>
                    <FormikFile
                        title={intel.formatMessage({ id: 'documents' })}
                        name={'documents'}
                        isRequired={false}
                        fieldFile={FieldDocument}
                       

                    />
                </div>

            </div>

        </div>

    );
}

export default Insurance;
