import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../Client';
import { connect } from 'react-redux';

const TopBar = (props) => {
  return (
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
          props.isLoggedIn ? (
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
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps, null)(TopBar);
