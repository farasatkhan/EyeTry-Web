import React from 'react'
import TrackOrderTable from '../../../components/ui/User/OrderComponets/TrackOrder'

export default function TrackOrders() {
  return (
    <div className=' min-h-screen '>
        <div>
            <h1 className='mx-auto font-mono text-3xl mt-12 font-bold text-center'>Track Your Orders</h1>
            <div className="h-1 w-full mt-2 mb-5 bg-blue-600 lg:w-1/3 mx-auto rounded-full"></div>
        </div>
        <div className='mt-10 w-[80%] mx-auto'>
        < TrackOrderTable />
        </div>
    </div>
  )
}
