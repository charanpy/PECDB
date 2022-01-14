"use strict";

const Student = require("../models/Student");
const PasswordServe = require("../services/password");
const catchAsync = require("../lib/catchAsync");

// creating student

const createStudent = catchAsync(async (req, res) => {
  try {
    const filters = {
      $or: [
        {
          examNumber: req?.body.examNumber,
        },
        {
          rollNumber: req?.body.rollNumber,
        },
      ],
    };

    const doc = await Student.findOne(filters);
    //  checking student already exist or not
    if (doc) {
      return res
        .status(400)
        .json({ message: "Student RollNumber Or ExamNumer already exist" });
    }

    //  extracting image from req
    console.log(req.body);

    // if (req.file?.originalname) {
    //   const fileExt = req.file.originalname.split(".").pop();
    //   await fs.rename(req.file.path, `${req.file.path}.${fileExt}`);
    //   // const staticHost = "http://localhost:5000";
    //   req.body.photo = `${staticHost}/static/students/${req.file.filename}.${fileExt}`;
    // }

    req.body.password = await PasswordServe.hash(req.body.examNumber);

    const result = await Student.create(req.body);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

//  getting all students

const getStudents = catchAsync(async (req, res) => {
  const filters = {
    isDeleted: false,
  };

  if (req.query.branch) {
    filters.branch = req.query.branch;
  }

  if (req.query.currentStudingYear) {
    filters.currentStudingYear = req.query.currentStudingYear;
  }

  try {
    const result = await Student.find(filters).sort({
      rollNumber: "ascending",
    });
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

// get student by id

const getStudentById = catchAsync(async (req, res, next) => {
  try {
    const result = await Student.findOne(
      // removing deleted students
      // filter the data mached with id
      // password field is removing in get data -- ( projection )
      {
        isDeleted: false,
        id: req.params.id,
      },
      { password: false }
    );
    if (!result) {
      res.status(500).json({ message: "Student Not Found" });
      return;
    }
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, code: "INTERNAL_ERROR" });
  }
});

//  update student

const updateStudent = catchAsync(async (req, res) => {
  try {
    req.body.lastUpdate = Date.now();

    console.log(req.body);

    // if (req.file?.originalname) {
    //   const fileExt = req.file.originalname.split(".").pop();
    //   await fs.rename(req.file.path, `${req.file.path}.${fileExt}`);
    //   // const staticHost = "http://localhost:3000";
    //   req.body.photo = `${staticHost}/static/students/${req.file.filename}.${fileExt}`;
    // }

    const result = await Student.findOneAndUpdate(
      // checking student
      {
        id: req.params.id,
        isDeleted: false,
      },
      req.body,
      { new: true }
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//  delete student

const deleteStudent = catchAsync(async (req, res) => {
  try {
    const doc = await Student.findOneAndUpdate(
      { id: req.params.id },
      { isDeleted: true }
    );
    return res.json("user deleted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
