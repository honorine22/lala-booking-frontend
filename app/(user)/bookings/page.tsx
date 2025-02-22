import React from 'react'
import RenterDashboard from '../../components/RenterDashboard'
import SimpleNavbar from '@/app/components/SimpleNavbar'

function page() {
    return (
        <>
            <SimpleNavbar />
            <RenterDashboard />
        </>
    )
}

export default page