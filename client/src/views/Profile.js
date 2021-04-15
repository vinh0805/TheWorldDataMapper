
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import Row from 'react-bootstrap/esm/Row'
import { AuthContext } from '../contexts/AuthContext'

import { useHistory } from 'react-router-dom'

const Profile = () => {
	const history = useHistory();
	const { registerUser } = useContext(AuthContext)


    return (

        <div className="wrapper-register-page">
            <Form className="wrap-register-form"  >
                {/* <AlertMessage info={alert} /> */}
                <Row className="wrap-content-register">
                    <h3 className="label-regist">Enter Update Account Information</h3>
                    <button className="back-to-welcome" onClick={() => {
                        history.push('#')
                    }}>

                        X  </button>
                </Row>
                <div style={{ width: '100%', height: '30px' }}></div>
                <Row className="wrap-element">
                    <Form.Label className="label-element">Name </Form.Label>
                    <Form.Group className="input-element">
                        <Form.Control
                            type='text'
                            placeholder='*Enter Name Here* '
                            name='username'
                            required
                            // value={username}
                        />
                    </Form.Group>
                </Row>
                <Row className="wrap-element">
                    <Form.Label className="label-element">Email</Form.Label>
                    <Form.Group className="input-element">
                        <Form.Control
                            type='text'
                            placeholder='*Enter Email Here*'
                            name='Email'
                            required
                            // value={''}
                        />
                    </Form.Group>
                </Row>
                <Row className="wrap-element">
                    <Form.Label className="label-element">Password</Form.Label>
                    <Form.Group className="input-element">
                        <Form.Control
                            type='password'
                            placeholder='Enter Password Here'
                            name='Password'
                            required
                            // value={password}
                        />
                    </Form.Group>
                </Row>
                <Row className="wrap-btn-action-register">
                    <Button className="btn-register-account" variant='success'  >
                        Update
            </Button>
                    <div style={{ width: '10%', height: '100%' }}></div>
                    <Button className="btn-cancel" variant='info'  >
                        Cancel
                </Button>

                </Row>
                <div style={{ width: '100%', height: '30px' }}></div>
            </Form>



        </div>

    )
}

export default Profile;