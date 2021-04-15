import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import UpdatePostModal from '../components/posts/UpdatePostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import "../styles/Welcome.css"
const WelCome = () => {


    const {
        postState: { post, posts, postsLoading },
        getPosts,
        setShowAddPostModal,
        showToast: { show, message, type },
        setShowToast
    } = useContext(PostContext)

    // Start: Get all posts

    return (

        <div className="wrap-welcome-page">
            <div className="welcome-page">
                <div className="image-planet"></div>
                <div style={{ width: '100%', height: '30px' }}></div>
                <div className="wrap-content-welcome">
                    <h3 className="h3-content">Welcome To The</h3>
                    <h3 className="h3-content">World Data Mapper</h3>
                </div>
                <div style={{width:'100%', height:'50px'}}></div>

            </div>
        </div>
    )
}

export default WelCome
