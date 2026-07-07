const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
{
    name:
    {
        type:String,
        required:true,
        trim:true
    },

    type:
    {
        type:String,
        enum:["Income","Expense"],
        required:true
    },

    color:
    {
        type:String,
        default:"#4F46E5"
    },

    icon:
    {
        type:String,
        default:"category"
    },

    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},
{
    timestamps:true
});

module.exports=mongoose.model("Category",categorySchema);