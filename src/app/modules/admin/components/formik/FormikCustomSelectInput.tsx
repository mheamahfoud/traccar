import { useFormikContext } from 'formik';
import { SelectList } from '../../pages/vehicles/core/_models';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { useEffectAsync } from '../../../../../reactHelper';
interface props {
    title: string,
    name: string,
    relatedField: string[],
    type?: string,
    isRequired: boolean,
    options?: SelectList[],
    callApi: any[]
}
const FormikCustomSelectInput = (props: props) => {
    const { title, name, isRequired, options, callApi, relatedField } = props;
    const { errors, values, touched, getFieldProps, setFieldValue } = useFormikContext();
    useEffectAsync(async () =>  {
        if (values[name.split('.')[0]][parseInt(name.split('.')[1])][name.split('.')[2]]) {
            for (var i = 0; i < callApi.length; i++) {
                const response = await callApi[i](values[name.split('.')[0]][parseInt(name.split('.')[1])][name.split('.')[2]]);
                if (response) {
                    setFieldValue(relatedField[i], response)
                }
            }
        }
    }, [values[name.split('.')[0]][parseInt(name.split('.')[1])][name.split('.')[2]]])
    return (
        <div className='fv-row mb-7'>
            <label className={`${isRequired ? 'required' : ''} fw-bold fs-6 mb-2`}>{title}</label>
            <select
                placeholder={title}
                {...getFieldProps({ name })}
                className="form-select form-select-solid form-select-lg">
                <option value={""}>Select OPtion</option>
                {

                    options.map((item) => {
                        return (
                            <option value={item?.value?.toString()}>{item.text}</option>
                        )
                    })
                }

            </select>

            {touched[name] && errors[name] && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{errors[name]}</div>
                </div>
            )}
        </div>
    )
}

export default FormikCustomSelectInput