import React from 'react';
import { Link } from 'react-router-dom';
import { client } from '../Client';

const TopBar = (props) => (
  <div className='ui huge top attached fluid secondary menu'>
    <div className='item' />
    <div className='item'>
      <h1
        className='ui green header'
        style={{ marginTop: '10px' }}
      >
        WorksTracker
      </h1>
    </div>
    <div className='right menu'>
      <Link className='ui item' to='/'>Home</Link>
      <Link className='ui item' to='/projects'>Projects</Link>
      <Link className='ui item' to='/profile'>Profile</Link>
      {
        client.isLoggedIn() ? (
          <Link className='ui item' to='/logout'>
            Logout
          </Link>
        ) : (
          <Link className='ui item' to='/login'>
            Login
          </Link>
        )
      }
    </div>
  </div>
); 

export default TopBar;
