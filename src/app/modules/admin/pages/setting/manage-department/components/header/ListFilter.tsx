import { useEffect, useState } from 'react'
import { MenuComponent } from '../../../../../../../../_metronic/assets/ts/components'
import { QUERIES, initialQueryState } from '../../../../../../../../_metronic/helpers'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { FilterMenuHoc } from '../../../../../components/table/filter/FilterMenuHoc'
import { InputFilter } from '../../../../../components/fields/InputFilter'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-query'
import { getBuildingListList, getCityList } from '../../../../core/commonRequests'
import { InputSelectFilter } from '../../../../../components/fields/inputSelectFilter'





const ListFilter = () => {
  const intl = useIntl();
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [name, setName] = useState<string | undefined>("")
  const [building, setBuilding] = useState<string | undefined>("")
  const [parent, setParent] = useState<string | undefined>("")

  const [enableApi, setEnableApi] = useState(true)


  const {
    data: buildingList,
  } = useQuery(
    `${QUERIES.ALL_BUILDING_LIST_VALUES}`,
    () => {
      return getBuildingListList()
    },
    {
      enabled: enableApi
    }
  )
  useEffect(() => {
    if (buildingList) {
      setEnableApi(false)
    }
  }, [buildingList])
  
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({ filtter: undefined, ...initialQueryState })
  }

  const filterData = () => {
   
    updateState({
      filtter: { name, building,parent},
      ...initialQueryState,
    })
  }
  return (
    <>
      <FilterMenuHoc isLoading={isLoading} handleFilter={filterData} handleReset={resetData}>
        {/* begin::Input group */}
        <div className="row">
    
          <div className="col-md-6  col-sm-12">
            <InputFilter value={name} setValue={setName} title={intl.formatMessage({ id: 'name' })} />
          </div>
          <div className="col-md-6  col-sm-12">
            <InputFilter value={parent} setValue={setParent} title={intl.formatMessage({ id: 'parent' })} />
          </div>
          <div className="col-md-12  col-sm-12">
            <InputSelectFilter value={building} setValue={setBuilding} title={intl.formatMessage({ id: 'building' })}  options={buildingList || []}/>
          </div>
        
        </div>

      </FilterMenuHoc>


    </>
  )
}

export { ListFilter }
