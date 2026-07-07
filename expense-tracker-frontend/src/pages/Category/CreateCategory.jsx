import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCategory } from "../../services/categoryService";

const CreateCategory = () => {

  const navigate=useNavigate();

  const [form,setForm]=useState({

    name:"",
    type:"Expense",
    color:"#4F46E5",
    icon:"category"

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

      const data=await createCategory(form);

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

Create Category

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
required
/>

</div>

<div className="form-group">

<label>Type</label>

<select
name="type"
value={form.type}
onChange={handleChange}
>

<option>Income</option>

<option>Expense</option>

</select>

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

Create

</button>

</form>

</div>

);

};

export default CreateCategory;