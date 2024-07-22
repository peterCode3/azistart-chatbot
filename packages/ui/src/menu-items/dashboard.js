// assets
import {
    IconUsersGroup,
    IconHierarchy,
    IconBuildingStore,
    IconKey,
    IconTool,
    IconLock,
    IconRobot,
    IconVariable,
    IconFiles,
    IconMessageCircle,
    IconCalendarEvent,
} from '@tabler/icons-react'

// constant
const icons = { IconUsersGroup, IconHierarchy, IconBuildingStore, IconKey, IconTool, IconLock, IconRobot, IconVariable, IconFiles, IconMessageCircle, IconCalendarEvent }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'chatflows',
            title: 'Bot Builder',
            type: 'item',
            url: '/chatflows',
            icon: icons.IconHierarchy,
            breadcrumbs: true
        },
        {
            id: 'chatwoot',
            title: 'Chat Woot',
            type: 'item',
            url: '/chatwoot',
            icon: icons.IconMessageCircle,
            breadcrumbs: true
        },
        {
            id: 'calendly',
            title: 'Calendly - Integration',
            type: 'item',
            url: '/calendly',
            icon: icons.IconCalendarEvent,
            breadcrumbs: true
        },
        {
            id: 'agentflows',
            title: 'Send An Email',
            type: 'item',
            url: '/agentflows',
            icon: icons.IconUsersGroup,
            breadcrumbs: true,
            isBeta: true
        },
        {
            id: 'live-chat-settings',
            title: 'Data Sources',
            type: 'item',
            icon: icons.IconMessageCircle,
            url: '/data-sources',
            breadcrumbs: true
        },
        {
            id: 'chat',
            title: 'Live Chat',
            type: 'item',
            url: '/live-chat',
            icon: icons.IconMessageCircle,
            breadcrumbs: true,
        },
        {
            id: 'marketplaces',
            title: 'AI Lead Gen Assistant',
            type: 'item',
            url: '/marketplaces',
            icon: icons.IconBuildingStore,
            breadcrumbs: true
        },
        {
            id: 'tools',
            title: 'Bot CRM & Editor',
            type: 'item',
            url: '/tools',
            icon: icons.IconTool,
            breadcrumbs: true
        },
        {
            id: 'assistants',
            title: 'Appointment / Meeting',
            type: 'item',
            url: '/assistants',
            icon: icons.IconRobot,
            breadcrumbs: true
        },
        // {
        //     id: 'credentials',
        //     title: 'Credentials',
        //     type: 'item',
        //     url: '/credentials',
        //     icon: icons.IconLock,
        //     breadcrumbs: true
        // },
        // {
        //     id: 'variables',
        //     title: 'Variables',
        //     type: 'item',
        //     url: '/variables',
        //     icon: icons.IconVariable,
        //     breadcrumbs: true
        // },
        // {
        //     id: 'apikey',
        //     title: 'API Keys',
        //     type: 'item',
        //     url: '/apikey',
        //     icon: icons.IconKey,
        //     breadcrumbs: true
        // },
        {
            id: 'document-stores',
            title: 'Document Stores',
            type: 'item',
            url: '/document-stores',
            icon: icons.IconFiles,
            breadcrumbs: true
        }
    ]
}

export default dashboard
