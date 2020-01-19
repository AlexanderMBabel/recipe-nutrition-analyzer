import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <div className='flex flex-wrap p-5 bg-gray-700 rounded-b-lg shadow-md min-h-16 justify-between'>

            <Link to='/'>
                <div className='text-gray-100 font-raleway font-bold'>Home</div>
            </Link>
            <Link to='/recipe'>
                <div className='text-gray-100 font-raleway font-bold'>Recipe</div>
            </Link>
            
        </div>
    )
}

export default Nav
