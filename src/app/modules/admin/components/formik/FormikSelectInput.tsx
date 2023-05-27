import { useFormikContext } from 'formik';
import { SelectList } from '../../pages/vehicles/core/_models';
interface props {
    title: string,
    name: string,
    type?: string,
    isRequired: boolean,
    options?: SelectList[],
    relatedName?: string,
}
const FormikSelectInput = (props: props) => {
    const { title, name, isRequired, options, relatedName } = props;
    const { errors, touched, getFieldProps, setFieldValue,values } = useFormikContext();
    return (
        <div className='fv-row mb-7'>
            <label className={`${isRequired ? 'required' : ''} fw-bold fs-6 mb-2`}>{title}</label>
            <select
                placeholder={title}
                onChange={(event) => {
                    setFieldValue(name ,event.target.value)
                    if(relatedName){
                        setFieldValue(relatedName,undefined)
                    }
                }}
                value={values[name]}
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