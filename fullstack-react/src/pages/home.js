import React from 'react'

import {
    Button
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

class Home extends React.Component {
    render () {
        return (
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
               <h1>THIS IS HOME</h1>
               <Button variant='primary' as={Link} to='/product'>Go To Products Page</Button>
            </div>
        )
    }
}

export default Home