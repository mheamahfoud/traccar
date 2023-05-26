import { FC } from "react";
import { SelectList } from "../../pages/core/models";

/* eslint-disable react-hooks/exhaustive-deps */
interface Props {
    title :string,
    setValue:React.Dispatch<React.SetStateAction<any>>,
    value:any,
    options: SelectList[]
}
const InputSelectFilter : FC<Props>  = ({ title, setValue,value,options}) => {

    return (
        <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='fw-bold fs-6 mb-2'>{title}</label>
            {/* end::Label */}

            {/* begin::Input */}
            <select
                placeholder={title}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                }}

                name='name'
                className={'form-control form-control-solid mb-3 mb-lg-0'}





            >
                <option value={""}>Select OPtion</option>
                {

                    options.map((item) => {
                        return (
                            <option value={item?.value}>{item.text}</option>
                        )
                    })
                }

            </select>

            {/* end::Input */}
        </div>


    )
}

export { InputSelectFilter }
