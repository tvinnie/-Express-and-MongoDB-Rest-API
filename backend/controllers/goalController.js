const asyncHandler = require("express-async-handler")

const Goal = require("../models/goalModel")
const User = require("../models/userModel")

// @desc Get goal
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler (async (req,res) => {
    const goals = await Goal.find({user: req.user.id})

    res.json( goals)
})


// @desc Set goal
// @route PUT /api/goals
// @access Private
const setGoals = asyncHandler(async  (req,res) => {
   
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field!')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
   
    res.json({ goal })
})


// @desc Update goal
// @route UPDATE /api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    
    if(!goal){
        res.status(400)
        throw new Error('Goal not Found!!')
    }
    
    //get user
    const user = await User.findById(req.user.id)

    //check for the user
    if(!user){
        res.status(401)
        throw new Error('User not found!!')
    }

    //compate logged in user and goal user if they match
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.json(updateGoal)
})


// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    
    if(!goal){
        res.status(400)
        throw new Error('Goal not Found!!')
    }

        //get user
        const user = await User.findById(req.user.id)

        //check for the user
        if(!user){
            res.status(401)
            throw new Error('User not found!!')
        }
    
        //compate logged in user and goal user if they match
        if(goal.user.toString() !== user.id){
            res.status(401)
            throw new Error('User not authorized')
        }
    await Goal.findByIdAndDelete(req.params.id)

    res.json({ id: req.params.id})
})

module.exports ={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}