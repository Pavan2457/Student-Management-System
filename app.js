const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));


// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/2024172457DB")
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log("Connection failed:", error);
    });


// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: String,
    course: String,
    branch: String,
    year: Number,
    cgpa: Number
});


// Student Model
const Student = mongoose.model("Student", studentSchema, "Students");


// CREATE
app.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body);

        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
    
});
//read
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();

        res.json(students);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
// UPDATE - Update multiple students
app.put("/students", async (req, res) => {
    try {
        const result = await Student.updateMany(
            { branch: "CSE" },
            { $set: { year: 3 } }
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
// DELETE - Delete multiple students
app.delete("/students", async (req, res) => {
    try {
        const result = await Student.deleteMany(
            { branch: "ECE" }
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

//update from button
app.put("/students/:id",async(req,res) =>{
    try{
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(student);
    }catch(error){
        res.json({error: error.message})
    }
});
//delete from delete button
app.delete("/students/:id",async(req,res)=>{
    try{
        await Student.findByIdAndDelete(req.params.id);
        res.json({message:"Student deleted Successfully"});
    }catch(error){
        res.json({error: error.message});
    }
});
// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});