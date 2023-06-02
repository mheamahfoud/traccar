import { useFormikContext } from 'formik';
import { Formik, Form, Field } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
const FormikMultiSelectInput = (props: props) => {
    const { errors, touched, getFieldProps, setFieldValue, values } = useFormikContext();
    const { title, name, isRequired, options, relatedName } = props;
    //alert(JSON.stringify(values[name]))
    const [value, setValue] = useState([]);

    useEffect(() => {
        if (name?.includes('.')) {
            if (values[name.substr(0, name.indexOf('.'))] != undefined) {
                setValue(options.filter(item => values[name.split('.')[0]][parseInt(name.split('.')[1])][name.split('.')[2]].includes(item.value)))
            }
        } else {
            setValue(options.filter(x => values[name]?.includes(x.value)))

            // setValue(values[name])

        }
    }, [options])


    return (
        <div className='fv-row mb-7'>
            <Autocomplete
                options={options}
                multiple
                disableCloseOnSelect
                filterSelectedOptions
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    setFieldValue(
                        props.name,
                        newValue
                            .map((item) => item.value)

                    );
                }}
                getOptionLabel={(option) => option.text}
                renderInput={(params) => (
                    <TextField
                        variant="standard"
                        label={title}
                        helperText={
                            errors[name] &&
                                touched[name]
                                ? errors[name]
                                : null
                        }
                        error={
                            errors[name] &&
                                touched[name]
                                ? true
                                : false
                        }
                        {...params}
                    />




                )}

            />
        </div>)
}

export default FormikMultiSelectInput;