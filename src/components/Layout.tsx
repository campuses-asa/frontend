import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  
  return (
    <div>
      {/* Navigation / other components which show on every page */}


      <Outlet />
    </div>
  )
}