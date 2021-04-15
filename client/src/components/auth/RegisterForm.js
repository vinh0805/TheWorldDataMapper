import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
 import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
 import Row from 'react-bootstrap/esm/Row'
import '../../styles/Register.css'
import { useHistory } from 'react-router-dom'


const RegisterForm = (props) => {
	// Context
	const { registerUser } = useContext(AuthContext)
	const history = useHistory();
	// Local state
	const [registerForm, setRegisterForm] = useState({
		username: '',
		password: '',
		confirmPassword: ''
	})

	const [alert, setAlert] = useState(null)
 	const { username, password, confirmPassword } = registerForm

	const onChangeRegisterForm = event =>
		setRegisterForm({
			...registerForm,
			[event.target.name]: event.target.value
		})

	const register = async event => {
		event.preventDefault()

		if (password !== confirmPassword) {
			setAlert({ type: 'danger', message: 'Passwords do not match' })
			setTimeout(() => setAlert(null), 5000)
			return
		}

		try {
			const registerData = await registerUser(registerForm)
			if (!registerData.success) {
				setAlert({ type: 'danger', message: registerData.message })
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
					<h3 className="label-regist">Create a new account</h3>
					<button className="back-to-welcome" onClick={()=>{
							history.push('/welcome')
					}}>
					 
						X  </button>
				</Row>
				<div style={{width:'100%', height:'30px'}}></div>
				<Row className="wrap-element">
				<Form.Label className="label-element">Name </Form.Label>
					<Form.Group className="input-element">
						<Form.Control
							type='text'
							placeholder='*Enter Name Here* '
							name='username'
							required
							value={username}
							onChange={onChangeRegisterForm}
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
							value={'' }
							onChange={onChangeRegisterForm}
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
							onChange={onChangeRegisterForm}
						/>
					</Form.Group>
				</Row>
			<Row className="wrap-btn-action-register">	
				<Button className="btn-register-account" variant='success'  >
				  	Create Account 
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

export default RegisterForm
