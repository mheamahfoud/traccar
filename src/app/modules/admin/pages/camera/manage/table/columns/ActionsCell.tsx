/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {MenuComponent} from '../../../../../../../../_metronic/assets/ts/components'
import {ID, } from '../../../../../../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {ActionButton} from '../../../../../components/buttons/ActionButton'
import {MenuActionItem} from '../../../../../components/Menu/MenuActionItem'
import {MenuActionWrapper} from '../../../../../components/Menu/MenuActionWrapper'
import { ViewCameraVehiclePath } from '../../../routes/RoutesNames'
import { useAuth } from '../../../../../../auth'
type Props = {
  id: ID
}

const ActionsCell: FC<Props> = ({id}) => {
  const navigate = useNavigate()
  const { currentUser } = useAuth();
  const intl = useIntl()
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const handleView = () => {
    navigate(ViewCameraVehiclePath, {state: id})
  }

  

  return (
    <>
      <ActionButton />
      <MenuActionWrapper>
      { currentUser?.roles.includes('view_camera_vehicle') &&    <MenuActionItem title={intl.formatMessage({id: 'view'})} onCLick={handleView} />}
      </MenuActionWrapper>

    </>
  )
}

export {ActionsCell}
