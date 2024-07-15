import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { FaPenToSquare } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { Dropdown, Button, Container } from "react-bootstrap";
import { IconContext } from "react-icons";
import UserAvatar from '../Avatar';
import { useMutation, useQuery } from '@apollo/client';
import { GET_AUTHENTICATED_USER } from '../../graphql/queries/userQuery';
import './header.css';
import { LOGOUT } from '../../graphql/mutations/userMutation';

function Header() {
    const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
    console.log(data);
    const [logout, { loading: logoutLoading, client }] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});

    

    const handleLogout = async () => {
		try {
			await logout();
			client.resetStore();
		} catch (error) {
			console.error("Error logging out:", error);
			toast.error(error.message);
		}
	};

    return (
        <Container>
            <IconContext.Provider value={{ size: '1.5em' }}>
                <div className='d-flex flex-row align-items-center py-2 width justify-content-center'>
                    <div className="d-flex flex-row align-items-center justify-content-center">
                        <Link to="/" className='brand'><h1>Bulletin</h1></Link>
                        {data?.authUser ?<div className="search d-flex flex-row align-items-center px-2">
                            <CiSearch />
                            <input type="text" placeholder="Search" />
                        </div> : null}
                        
                    </div>

                   {data.authUser? <div className="d-flex flex-row align-items-center px-3">
                       { data.authUser? <Link to='/create'>
                                <div className="write d-flex flex-row">
                                    <FaPenToSquare />
                                </div>
                            </Link> : null}
                        <Link to='/'>
                            <div className="notification px-3">
                                <FaBell />
                            </div>
                        </Link>
                        {data?.authUser ? (
                            <Dropdown>
                                <Dropdown.Toggle as={Button} variant="link" className="p-0">
                                    <UserAvatar size={75} src={data.authUser.profilePic} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    <Dropdown.Item className='drop-down' as={Link} to="/my-profile">Profile </Dropdown.Item>
                                    <Dropdown.Item className='drop-down' as={Link} to="/my-blogs">My Blogs</Dropdown.Item>
                                    <Dropdown.Item className='drop-down' as={Link} to="/create">New Blog</Dropdown.Item>
                                    <Dropdown.Item className='drop-down' as={Link} to="/saved-blogs">Saved Blogs</Dropdown.Item>
                                    <Dropdown.Item className='drop-down' onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Link to="/login">
                                <Button
                                    type='submit'
                                    className='submit-button-white font-bold py-2 px-4 fs-6 rounded focus:outline-none focus:shadow-outline mx-auto'
                                    disabled={loading}
                                    size="lg"
                                >
                                    LOGIN
                                </Button>
                            </Link>
                        )}
                    </div> : null}
                </div>
            </IconContext.Provider>
        </Container>
    );
}

export default Header;
