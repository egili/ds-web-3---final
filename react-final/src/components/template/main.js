import './main.css';
import React from 'react';
import Header from './header';

export default function Main(props) {
    return (
        <div className="content">
            <Header {...props} />
            <main className='main'> 
                {props.children} 
            </main>
        </div>
    )
}