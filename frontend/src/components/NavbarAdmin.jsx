import React from 'react'

const NavbarAdmin = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme='dark'>
                <div className="container-fluid">
                    <a className="navbar-brand fw-bolder" href="#">Library Admin</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">User</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavbarAdmin
