import React from 'react'
import { navbar_container } from './NavBarClass'

export const NavBar = () => {
    return (
        <div className={navbar_container}>
            <span className='navbar-brand'>
                <i className="fas fa-calendar-alt" />
                &nbsp;Emiliano
            </span>

            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt" />
                <span>Salir</span>
            </button>
        </div>
    )
}
