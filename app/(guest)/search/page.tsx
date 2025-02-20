import PropertyList from '@/app/components/PropertyList'
import SimpleNavbar from '@/app/components/SimpleNavbar'
import React from 'react'

function Properties() {
    return (
        <>
            <SimpleNavbar />
            <div className='mt-8'>

            <PropertyList />
            </div>
        </>
    )
}

export default Properties