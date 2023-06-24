import { useFormikContext } from 'formik';
import { Formik, Form, Field } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
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

import { FC, useEffect, useState } from 'react';
import { SelectList } from '../..';


interface Props {
    title: string,
    name: string,
    type?: string,
    isRequired: boolean,
    options?: SelectList[],
    relatedName?: string,
}
const FormikMultiSelectInput : FC<Props> = ({title, name, isRequired, options, relatedName }) =>{
    const { errors, touched, getFieldProps, setFieldValue, values } = useFormikContext();
  //  const { title, name, isRequired, options, relatedName } = props;
    //alert(JSON.stringify(values[name]))
    const [value, setValue] = useState("");

    useEffect(() => {
        if (name?.includes('.')) {
            if (values[name.substr(0, name.indexOf('.'))] != undefined) {
                setValue(options.filter(item => values[name.split('.')[0]][parseInt(name.split('.')[1])][name.split('.')[2]].includes(item.value)).join(","))
            }
        } else {
            setValue(options.filter(x => values[name]?.includes(x.value)).join(","))

            // setValue(values[name])

        }
    }, [])


    return (
        <div className='fv-row mb-7'>
             <label className={`${isRequired ? 'required' : ''} fw-bold fs-6 mb-2`}>{title}</label>
            <InputStyle
                multiple
                style={{
                    backgroundColor: '#f4f4f4',
                    borderColor: '#f4f4f4',
                    color: '#5e6278',
                    transition: '#5e6278 0.2s ease'
                }}
                data={options?.map((item) => {
                    return {
                        ...item,
                        id: item.value

                    }
                })}
                options={{
                    placeholder: title,
                }}
                {...getFieldProps({ name })}
                value={value}
                onChange={(event) => {
                   // alert(JSON.stringify(event.target.value))
                    setValue(event.target.value);
                    // setFieldValue(
                    //     name,
                    //     event.target.value.split(',')?.map((item) => item.value)
                          

                    // );
                }}
                
            />
            {/* <Autocomplete
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

            /> */}
        </div>)
}

export default FormikMultiSelectInput;