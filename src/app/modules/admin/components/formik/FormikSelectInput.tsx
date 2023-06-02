import { useFormikContext } from 'formik';
import { SelectList } from '../../pages/vehicles/core/_models';
import { useEffect, useState } from 'react';
interface props {
    title: string,
    name: string,
    type?: string,
    isRequired: boolean,
    options?: SelectList[],
    relatedName?: string,
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
                        setFieldValue(relatedName,undefined)
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