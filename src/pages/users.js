import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Users() {
    const [data, setData] = useState(null);
    const [searchUser, setSearchUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://express-t4.onrender.com/api/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchUser(e.target.value);
    };

    // console.log(data);

    let filteredUsers = data;

    if (filteredUsers && searchUser) {
        const query = searchUser.toLowerCase();
        filteredUsers = data.filter(
            user => user.name.toLowerCase().includes(query)
        );
    }

    const handleListClick = (id)=>{
        navigate(`/profile-listing/${id}`)
    }

    return (
        <div className="vh-100 d-flex justify-content-center">
            <div>
                {data ? (
                    <div>
                        <div className="search-container" style={{ paddingTop: "50px", paddingBottom: "50px" }}>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search by name..."
                                value={searchUser}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="container d-flex flex-wrap gap-5 justify-content-center">
                            {filteredUsers.map(user => (
                                <div key={user._id} onClick={()=>handleListClick(user._id)} className="card userCard" style={{ width: "25rem" }}>
                                    <img src={user.picture} className="card-img-top" style={{ height: "15rem" }} alt="user profile" />
                                    <div className="card-body">
                                        <p className="card-text">{user.name}</p>
                                        <p className="card-text">{user.about}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Log In Please</p>
                )}
            </div>
        </div>
    );
}

export default Users;