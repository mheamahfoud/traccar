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
            <select  aria-label="Select a Currency" data-control="select2" data-placeholder="Select a currency.." className="form-select form-select-solid form-select-lg">
                <option value="">Select a currency..</option>
                <option data-kt-flag="flags/united-states.svg" value="USD">
                    <b>USD</b>&nbsp;-&nbsp;USA dollar</option>
                <option data-kt-flag="flags/united-kingdom.svg" value="GBP">
                    <b>GBP</b>&nbsp;-&nbsp;British pound</option>
                <option data-kt-flag="flags/australia.svg" value="AUD">
                    <b>AUD</b>&nbsp;-&nbsp;Australian dollar</option>
                <option data-kt-flag="flags/japan.svg" value="JPY">
                    <b>JPY</b>&nbsp;-&nbsp;Japanese yen</option>
                <option data-kt-flag="flags/sweden.svg" value="SEK">
                    <b>SEK</b>&nbsp;-&nbsp;Swedish krona</option>
                <option data-kt-flag="flags/canada.svg" value="CAD">
                    <b>CAD</b>&nbsp;-&nbsp;Canadian dollar</option>
                <option data-kt-flag="flags/switzerland.svg" value="CHF">
                    <b>CHF</b>&nbsp;-&nbsp;Swiss franc</option>
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