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
import { FieldImage } from '../../../../../../../../_metronic/utlis/formik';

const GeneralInfo = () => {
    //#region fetch data

//#endregion fetch data
    const intel = useIntl()
    return (
       
            <div
                className='d-flex flex-column scroll-y me-n7 pe-7'
            >
     
                <div className='separator separator-dashed my-5'></div>
         

             

         


                <h3>license Info</h3>
                <div className='separator separator-dashed my-5'></div>

                <div className='row'>
                    <div className='col-md-4 col-sm-6 col-xs-12'>
                        <FormikInputLabel
                            title={intel.formatMessage({ id: 'license_plate' })}
                            name={'license_plate'}
                            isRequired={true}

                        />
                    </div>

                    <div className='col-md-4 col-sm-6 col-xs-12'>
                        <FormikInputLabel
                            title={intel.formatMessage({ id: 'lic_exp_date' })}
                            name={'lic_exp_date'}
                            isRequired={false}
                            type={'date'}
                        />
                    </div>


                    <div className='col-md-4 col-sm-6 col-xs-12'>
                        <FormikInputLabel
                            title={intel.formatMessage({ id: 'reg_exp_date' })}
                            name={'reg_exp_date'}
                            isRequired={false}
                            type={'date'}

                        />
                    </div>
                </div>

                <div className='separator separator-dashed my-5'></div>
                <div className='row'>
                    <div className='col-md-4 col-sm-6 col-xs-12'>
                        <FormikFile
                            title={intel.formatMessage({ id: 'vehicle_image' })}
                            name={'vehicle_image'}
                            isRequired={false}
                            fieldFile={FieldImage}
                        />
                    </div>

                    <div className='col-md-4 col-sm-6 col-xs-12'>
                        <FormikSwitch
                            title={intel.formatMessage({ id: 'in_service' })}
                            name={'in_service'}
                        />
                    </div>



                </div>

            </div>
      
    );
}

export default GeneralInfo;
