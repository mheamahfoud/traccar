import { useEffect, useState } from 'react'
import { MenuComponent } from '../../../../../../../../_metronic/assets/ts/components'
import { QUERIES, initialQueryState } from '../../../../../../../../_metronic/helpers'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { FilterMenuHoc } from '../../../../../components/table/filter/FilterMenuHoc'
import { InputFilter } from '../../../../../components/fields/InputFilter'
import { useIntl } from 'react-intl'
import { InputSelectFilter } from '../../../../../components/fields/inputSelectFilter'
import { TripType, tripTypeList } from '../../core/_models'
import { useQuery } from 'react-query'
import { geExternalRegionTrips, getRegionTrips, getRegionsByTypeList } from '../../core/_requests'
import { getGroupListByRegion } from '../../../../core/commonRequests'





const ListFilter = () => {
  const intl = useIntl();
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [date, setDate] = useState<string | undefined>("")
  const [type, setType] = useState<number | undefined>(null)
  const [region, setRegion] = useState<string | undefined>(null)

  const [from, setFrom] = useState<string | undefined>(null)
  const [to, setTo] = useState<string | undefined>(null)

  const [enableApi, setEnableApi] = useState<boolean>(true);
  useEffect(() => {
    if (type) {
      setTo(null)
      setFrom(null)
    }
  }, [type])
  //#region api
  const {
    data: regiosList,
  } = useQuery(
    `${QUERIES.ALL_REGION_TYPE_LIST_VALUES}-${type}`,
    () => {
      return getRegionsByTypeList(1)
    },
    {
      // enabled: enableApi
    }
  )
  const {
    data: regionTrips,
  } = useQuery(
    `${QUERIES.ALL_REGION_TRIPS__LIST_VALUES}-${region}`,
    () => {
      return getRegionTrips(region)
    },
    {
      // enabled: enableApi
    }
  )

  const {
    data: externalTrip,
  } = useQuery(
    `${QUERIES.ALL_EXTERNAL_REGION__TRIPS_LIST_VALUES}-${region}`,
    () => {
      return geExternalRegionTrips()
    },
    {
      enabled: type == 2
    }
  )

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({ filtter: undefined, ...initialQueryState })
  }

  const filterData = () => {

    updateState({
      filtter: { date, type, from, to },
      ...initialQueryState,
    })
  }
  return (
    <>
      <FilterMenuHoc isLoading={isLoading} handleFilter={filterData} handleReset={resetData}>
        {/* begin::Input group */}
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <InputFilter value={date} setValue={setDate} title={intl.formatMessage({ id: 'date' })} type={'date'} />
          </div>
          <div className="col-md-6 col-sm-12">
            <InputSelectFilter value={type} setValue={setType} title={intl.formatMessage({ id: 'type' })} options={tripTypeList} />
          </div>
          <div className="col-md-6 col-sm-12">
            <InputSelectFilter value={region} setValue={setRegion} title={intl.formatMessage({ id: 'region' })} options={regiosList || []} />
          </div>


          <div className="col-md-6 col-sm-12">
            <InputSelectFilter value={from} setValue={setFrom} title={intl.formatMessage({ id: 'from' })} options={regionTrips || []} />
          </div>
          <div className="col-md-6 col-sm-12">
            {type != TripType.Other && <InputSelectFilter value={to} setValue={setTo} title={intl.formatMessage({ id: 'to' })} options={(type == TripType.Internal ? regionTrips : externalTrip) || []} />
            }
            {type == TripType.Other && <InputFilter value={to} setValue={setTo} title={intl.formatMessage({ id: 'to' })} />
            }
          </div>
        </div>
      </FilterMenuHoc>


    </>
  )
}

export { ListFilter }
