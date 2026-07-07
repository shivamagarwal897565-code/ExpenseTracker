import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { changePassword } from "../../services/profileService";

const ChangePassword=()=>{

const navigate=useNavigate();

const [form,setForm]=useState({

oldPassword:"",

newPassword:""

});

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};

const handleSubmit=async(e)=>{

e.preventDefault();

try{

const data=await changePassword(form);

alert(data.message);

navigate("/profile");

}

catch(error){

alert(

error.response?.data?.message ||

"Password Change Failed"

);

}

};

return(

<div>

<h1 className="page-title">

Change Password

</h1>

<form
className="form-card"
onSubmit={handleSubmit}
>

<div className="form-group">

<label>Old Password</label>

<input
type="password"
name="oldPassword"
value={form.oldPassword}
onChange={handleChange}
required
/>

</div>

<div className="form-group">

<label>New Password</label>

<input
type="password"
name="newPassword"
value={form.newPassword}
onChange={handleChange}
required
/>

</div>

<button className="form-btn">

Update Password

</button>

</form>

</div>

);

};

export default ChangePassword;