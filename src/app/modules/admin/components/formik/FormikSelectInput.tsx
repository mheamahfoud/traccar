import { useFormikContext } from 'formik';
interface props {
    title: string,
    name: string,
    type?: string,
    isRequired: boolean,
    options: any[]
}
const FormikSelectInput = (props: props) => {
    const { title, name, isRequired, options } = props;
    const { errors, touched, getFieldProps, } = useFormikContext();
    const options1 = {
        placeholder: "Select"
    };
    return (
        <div className='fv-row mb-7'>
            <label className={`${isRequired ? 'required' : ''} fw-bold fs-6 mb-2`}>{title}</label>
            <select
                placeholder={title}
                {...getFieldProps({ name })}
                className="form-select form-select-solid form-select-lg">
                {
                    options.map((item) => {
                        return (
                            <option value={item.value}>{item.text}</option>
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