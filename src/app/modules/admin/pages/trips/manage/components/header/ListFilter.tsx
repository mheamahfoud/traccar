import { useEffect, useState } from 'react'
import { MenuComponent } from '../../../../../../../../_metronic/assets/ts/components'
import { initialQueryState } from '../../../../../../../../_metronic/helpers'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { FilterMenuHoc } from '../../../../../components/table/filter/FilterMenuHoc'
import { InputFilter } from '../../../../../components/fields/InputFilter'
import { useIntl } from 'react-intl'
import { InputSelectFilter } from '../../../../../components/fields/inputSelectFilter'
import { tripTypeList } from '../../core/_models'





const ListFilter = () => {
  const intl = useIntl();
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [date, setDate] = useState<string | undefined>("")
  const [type, setType] = useState<number | undefined>(null)
  const [from, setFrom] = useState<string | undefined>("")
  const [to, setTo] = useState<string | undefined>("")

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({ filtter: undefined, ...initialQueryState })
  }

  const filterData = () => {
   
    updateState({
      filtter: { date ,type,from,to},
      ...initialQueryState,
    })
  }
  return (
    <>
      <FilterMenuHoc isLoading={isLoading} handleFilter={filterData} handleReset={resetData}>
        {/* begin::Input group */}
        <div className="row">
          <div className="col">
            <InputFilter value={date} setValue={setDate} title={intl.formatMessage({ id: 'name' })} type={'date'} />
          </div>
          <div className="col">
            <InputSelectFilter value={type} setValue={setType} title={intl.formatMessage({ id: 'type' })} options={tripTypeList} />
          </div>
        </div>
        <div className="row">
          <div className="col">
          <InputFilter value={from} setValue={setFrom} title={intl.formatMessage({ id: 'from' })}  />
          </div>
          <div className="col">
          <InputFilter value={to} setValue={setTo} title={intl.formatMessage({ id: 'to' })} />
          </div>
        </div>
      </FilterMenuHoc>


    </>
  )
}

export { ListFilter }
