import { useEffect,useState } from "react";

import { useNavigate } from "react-router-dom";

import {
getProfile,
updateProfile
} from "../../services/profileService";

const EditProfile=()=>{

const navigate=useNavigate();

const [form,setForm]=useState({

name:"",

phone:"",

monthlySalary:0,

currency:"INR"

});

useEffect(()=>{

loadProfile();

},[]);

const loadProfile=async()=>{

const data=await getProfile();

setForm({

name:data.user.name,

phone:data.user.phone,

monthlySalary:data.user.monthlySalary,

currency:data.user.currency

});

};

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};

const handleSubmit=async(e)=>{

e.preventDefault();

try{

const data=await updateProfile(form);

alert(data.message);

navigate("/profile");

}

catch(error){

alert(

error.response?.data?.message ||

"Update Failed"

);

}

};

return(

<div>

<h1 className="page-title">

Update Profile

</h1>

<form
className="form-card"
onSubmit={handleSubmit}
>

<div className="form-group">

<label>Name</label>

<input
name="name"
value={form.name}
onChange={handleChange}
/>

</div>

<div className="form-group">

<label>Phone</label>

<input
name="phone"
value={form.phone}
onChange={handleChange}
/>

</div>

<div className="form-group">

<label>Monthly Salary</label>

<input
type="number"
name="monthlySalary"
value={form.monthlySalary}
onChange={handleChange}
/>

</div>

<div className="form-group">

<label>Currency</label>

<select
name="currency"
value={form.currency}
onChange={handleChange}
>

<option value="INR">INR</option>

<option value="USD">USD</option>

<option value="EUR">EUR</option>

</select>

</div>

<button className="form-btn">

Save Changes

</button>

</form>

</div>

);

};

export default EditProfile;