import { useFormikContext } from 'formik';
import { SelectList } from '../../pages/vehicles/core/_models';
import { FC, useEffect, useState } from 'react';
import Select2 from 'react-select2-wrapper';
import { styled } from "@mui/material";
import './style.css'
const InputStyle = styled(Select2)({
    width: '100%',
    background: 'red',
    '& .select2  .select2-selection': {
        background: 'red'

    }
})

interface Props {
    title: string,
    name: string,
    type?: string,
    isRequired: boolean,
    options?: SelectList[],
    relatedName?: string,
    multiple?:boolean
}
const FormikSelectInput : FC<Props> = ({title, name, isRequired, options, relatedName,multiple }) => {
    const [value, setValue] = useState(null)
    const { errors, touched, getFieldProps, setFieldValue, values } = useFormikContext();
    useEffect(() => {
        if (name.includes('.')) {
            if (values[name.substr(0, name.indexOf('.'))] != undefined) {
                setValue(values[name.split('.')[0]][parseInt(name.split('.')[1])][name.split('.')[2]])
            }
        } else {
            setValue(values[name])

        }
    }, [options])
    return (
        <div className='fv-row mb-7'>
            <label className={`${isRequired ? 'required' : ''} fw-bold fs-6 mb-2`}>{title}</label>
            <InputStyle
                multiple={multiple}
                style={{
                    backgroundColor: '#f4f4f4',
                    borderColor: '#f4f4f4',
                    color: '#5e6278',
                    transition: '#5e6278 0.2s ease'
                }}
                data={options.map((item) => {
                    return {
                        ...item,
                        id: item.value

                    }
                })}
                options={{
                    placeholder: title,
                }}
                {...getFieldProps({ name })}
                onChange={(event) => {
                    setValue(event.target.value)
                    setFieldValue(name ,event.target.value)
                    if(relatedName){
                        setFieldValue(relatedName,undefined)
                    }
                }}
                value={value}
                
            />
            {/* <label className={`${isRequired ? 'required' : ''} fw-bold fs-6 mb-2`}>{title}</label>
            <select
                placeholder={title}
                onChange={(event) => {
                    setValue(event.target.value)
                    setFieldValue(name ,event.target.value)
                    if(relatedName){
                        setFieldValue(relatedName,undefined)
                    }
                }}
                value={value}
                // {...getFieldProps({ name })}
                className="form-select form-select-solid form-select-lg fw-semibold" data-control="select2">
                <option value={""}>Select OPtion</option>
                {

                    options.map((item) => {
                        return (
                            <option value={item?.value?.toString()}>{item.text}</option>
                        )
                    })
                }
            </select> */}

            {touched[name] && errors[name] && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{
                    
                    <span role='alert'>{errors[name]}</span>
                   }</div>
                </div>
            )}
        </div>
    )
}

export default FormikSelectInput