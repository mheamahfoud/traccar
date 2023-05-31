import { useEffect, useState } from 'react'
import { MenuComponent } from '../../../../../../../../_metronic/assets/ts/components'
import { QUERIES, initialQueryState } from '../../../../../../../../_metronic/helpers'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { FilterMenuHoc } from '../../../../../components/table/filter/FilterMenuHoc'
import { InputFilter } from '../../../../../components/fields/InputFilter'
import { useIntl } from 'react-intl'
import { InputSelectFilter } from '../../../../../components/fields/inputSelectFilter'
import { getDriverList, getVehicleList } from '../../../../core/commonRequests'
import { useQuery } from 'react-query'





const ListFilter = () => {
  const intl = useIntl();
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [month, setMonth] = useState<string | undefined>(null)
  const [year, setYear] = useState<string | undefined>(null)

  const [driver, setDriver] = useState<string | undefined>(null)
  const [enableApi, setEnableApi] = useState(true)


  const {
    data: driverList,
  } = useQuery(
    `${QUERIES.ALL_DRIVER_LIST_VALUES}`,
    () => {
      return getDriverList()
    },
    {
      enabled: enableApi
    }
  )

  useEffect(() => {
    if (driverList) {
      setEnableApi(false)
    }
  }, [driverList])

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({ filtter: undefined, ...initialQueryState })
  }

  const filterData = () => {

    updateState({
      filtter: { year,month,driver },
      ...initialQueryState,
    })
  }
  return (
    <>
      <FilterMenuHoc isLoading={isLoading} handleFilter={filterData} handleReset={resetData}>
        {/* begin::Input group */}
        <div className="row">
          <div className="col-6">
            <InputFilter value={year} setValue={setYear} title={intl.formatMessage({ id: 'year' })}  />
          </div>
          <div className="col-6">
            <InputFilter value={month} setValue={setMonth} title={intl.formatMessage({ id: 'month' })} />
          </div>
          <div className="col-12">
            <InputSelectFilter value={driver} setValue={setDriver} title={intl.formatMessage({ id: 'driver' })} options={driverList || []} />
          </div>
        </div>

      </FilterMenuHoc>


    </>
  )
}

export { ListFilter }
