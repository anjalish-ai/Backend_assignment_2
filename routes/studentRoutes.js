const express = require("express");
const router = express.Router();
const students = require("../data/students");

router.get("/", (req, res) => {
  res.status(200).json(students);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number" });
  }
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(200).json(student);
});

router.post("/", (req, res) => {
  const { name, course, age } = req.body;
  if (!name || !course || !age) {
    return res
      .status(400)
      .json({ error: "name, course and age are required" });
  }
  const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
  const newStudent = { id: newId, name, course, age };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number" });
  }
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  const { name, course, age } = req.body;
  if (!name && !course && !age) {
    return res.status(400).json({ error: "Send at least one field to update" });
  }
  if (name) student.name = name;
  if (course) student.course = course;
  if (age) student.age = age;
  res.status(200).json(student);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number" });
  }
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  const deleted = students.splice(index, 1);
  res.status(200).json({ message: "Student deleted", student: deleted[0] });
});

module.exports = router;