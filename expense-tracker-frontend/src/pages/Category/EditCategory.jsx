import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

import {
getCategory,
updateCategory
} from "../../services/categoryService";

const EditCategory=()=>{

const {id}=useParams();

const navigate=useNavigate();

const [form,setForm]=useState({

name:"",
color:"#4F46E5",
icon:""

});

useEffect(()=>{

loadCategory();

},[]);

const loadCategory=async()=>{

const data=await getCategory(id);

setForm({

name:data.category.name,
color:data.category.color,
icon:data.category.icon

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

const data=await updateCategory(id,form);

alert(data.message);

navigate("/categories");

}

catch(error){

alert(error.response?.data?.message);

}

};

return(

<div>

<h1 className="page-title">

Edit Category

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

<label>Color</label>

<input
type="color"
name="color"
value={form.color}
onChange={handleChange}
/>

</div>

<div className="form-group">

<label>Icon</label>

<input
name="icon"
value={form.icon}
onChange={handleChange}
/>

</div>

<button className="form-btn">

Update

</button>

</form>

</div>

);

};

export default EditCategory;