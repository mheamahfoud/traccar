import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { SelectList, SelectListStringValues } from '../..';
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
interface props {
    title: string,
    name: string,
    type?: string,
    isRequired: boolean,
    options?: SelectListStringValues[],
    relatedName?: string[],
    multiple?:boolean
}
const FormikSelectInput = (props: props) => {
    const [value, setValue] = useState(null)
    const { title, name, isRequired, options, relatedName } = props;
    const { errors, touched, getFieldProps, setFieldValue,values } = useFormikContext();
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
            <select
                placeholder={title}
                onChange={(event) => {
                    setValue(event.target.value)
                    setFieldValue(name ,event.target.value)
                    if(relatedName){
                        relatedName.map((name)=>{
                            setFieldValue(name,undefined)
                        })
                       
                    }
                }}
                value={value}
                // {...getFieldProps({ name })}
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

export default FormikSelectInput