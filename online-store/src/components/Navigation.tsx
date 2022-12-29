import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <nav className='w-[100%] bg-gray-600 h-8 text-center'>
            <span>
                <Link className="mb-2 mr-8" to='/'>Shop</Link>
                <Link to='/cart'>ShopCart</Link>
            </span>
        </nav>
    )
}