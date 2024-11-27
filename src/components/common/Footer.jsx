import React from 'react'
import '../presentation/Footer.css'

const FooterComponent = () => {
    return (
        <div>
            <footer className='footer'>
                <span>Aishwarya J Panampilly {new Date().getFullYear()} </span>
            </footer>
        </div>
    )
}

export default FooterComponent