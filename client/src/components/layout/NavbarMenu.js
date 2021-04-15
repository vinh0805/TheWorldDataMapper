import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import { useHistory } from 'react-router-dom'
import { useCallback, useEffect, useReducer, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import { useLocation } from 'react-router-dom'


const NavbarMenu = () => {
	// const {
	// authState: {
	// user: { username }
	// },
	// logoutUser
	// } = useContext(AuthContext)

	// const logout = () => logoutUser()
const username="hi abc"
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)
const [btnCreateSelected, setCreate]=useState('btn-create-account');
const [btnLoginSelected, setLogin]=useState('btn-login');
const history = useHistory();
const location = useLocation();


	return (
		<div>
			<Row className="wrap-header">

				<Col xs={2} className="logo-branch">
					<div style={{ float: 'left' }}><h3 className="logo-1-the-world">The Word</h3>
						<h3 className="logo-2-data-mapper">Data Mapper</h3>	</div>
				</Col>

				<Col xs={8} className="wrap-space"></Col>
				<Col xs={2} className="wrap-action-btn-login">
					<p className={btnCreateSelected} style={{
						textTransform:'capitalize'
					}} >
						{username}
					</p>
					<Link className={btnLoginSelected} to="/login">
						<p> Login</p>
					</Link>
				</Col>
			</Row>
			<div style={{ width: '100%', height: '50px' }}></div>
		</div>

	)
}

export default NavbarMenu
