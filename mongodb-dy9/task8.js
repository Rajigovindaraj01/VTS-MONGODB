const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Connect to MongoDB ----
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ---- 2) Course Schema ----
const CourseSchema = new Schema({
  title: String,
  description: String,
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }] // reverse reference
});
const Course = model("task8Course", CourseSchema);

// ---- 3) Student Schema ----
const StudentSchema = new Schema({
  name: String,
  email: String,
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }] // many courses
});
const Student = model("task8Student", StudentSchema);

// ---- 4) Insert Sample Documents ----
async function insertData() {
  try {
    // Create Courses
    const course1 = await Course.create({ title: "Math", description: "Algebra & Geometry" });
    const course2 = await Course.create({ title: "Physics", description: "Mechanics & Optics" });

    // Create Students and reference courses
    const student1 = await Student.create({ name: "Alice", email: "alice@example.com", courses: [course1._id, course2._id] });
    const student2 = await Student.create({ name: "Bob", email: "bob@example.com", courses: [course1._id] });

    // Optional: Add students to courses (reverse reference)
    await Course.updateOne({ _id: course1._id }, { $push: { students: { $each: [student1._id, student2._id] } } });
    await Course.updateOne({ _id: course2._id }, { $push: { students: student1._id } });

    console.log("Inserted students and courses with Many-to-Many relationship.");

    // ---- 5) Fetch with populate ----
    const studentsPopulated = await Student.find().populate("courses");
    console.log("Students with courses populated:", studentsPopulated);

    const coursesPopulated = await Course.find().populate("students");
    console.log("Courses with students populated:", coursesPopulated);

  } catch (err) {
    console.log(err);
  }
}

insertData();
