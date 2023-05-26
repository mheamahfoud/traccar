import { FC, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CarWorkingTime } from '../core/_models'
import clsx from 'clsx'
import { useListView } from '../core/ListViewProvider'
import { useQueryResponse } from '../core/QueryResponseProvider'
import { KTIcon, toAbsoluteUrl } from '../../../../../../../_metronic/helpers'
import InputDetail from '../../../../components/fields/InputDetail'
import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { EditWorkingCarspath } from '../../routes/RoutesNames'

type Props = {
    isLoading: boolean
    data: any
}


const ModalForm: FC<Props> = ({ data, isLoading }) => {
    const intl = useIntl();
    const {itemIdForUpdate, setItemIdForUpdate} = useListView()
    const navigate = useNavigate();
    const handleEdit = () => {
        
        navigate(EditWorkingCarspath , {state: itemIdForUpdate})
    }

    return (

        <div
        >
            <div className='row'>
                <div className='col-12'>
                    <InputDetail
                        title={intl.formatMessage({ id: 'license_plate' })}
                        text={data['vehicles']['license_plate']}

                    />
                </div>
                <div className='col-12'>
                    <InputDetail
                        title={intl.formatMessage({ id: 'model' })}
                        text={data['vehicles']['model']}

                    />
                </div>

                <div className='col-12'>
                    <InputDetail
                        title={intl.formatMessage({ id: 'maker' })}
                        text={data['vehicles']['make']}

                    />
                </div>
                <div className='col-12'>
                    <InputDetail
                        title={intl.formatMessage({ id: 'year' })}
                        text={data['vehicles']['year']}

                    />
                </div>

                <div className='col-12'>
                    <InputDetail
                        title={intl.formatMessage({ id: 'region' })}
                        text={data['region']['name']}

                    />
                </div>
                <div className='col-12'>
                    <InputDetail
                        title={intl.formatMessage({ id: 'group' })}
                        text={data['group']?.['name']}

                    />
                </div>

                <div className='col-12'>
                    <InputDetail
                        title={intl.formatMessage({ id: 'time_in' })}
                        text={data['time_in']}

                    />
                </div>
                <div className='col-12'>
                    <InputDetail
                        title={intl.formatMessage({ id: 'time_out' })}
                        text={data['time_out']}

                    />
                </div>
            </div>

            <div className='row'>
                <button type='button' className='btn btn-primary' onClick={handleEdit}>
                    <KTIcon iconName='edit' className='fs-2' />
                    {intl.formatMessage({ id: 'edit_object' }, {
                        name: intl.formatMessage({ id: 'working_day' })
                    })}
                </button>

            </div>
        </div>

    )
}

export { ModalForm }
