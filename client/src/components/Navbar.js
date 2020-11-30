import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../App'
import M from 'materialize-css';


const Navbar = () => {
    const SearchModal = useRef(null);
    const [search, setSearch] = useState('');
    const { userState, dispatch } = useContext(userContext);
    const [userDetails, setuserDetails] = useState([]);
    const history = useHistory();

    useEffect(() => {
        M.Modal.init(SearchModal.current)
    }, [])
    
    const renderList = () => {
        return (
            userState ?
                <>
                    <li><i class="modal-trigger material-icons" data-target="modal1" style={{cursor:"pointer"}}>search</i></li>
                    <li><Link to="/notes">Notes</Link></li>
                    <li><Link to="/explore">Explore</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/newpost">Add Post</Link></li>
                    <li><Link to="#"
                        onClick={() => {
                        localStorage.clear()
                        dispatch({ type: 'CLEAR' })
                        history.push('/login')
                        }}>Log Out</Link>
                    </li>
                </>

                :
                <>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </>
        );
    }

    const fetchUsers = async(query) => {
        setSearch(query)
        const res = await fetch(`http://localhost:5000/search_user`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                query
            })
        })
        const data = await res.json();
        setuserDetails(data.user)
    }

    return(
        <nav>
           <div className="nav-wrapper  light-blue darken-1">
                <Link to={userState ? '/' : '/signup'} className="brand-logo">Smvdu Blog</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderList()}
               </ul>
            </div>
            <div id="modal1" className="modal" ref={SearchModal}>
                <div className="modal-content" style={{ color: "black" }}>
                    <h4>Search Users</h4>
                    <input
                        placeholder="Type here" id="first_name"
                        type="text"
                        class="validate"
                        value={search}
                        onChange={(e)=>fetchUsers(e.target.value)}
                    />
                    <ul className="collection">
                        {
                            userDetails.map(item => {
                                return (
                                    <li className="collection-item">
                                        <Link to={"/profile/" + item._id} style={{ color: "black" }} onClick={() => {
                                            M.Modal.getInstance(SearchModal.current).close()
                                        }}>{item.email}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Close</a>
                </div>
            </div>
       </nav>
    );
}

export default Navbar;