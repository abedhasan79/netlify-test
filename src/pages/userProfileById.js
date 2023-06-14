import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleUserPage() {
    const userId = useParams();
    
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`https://express-t4.onrender.com/api/users/${userId.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [userId]);
    
    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            {data ? (
                <div className="card" style={{ width: "50rem" }}>
                    <img src={data.picture} style={{ height: "25rem" }} className="card-img-top" alt="user profile" />
                    <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">{data.about}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">age: {data.age}</li>
                        <li className="list-group-item">gender: {data.gender}</li>
                        <li className="list-group-item">eye color: {data.eyeColor}</li>
                        <li className="list-group-item">favourite fruite: {data.favoriteFruit}</li>
                        <li className="list-group-item">balance: {data.balance}</li>
                        <li className="list-group-item">adress: {data.address}</li>
                        <li className="list-group-item">email: {data.email}</li>
                        <li className="list-group-item">phone: {data.phone}</li>
                        <li className="list-group-item">company: {data.company}</li>
                        <div className="list-group-item">
                            Friends:
                            {data.friends.map(friend => (
                                <li style={{ listStyle: "none" }} key={friend.id}>{friend.name}</li>
                            ))}
                        </div>
                        <li className="list-group-item">greeting: {data.greeting}</li>
                    </ul>
                </div>
            ) : (
                <div>Please log in</div>
            )}
        </div>
    );
}

export default SingleUserPage;