import React from 'react';
import { toAbsoluteServerUrl } from '../../../../../_metronic/helpers';
interface Props {
    title: string,
    imgSrc: string,

}
const ImageDetail = (props: Props) => {
    const { title, imgSrc } = props;
    return (
        <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>{title}</label>

            <div className='col-lg-8'>
                <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                    <img src={toAbsoluteServerUrl(imgSrc)} className='w-100' />
                </div>
            </div>
        </div>
    );
}

export default ImageDetail;
