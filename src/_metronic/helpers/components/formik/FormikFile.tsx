import { useFormikContext } from 'formik';
import clsx from 'clsx'
import { Image, } from "react-bootstrap";
import { useState } from 'react';
import { toAbsoluteServerUrl } from '../..';
import { FieldLink } from '../../../utlis/formik';

interface props {
    title: string,
    name: string,
    isRequired: boolean,
    fieldFile:any
}
const FormikInputLabel = (props: props) => {
    const { title, name, isRequired ,fieldFile} = props;
 
    const { errors, touched, getFieldProps, isSubmitting, setFieldValue, values } = useFormikContext();
 
  
    const [uploadedImage, setUploadedImage] = useState<any>(toAbsoluteServerUrl(values[name]));

    const handleChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setFieldValue(fieldFile, event.target.files[0]);
            const fileReader = new FileReader();
            fileReader.readAsDataURL(event.target.files[0]);
            const url :any=URL.createObjectURL(event.target.files[0])
            setUploadedImage(url);
        }
    }
    return (
        <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className={`${isRequired ? 'required' : ''} fw-bold fs-6 mb-2`}>{title}</label>
            <input
                placeholder={title}
               // {...getFieldProps({ name })}
                type={"file"}
                name={name}
            
                onChange={handleChange}
                className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    { 'is-invalid': touched[name] && errors[name] },
                    {
                        'is-valid': touched[name] && !errors[name],
                    }
                )}
                autoComplete='off'
                disabled={isSubmitting}
            />
            {touched[name] && errors[name] && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                        <span role='alert'>{errors[name]}</span>
                    </div>
                </div>
            )}
            {
                uploadedImage && fieldFile!=FieldLink && (
                    <Image
                        src={uploadedImage}
                        thumbnail
                        style={{ width: '120px' }}
                    />
                )
            }
            {/* end::Input */}
        </div>
    );
}

export default FormikInputLabel;
