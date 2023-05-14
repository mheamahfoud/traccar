import { useEffect, useState } from 'react'
import { MenuComponent } from '../../../../../../../../_metronic/assets/ts/components'
import { initialQueryState } from '../../../../../../../../_metronic/helpers'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import CheckBoxFilter from '../../../../../components/fields/checkBoxFilter'
import { FilterMenuHoc } from '../../../../../components/table/filter/FilterMenuHoc'
import { InputFilter } from '../../../../../components/fields/InputFilter'
import { useIntl } from 'react-intl'





const ListFilter = () => {
  const intl = useIntl();
  const { updateState } = useQueryRequest()
  const { isLoading } = useQueryResponse()
  const [make, setMake] = useState<string | undefined>("")



  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({ filtter: undefined, ...initialQueryState })
  }

  const filterData = () => {
   
    updateState({
      filtter: { make },
      ...initialQueryState,
    })
  }
  return (
    <>
      <FilterMenuHoc isLoading={isLoading} handleFilter={filterData} handleReset={resetData}>
        {/* begin::Input group */}
        <div className="row">
          <div className="col">
            <InputFilter value={make} setValue={setMake} title={intl.formatMessage({ id: 'make' })} />
          </div>
        </div>

      </FilterMenuHoc>


    </>
  )
}

export { ListFilter }
