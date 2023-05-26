/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { KTIcon } from '../../../../helpers'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers' />
      <SidebarMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='cross-circle'>
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Admin</span>
        </div>
      </div>

      <SidebarMenuItemWithSub
        to='/admin/vehicles'
        icon='abstract-28'
        title='Manage Vehicles'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem
          to='/admin/vehicles/manage-vehicles'
          title={intl.formatMessage({ id: 'manage_vehicles' })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/admin/vehicles/vehicle-types'
          title={intl.formatMessage({ id: 'vehicle_types' })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/admin/vehicles/vehicle-makers'
          title={intl.formatMessage({ id: 'vehicle_makers' })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/admin/vehicles/vehicle-models'
          title={intl.formatMessage({ id: 'vehicle_models' })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/admin/vehicles/vehicle-colors'
          title={intl.formatMessage({ id: 'vehicle_colors' })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/admin/vehicles/vehicle-groups'
          title={intl.formatMessage({ id: 'vehicle_groups' })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem
        to='/admin/stations/manage-stations'
        icon='abstract-28'
        title={intl.formatMessage(
          { id: 'manage_object' },
          { name: intl.formatMessage({ id: 'stations' }) }
        )}
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/admin/terminals/manage-terminals'
        icon='abstract-28'
        title={intl.formatMessage(
          { id: 'manage_object' },
          { name: intl.formatMessage({ id: 'terminals' }) }
        )}
        fontIcon='bi-layers'
      />

      <SidebarMenuItem
        to='/admin/trips/manage-trips'
        icon='abstract-28'
        title={intl.formatMessage(
          { id: 'manage_object' },
          { name: intl.formatMessage({ id: 'trips' }) }
        )}
        fontIcon='bi-layers'
      />

      <SidebarMenuItemWithSub
        to='/admin/working-days'
        icon='abstract-28'
        title={intl.formatMessage(
          { id: 'manage_object' },
          { name: intl.formatMessage({ id: 'working_days' }) }
        )}
        fontIcon='bi-layers'
      >
        <SidebarMenuItem
          to='/admin/working-days/manage-cars'
          title={intl.formatMessage({ id: 'cars_working_days' })}
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/admin/working-days/manage-drivers'
          title={intl.formatMessage({ id: 'drivers_working_days' })}
          hasBullet={true}
        />

      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to='/admin/reports'
        icon='abstract-28'
        title='Manage Report'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem
          to='/admin/reports/reply-map'
          title={intl.formatMessage({ id: 'reply_map' })}
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem
        to='/admin/public-map/all'
        icon='abstract-28'
        title={intl.formatMessage({ id: 'public_map' })}
        fontIcon='bi-layers'
      />

      <SidebarMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='element-plus'
      >
        <SidebarMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <SidebarMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <SidebarMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <SidebarMenuItem
            to='/crafted/pages/profile/campaigns'
            title='Campaigns'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/documents'
            title='Documents'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <SidebarMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='profile-circle'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='cross-circle'>
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='element-7'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='message-text-2'
      >
        <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to='/apps/user-management/users'
        icon='abstract-28'
        title='User management'
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTIcon iconName='code' className='fs-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div>
    </>
  )
}

export { SidebarMenuMain }
