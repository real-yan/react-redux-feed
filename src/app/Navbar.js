import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchNotifications, selectAllNotifications } from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter(notification => !notification.read).length
  
  const fecthNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  return (
    <nav>
      <section>
        <h1>Social Media Feed</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link> 
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {numUnreadNotifications > 0 && <span className="badge">{numUnreadNotifications}</span>}
            </Link>
          </div>
          <button className="button" onClick={fecthNewNotifications}>
            Refresh Notifications  
          </button> 
        </div>
      </section>
    </nav>
  )
}
