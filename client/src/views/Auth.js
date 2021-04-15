import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../contexts/AuthContext'
import { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import '../styles/Auth.css';
import { useLocation } from 'react-router-dom'
import WelCome from './WelCome'
import { useHistory } from 'react-router-dom'

const Auth = ({ authRoute }) => {
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)
const [btnCreateSelected, setCreate]=useState('btn-create-account');
const [btnLoginSelected, setLogin]=useState('btn-login');
const history = useHistory();
const location = useLocation();

const path=location.pathname;
 	let body
 useEffect(()=>{
	 if(path==="/login"){
	setLogin('btn-login-selected');
	setCreate('btn-create-account');
}else if(path==="/register"){
	setCreate('btn-create-account-selected');
	setLogin('btn-login');
} else {
	setCreate('btn-create-account');
	setLogin('btn-login');
}
 	},[path])
	if (authLoading)
		body = (
			<div className='d-flex justify-content-center mt-2'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	else if (isAuthenticated) return <Redirect to='/dashboard' />
	else
		body = (
			<>
				{authRoute === 'login' && <LoginForm />}
				{authRoute === 'register' && <RegisterForm />}
				{authRoute ==='welcome' && <WelCome/>}
			</>
		)

	return (
		<div className='landing'>
			<Row className="wrap-header">
		
				<Col xs={2} className="logo-branch">
				<div style={{float:'left'}}><h3 className="logo-1-the-world">The Word</h3>
					<h3 className="logo-2-data-mapper">Data Mapper</h3>	</div>
				</Col>
			
				<Col xs={8} className="wrap-space"></Col>
				<Col xs={2} className="wrap-action-btn-login">
					<Link className={btnCreateSelected} to="/register" >
						<p> Create Account</p>
					</Link>
					<Link className={btnLoginSelected} to="/login">
						<p> Login</p>
					</Link>
				</Col>
			</Row>
			<div style={{width:'100%', height:'50px'}}></div>
			<div>
				{body}
			</div>
			<div className="wrap-footer">

			</div>
		</div>
	)
}

export default Auth
