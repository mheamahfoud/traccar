import { useEffect, useState } from 'react'
import { MenuComponent } from '../../../../../../../../_metronic/assets/ts/components'
import { QUERIES, initialQueryState } from '../../../../../../../../_metronic/helpers'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { FilterMenuHoc } from '../../../../../components/table/filter/FilterMenuHoc'
import { InputFilter } from '../../../../../components/fields/InputFilter'
import { useIntl } from 'react-intl'
import { InputSelectFilter } from '../../../../../components/fields/inputSelectFilter'
import { getRegiosList } from '../../../../core/commonRequests'
import { useQuery } from 'react-query'





const ListFilter = () => {
  const intl = useIntl();
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [enableApi, setEnableApi] = useState(true)
  const [vehicle, setVehicle] = useState<string | undefined>("")
  const [region, setRegion] = useState<string | undefined>("")
  const {
    data: regiosList,
  } = useQuery(
    `${QUERIES.ALL_REGION_Working_LIST_VALUES}`,
    () => {
      return getRegiosList()
    },
    {
      enabled: enableApi
    }
  )

  useEffect(() => {
    MenuComponent.reinitialization()
    if (regiosList) {
      setEnableApi(false)
    }
  }, [regiosList])

  const resetData = () => {
    updateState({ filtter: undefined, ...initialQueryState })
  }

  const filterData = () => {

    updateState({
      filtter: { vehicle, region },
      //  ...initialQueryState,
    })
  }
  return (
    <>
      <FilterMenuHoc isLoading={isLoading} handleFilter={filterData} handleReset={resetData}>
        {/* begin::Input group */}
        <div className="row">

          <div className="col">
            <InputSelectFilter value={vehicle} setValue={setVehicle} title={intl.formatMessage({ id: 'vehicle' })} options={regiosList || []} />
          </div>
          <div className="col">
            <InputSelectFilter value={region} setValue={setRegion} title={intl.formatMessage({ id: 'region' })} options={regiosList || []} />
          </div>
        </div>

      </FilterMenuHoc>


    </>
  )
}

export { ListFilter }
