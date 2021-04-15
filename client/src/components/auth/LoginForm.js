import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
import Row from 'react-bootstrap/esm/Row'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
	// Context
	const { loginUser } = useContext(AuthContext)
	const history = useHistory();

	// Local state
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})

	const [alert, setAlert] = useState(null)

	const { username, password } = loginForm

	const onChangeLoginForm = event =>
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

	const login = async event => {
		event.preventDefault()

		try {
			const loginData = await loginUser(loginForm)
			if (!loginData.success) {
				setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
	
		<div className="wrapper-register-page">
			<Form className="wrap-register-form"  >
				{/* <AlertMessage info={alert} /> */}
				<Row className="wrap-content-register">
					<h3 className="label-regist">Login to your account</h3>
					<button className="back-to-welcome" onClick={()=>{
							history.push('/welcome')
					}}>
					 
						X  </button>
				</Row>
				<div style={{width:'100%', height:'30px'}}></div>
				 
				<Row className="wrap-element">
				<Form.Label className="label-element">Email</Form.Label>
					<Form.Group className="input-element">
						<Form.Control
							type='text'
							placeholder='*Enter Email Here*'
							name='Email'
							required
							value={'' }
							// onChange={onChangeRegisterForm}
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
							value={password}
							// onChange={onChangeRegisterForm}
						/>
					</Form.Group>
				</Row>
			<Row className="wrap-btn-action-register">	
				<Button className="btn-register-account" variant='success'  >
				  	Login
				</Button>
			<div style={{width:'10%', height:'100%'}}></div>
				<Button  className="btn-cancel" variant='info'  >
					Cancel
					</Button>
		
			</Row>
			<div style={{width:'100%', height:'30px'}}></div>
			</Form>

		

		</div>
	)
}

export default LoginForm
