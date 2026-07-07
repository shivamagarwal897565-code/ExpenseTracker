const express=require("express");

const router=express.Router();

const protect=require("../middleware/authMiddleware");

const{

createBudget,

getBudgets,

getBudget,

updateBudget,

deleteBudget

}=require("../controllers/budgetController");

router.use(protect);

router.route("/")

.get(getBudgets)

.post(createBudget);

router.route("/:id")

.get(getBudget)

.put(updateBudget)

.delete(deleteBudget);

module.exports=router;