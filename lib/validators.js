const { check, validationResult } = require('express-validator');
const AppError = require('./AppError');

const checkNotEmpty = (key, message) =>
  check(key, `${message} is required`).not().isEmpty();

const errorFormatter = ({ msg, param }) => {
  return `${param}: ${msg}`;
};

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
      return next();
    }
    return next(new AppError(errors.array()?.[0], 400));
  };
};

const validators = {
  deptCodeValidator: checkNotEmpty('code', 'Department code'),
  deptNameValidator: checkNotEmpty('deptName', 'Department name'),
  deleteDeptValidator: checkNotEmpty(
    'departmentId',
    'Department Id is required'
  ),
  createClassValidator: checkNotEmpty('class', 'Department '),
  createSectionValidator: checkNotEmpty('section', 'Section'),
  createDeptValidator: checkNotEmpty('department', 'Department'),
  deleteClassValidator: checkNotEmpty('classId', 'Class'),
  departmentClassValidator: checkNotEmpty('departmentId', 'Department'),

  createSubjectValidator: checkNotEmpty('subject', 'Subject'),
  deleteSubjectValidator: checkNotEmpty('subjectId', 'Subject'),

  createProviderValidator: checkNotEmpty('provider', 'username'),
  createRoleValidator: checkNotEmpty('role', 'Role'),
  createPasswordValidator: checkNotEmpty('password', 'Password'),

  classSectionValidator: checkNotEmpty('classSection', 'Class'),
  fnameValidator: checkNotEmpty('firstName', 'First Name'),
  lnameValidator: checkNotEmpty('lastName', 'Last Name'),
  dobValidator: checkNotEmpty('dob', 'DOB'),
  genderValidator: checkNotEmpty('gender', 'Gender'),
  emailValidator: check('email', 'Invalid email').isEmail(),
  address: checkNotEmpty('address', 'Address'),
  password: checkNotEmpty('password', 'Password'),
  phoneNo: check('mobileNumber').isMobilePhone('en-IN'),
  year: check('year').isInt({ min: 1, max: 4 }),
  semester: check('semester').isInt(),
  regNo: checkNotEmpty('regNo', 'Register No'),
  rollNo: checkNotEmpty('rollNo', 'Register No'),
  studentId: checkNotEmpty('studentId', 'Student Id'),
  name: checkNotEmpty('name', 'Name'),
};

const createDepartmentValidator = validate([
  validators.deptNameValidator,
  validators.deptCodeValidator,
]);

const updateDepartmentValidator = validate([
  validators.deleteDeptValidator,
  validators.deptNameValidator,
  validators.deptCodeValidator,
]);

const createClassValidator = validate([
  validators.createClassValidator,
  validators.createSectionValidator,
  validators.createDeptValidator,
]);

const editSubjectValidator = validate([
  validators.createSubjectValidator,
  validators.deleteSubjectValidator,
]);

const createStudentValidator = validate([
  validators.createDeptValidator,
  validators.classSectionValidator,
  // validators.createClassValidator,
  validators.fnameValidator,
  validators.lnameValidator,
  validators.dobValidator,
  validators.genderValidator,
  validators.emailValidator,
  validators.address,
  validators.password,
  validators.phoneNo,
  validators.year,
  validators.semester,
  validators.regNo,
  validators.rollNo,
]);

const createTeacherValidator = validate([
  validators.name,
  validators.emailValidator,
  validators.password,
  validators.phoneNo,
  validators.address,
  validators.dobValidator,
  validators.phoneNo,
]);

const isValid = (req, _, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);

  console.log(errors);

  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0], 400));
  }

  return next();
};

module.exports = {
  validators,
  isValid,
  createDepartmentValidator,
  updateDepartmentValidator,
  createClassValidator,
  editSubjectValidator,
  createStudentValidator,
  deleteStudentValidator: validate([validators.studentId]),
  studentLoginValidator: validate([validators.regNo, validators.password]),
  createTeacherValidator,
};
