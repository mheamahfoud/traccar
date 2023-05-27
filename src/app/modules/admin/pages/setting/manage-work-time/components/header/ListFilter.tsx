import { useEffect, useState } from 'react'
import { MenuComponent } from '../../../../../../../../_metronic/assets/ts/components'
import { initialQueryState } from '../../../../../../../../_metronic/helpers'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { FilterMenuHoc } from '../../../../../components/table/filter/FilterMenuHoc'
import { InputFilter } from '../../../../../components/fields/InputFilter'
import { useIntl } from 'react-intl'





const ListFilter = () => {
  const intl = useIntl();
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [color, setColor] = useState<string | undefined>("")
  const [name, setName] = useState<string | undefined>("")
  const [code, setCode] = useState<string | undefined>("")
  const [time_in, setTimein] = useState<string | undefined>("")
  const [time_out, setTimeout] = useState<string | undefined>("")


  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({ filtter: undefined, ...initialQueryState })
  }

  const filterData = () => {
   
    updateState({
      filtter: { color },
      ...initialQueryState,
    })
  }
  return (
    <>
      <FilterMenuHoc isLoading={isLoading} handleFilter={filterData} handleReset={resetData}>
        {/* begin::Input group */}
        <div className="row">
          <div className="col">
            <InputFilter value={color} setValue={setColor} title={intl.formatMessage({ id: 'color' })} />
          </div>
          <div className="col">
            <InputFilter value={color} setValue={setName} title={intl.formatMessage({ id: 'name' })} />
          </div>
          <div className="col">
            <InputFilter value={color} setValue={setCode} title={intl.formatMessage({ id: 'code' })} />
          </div>
       
          <div className="col">
            <InputFilter value={color} setValue={setTimein} title={intl.formatMessage({ id: 'time_in' })}  type="time"/>
          </div>
          <div className="col">
            <InputFilter value={color} setValue={setTimeout} title={intl.formatMessage({ id: 'time_out' })} type="time" />
          </div>

          
        </div>

      </FilterMenuHoc>


    </>
  )
}

export { ListFilter }
