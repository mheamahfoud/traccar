import { FC, Fragment } from 'react'
import { useFormikContext, FieldArray } from 'formik'
import { ListLoading } from '../../../../components/table/loading/ListLoading'
import SubmitButton from '../../../../components/buttons/SubmitButton'
import ResetButton from '../../../../components/buttons/ResetButton'
import { useIntl } from 'react-intl'
import FormikInputLabel from '../../../../components/formik/FormikInputLabel'
import FormikSelectInput from '../../../../components/formik/FormikSelectInput'
import { KTIcon, QUERIES } from '../../../../../../../_metronic/helpers'
import { getStationList } from '../../../vehicles/core/_requests'
import { useQuery } from 'react-query'
import { initialPath, tripTypeList } from '../core/_models'
import IconButton from '../../../../components/buttons/IconButton'

const Form: FC = () => {
  const {
    data: stationList,
  } = useQuery(
    `${QUERIES.VEHICLES_STATION_LIST_VALUES}`,
    () => {
      return getStationList()
    },
  )
  const intel = useIntl()

  const { handleSubmit, resetForm, isSubmitting, isValid, touched, values, setFieldValue } = useFormikContext()
  return (
    <>
      {<form className='form' onSubmit={handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div className='d-flex flex-column scroll-y me-n7 pe-7'>
          <div className='row'>
            <div className='col-md-12 col-sm-12'>
              <FormikSelectInput
                title={intel.formatMessage({ id: 'type' })}
                name={'type'}
                isRequired={true}
                options={tripTypeList}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <FormikInputLabel
                title={intel.formatMessage({ id: 'date' })}
                name={'date'}
                isRequired={true}
                type='date'
              />
            </div>

            <div className='col-md-6 col-sm-12'>
              <FormikInputLabel
                title={intel.formatMessage({ id: 'note' })}
                name={'note'}
                isRequired={false}
              />
            </div>
          </div>

          <h3>{intel.formatMessage({ id: 'trip_path' })}</h3>


          <div className='separator separator-dashed my-5'></div>


          <FieldArray
            name="path">
            {({ insert, remove, push }) => (
              <Fragment >
                <div className='d-flex mb-2 justify-content-end'>
                  <IconButton onClick={() => {
                    push(initialPath);
                  }}>
                    <i className="ki-duotone ki-plus fs-2" style={{ color: 'white' }} />
                  </IconButton>
                </div>
                {values['path'] && values['path'].length > 0 && (
                  values['path'].map((item, index) => (
                    <Fragment key={index} >
                      <div className='row'>
                        <div className='col-md-10 col-sm-12 row'>
                          <div className='col-md-6 col-sm-12'>
                            <FormikSelectInput
                              title={intel.formatMessage({ id: 'passenger' })}
                              name={`path.${index}.passenger`}
                              isRequired={true}
                              options={tripTypeList}
                            />
                          </div>
                          <div className='col-md-6 col-sm-12'>
                            <FormikInputLabel
                              title={intel.formatMessage({ id: 'to' })}
                              name={`path.${index}.to`}
                              isRequired={false}
                            />
                          </div>

                          <div className='col-md-6 col-sm-12'>
                            <FormikInputLabel
                              title={intel.formatMessage({ id: 'time_in' })}
                              name={`path.${index}.time_in`}
                              isRequired={false}
                              type='time'
                            />
                          </div>


                          <div className='col-md-6 col-sm-12'>
                            <FormikSelectInput
                              title={intel.formatMessage({ id: 'passenger' })}
                              name={`path.${index}.passenger`}
                              isRequired={true}
                              options={tripTypeList}
                            />
                          </div>
                          <div className='col-md-6 col-sm-12'>
                            <FormikSelectInput
                              title={intel.formatMessage({ id: 'passenger' })}
                              name={`path.${index}.passenger`}
                              isRequired={true}
                              options={tripTypeList}
                            />
                          </div>
                          <div className='col-md-6 col-sm-12'>
                            <FormikSelectInput
                              title={intel.formatMessage({ id: 'passenger' })}
                              name={`path.${index}.passenger`}
                              isRequired={true}
                              options={tripTypeList}
                            />
                          </div>
                          <div className='col-md-6 col-sm-12'>
                            <FormikSelectInput
                              title={intel.formatMessage({ id: 'passenger' })}
                              name={`path.${index}.passenger`}
                              isRequired={true}
                              options={tripTypeList}
                            />
                          </div>
                        </div>
                        <div className='col-md-2 col-sm-12 d-flex align-items-center justify-content-evenly'>
                          <IconButton onClick={() => {
                            push(initialPath);
                          }}>
                            <i className="ki-duotone ki-plus fs-2" style={{ color: 'white' }} />
                          </IconButton>
                          {values['path'].length - 1 == index && <IconButton color='bg-danger' onClick={() => {
                            let tmp = values['path'].filter(
                              (_, i) =>
                                i != index,
                            );

                            setFieldValue(
                              `path`,
                              tmp,
                            );
                          }}>
                            <i className="ki-duotone ki-minus fs-2" style={{ color: 'white' }} />
                          </IconButton>}
                        </div>


                        {/* <div className='col-md-6 col-sm-12'>
                          <FormikSelectInput
                            title={intel.formatMessage({ id: 'station' })}
                            name={'station_id'}
                            isRequired={true}
                            options={stationList}
                          />
                        </div>  */}
                      </div>


                    </Fragment>))

                )}
              </Fragment>
            )}
          </FieldArray>







        </div>
        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <ResetButton resetForm={resetForm} isSubmitting={isSubmitting} />
          <SubmitButton isSubmitting={isSubmitting} isValid={isValid} touched={touched} />
        </div>
        {/* end::Actions */}
      </form>}
      {(false) && <ListLoading />}
    </>
  )
}

export { Form }
