/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {MenuComponent} from '../../../../../../../../_metronic/assets/ts/components'
import {ID, } from '../../../../../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {ActionButton} from '../../../../../components/buttons/ActionButton'
import {MenuActionItem} from '../../../../../components/Menu/MenuActionItem'
import {MenuActionWrapper} from '../../../../../components/Menu/MenuActionWrapper'
import { EditPath } from '../../../routes/RoutesNames'
import { useAuth } from '../../../../../../auth'
import { CarOutService } from '../../core/_models'
type Props = {
  data: CarOutService
}

const ActionsCell: FC<Props> = ({data}) => {
  const navigate = useNavigate()
  const { currentUser } = useAuth();
  const intl = useIntl()
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const handleEdit = () => {
    navigate(EditPath, {state: data})
  }

  

  return (
    <>
      <ActionButton />
      <MenuActionWrapper>
      { currentUser?.roles.includes('update_car_out_service') &&    <MenuActionItem title={intl.formatMessage({id: 'edit'})} onCLick={handleEdit} />}
      </MenuActionWrapper>

    </>
  )
}

export {ActionsCell}
