import AuthLayout from '@/views/auth/AuthLayout'
import { lazy } from 'react'

const SignIn = Loadable(lazy(() => import('@/views/auth/signin')))
const SignUp = Loadable(lazy(() => import('@/views/auth/signup')))
const AuthRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/signin',
            element: <SignIn />
        },
        {
            path: '/signup',
            element: <SignUp />
        },
    ]
}

export default AuthRoutes
