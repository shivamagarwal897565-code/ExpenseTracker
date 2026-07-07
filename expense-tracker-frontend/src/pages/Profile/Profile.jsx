import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../../services/profileService";

const Profile = () => {

  const [user,setUser]=useState(null);

  const navigate=useNavigate();

  useEffect(()=>{

    fetchProfile();

  },[]);

  const fetchProfile=async()=>{

    try{

      const data=await getProfile();

      setUser(data.user);

    }

    catch(error){

      console.log(error);

    }

  };

  if(!user){

    return <h2>Loading...</h2>;

  }

  return(

<div>

<h1 className="page-title">

Profile

</h1>

<div className="form-card">

<p><strong>Name :</strong> {user.name}</p>

<br/>

<p><strong>Email :</strong> {user.email}</p>

<br/>

<p><strong>Phone :</strong> {user.phone || "-"}</p>

<br/>

<p><strong>Monthly Salary :</strong> ₹ {user.monthlySalary}</p>

<br/>

<p><strong>Currency :</strong> {user.currency}</p>

<div className="button-group">

<button
className="form-btn"
onClick={()=>navigate("/profile/edit")}
>

Update Profile

</button>

<button
className="secondary-btn"
onClick={()=>navigate("/profile/change-password")}
>

Change Password

</button>

</div>

</div>

</div>

);

};

export default Profile;