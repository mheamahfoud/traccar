import { FC, Fragment, useEffect, useState } from 'react'
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
import { TripType, initialPath, tripTypeList } from '../core/_models'
import IconButton from '../../../../components/buttons/IconButton'
import { getPassengers, getRegiosList } from '../../../core/commonRequests'
import { geRegionTrips, geRegionTripCars, geExternalRegionTrips } from '../core/_requests'
import FormikCustomSelectInput from '../../../../components/formik/FormikCustomSelectInput'

const Form: FC = () => {
  const { handleSubmit, resetForm, isSubmitting, isValid, touched, values, setFieldValue } = useFormikContext()
  const [enableApi, setEnableApi] = useState<boolean>(true);
  //#region api
  const {
    data: regiosList,
  } = useQuery(
    `${QUERIES.ALL_REGIOS_LIST_VALUES}`,
    () => {
      return getRegiosList()
    },
    {
      enabled: enableApi
    }
  )
  const {
    data: passengersList,
  } = useQuery(
    `${QUERIES.ALL_PASSENGER_LIST_VALUES}`,
    () => {
      return getPassengers()
    },
    {
      enabled: enableApi
    }

  )

  useEffect(() => {
    alert(JSON.stringify(passengersList))
    if (regiosList && passengersList) {
      setEnableApi(false)
    }

  }, [regiosList, passengersList])


  //#endregion
  const intel = useIntl()

  return (
    <>
      {<form className='form' onSubmit={handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div className='d-flex flex-column scroll-y me-n7 pe-7'>
          <div className='row'>
            <div className='col-md-12 col-sm-12'>
              <FormikCustomSelectInput
                title={intel.formatMessage({ id: 'type' })}
                name={`type`}
                isRequired={true}
                relatedField={[`toAddresses`]}
                callApi={[geExternalRegionTrips]}
                options={tripTypeList || []}
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
                            <FormikCustomSelectInput
                              title={intel.formatMessage({ id: 'region' })}
                              name={`path.${index}.region`}
                              isRequired={true}
                              relatedField={[`path.${index}.vehicles`, `path.${index}.fromAddresses`]}
                              callApi={[geRegionTripCars, geRegionTrips]}
                              options={regiosList || []}
                            />
                          </div>
                          <div className='col-md-6 col-sm-12'>
                            <FormikSelectInput
                              title={intel.formatMessage({ id: 'vehicles' })}
                              name={`path.${index}.cars_id`}
                              isRequired={true}
                              options={values['path'][index]?.vehicles || []}
                            />
                          </div>
                          <div className='col-md-6 col-sm-12'>
                            <FormikSelectInput
                              title={intel.formatMessage({ id: 'from_address' })}
                              name={`path.${index}.from_address`}
                              isRequired={true}
                              options={values['path'][index]?.fromAddresses || []}
                            />
                          </div>
                          <div className='col-md-6 col-sm-12'>

                            {(parseInt(values['type']) == TripType.External || parseInt(values['type']) == TripType.Internal) ? <FormikSelectInput
                              title={intel.formatMessage({ id: 'to_address' })}
                              name={`path.${index}.to_address`}
                              isRequired={true}
                              options={(values['type'] === TripType.External ? values['path'].toAddresses : values['path'][index]?.fromAddresses) || []}
                            /> :
                              <FormikInputLabel
                                title={intel.formatMessage({ id: 'to_address' })}
                                name={`path.${index}.other_to`}
                                isRequired={false}
                              />


                            }

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
                              options={passengersList || []}
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
