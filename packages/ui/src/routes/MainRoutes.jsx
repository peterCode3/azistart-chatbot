import { lazy } from 'react'

// project imports
import MainLayout from '@/layout/MainLayout'
import Loadable from '@/ui-component/loading/Loadable'
import { element } from 'prop-types'

// chatflows routing
const SignIn = Loadable(lazy(() => import('@/views/auth/signin')))
const SignUp = Loadable(lazy(() => import('@/views/auth/signup')))
const LiveChat = Loadable(lazy(() => import('@/views/LiveChat')))
const DataSources = Loadable(lazy(() => import('@/views/LiveChat/DataSource/datasource')))
const GetDetails = Loadable(lazy(() => import('@/views/LiveChat/DataSource/GetDetails')))
const ChatWoot = Loadable(lazy(() => import('@/views/chatwoot/chatwoot')))


const Chatflows = Loadable(lazy(() => import('@/views/chatflows')))
const Calendly = Loadable(lazy(() => import('@/views/calendly')))

// agents routing
const Agentflows = Loadable(lazy(() => import('@/views/agentflows')))

// marketplaces routing
const Marketplaces = Loadable(lazy(() => import('@/views/marketplaces')))

// apikey routing
const APIKey = Loadable(lazy(() => import('@/views/apikey')))

// tools routing
const Tools = Loadable(lazy(() => import('@/views/tools')))

// assistants routing
const Assistants = Loadable(lazy(() => import('@/views/assistants')))

// credentials routing
const Credentials = Loadable(lazy(() => import('@/views/credentials')))

// variables routing
const Variables = Loadable(lazy(() => import('@/views/variables')))

// documents routing
const Documents = Loadable(lazy(() => import('@/views/docstore')))
const DocumentStoreDetail = Loadable(lazy(() => import('@/views/docstore/DocumentStoreDetail')))
const ShowStoredChunks = Loadable(lazy(() => import('@/views/docstore/ShowStoredChunks')))
const LoaderConfigPreviewChunks = Loadable(lazy(() => import('@/views/docstore/LoaderConfigPreviewChunks')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Chatflows />
        },
        {
            path: '/chatflows',
            element: <Chatflows />
        },
        {
            path: '/live-chat',
            element: <LiveChat />
        },
        {
            path: '/data-sources',
            element : <DataSources/>
        },
        {
            path: '/data-sources/added',
            element : <GetDetails/>
        },
        {
            path: '/chatwoot',
            element: <ChatWoot/>
        },
        {
            path: '/signin',
            element: <SignIn />
        },
        {
            path: '/signup',
            element: <SignUp />
        },
        {
            path: '/calendly',
            element: <Calendly />
        },
        {
            path: '/agentflows',
            element: <Agentflows />
        },
        {
            path: '/marketplaces',
            element: <Marketplaces />
        },
        {
            path: '/apikey',
            element: <APIKey />
        },
        {
            path: '/tools',
            element: <Tools />
        },
        {
            path: '/assistants',
            element: <Assistants />
        },
        {
            path: '/credentials',
            element: <Credentials />
        },
        {
            path: '/variables',
            element: <Variables />
        },
        {
            path: '/document-stores',
            element: <Documents />
        },
        {
            path: '/document-stores/:id',
            element: <DocumentStoreDetail />
        },
        {
            path: '/document-stores/chunks/:id/:id',
            element: <ShowStoredChunks />
        },
        {
            path: '/document-stores/:id/:name',
            element: <LoaderConfigPreviewChunks />
        }
    ]
}

export default MainRoutes
