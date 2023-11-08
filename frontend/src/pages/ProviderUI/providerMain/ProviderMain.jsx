import React from 'react'

import { NavLink, Outlet } from 'react-router-dom';
import Info from "../../../components/provider_info/Info"
import AddSchedule from '../../../components/provider_info/AddSchedule';
import Service from '../../../components/provider_info/Service';

const ProviderMain = () => {
  return (
    
<div style={{height:"100vh"}}>
    <Info/>
    <Service/>
    <AddSchedule/>
    <Outlet/>
    </div>
 

  )
}

export default ProviderMain

