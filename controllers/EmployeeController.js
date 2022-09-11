const Employee = require('../models/EmployeeModel');


const index = (req, res, next) => {
    Employee.find().then((resp) => {
        res.json({resp});
    }).catch(err => {
        res.json({
            message: 'Error occured!'
        });
    });
}

const show = (req, res, next) => {
    const eId = req.body.employeeID
    Employee.findById(eId).then((resp) => {
        res.json({resp});
    }).catch(err => {
        res.json({
            message: 'Error occured!'
        });
    });
}

const store = (req, res, next) => {
    const employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    });

    if (req.files) {
        let path = '';
        req.files.forEach((files, index, arr) => {
            path = path + files.path + ','
        });
        path = path.substring(0, path.lastIndexOf(','));
        console.log(path);
        employee.avatar = path;
    }

    Employee.create(employee).then((resp) => {
        res.json({
            message: 'Employee created successfully'
        });
    }).catch(err => {
        res.json({
            message: 'Error occured!'
        });
    });
}

const update = (req, res, next) => {
    const eId = req.body.employeeID;

    const updatedEmp = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    };

    Employee.findByIdAndUpdate(eId, {$set: updatedEmp}).then((resp) => {
        res.json({
            message: 'Employee Updated successfully'
        });
    }).catch(err => {
        res.json({
            message: 'Error occured!'
        });
    });
}

const khatamTata = (req, res, next) => {
    const eId = req.body.employeeID;

    Employee.findByIdAndRemove(eId).then((resp) => {
        res.json({
            message: 'Employee Deleted successfully'
        });
    }).catch(err => {
        res.json({
            message: 'Error occured!'
        });
    });
}

module.exports = {
    index, show, store, update, khatamTata
}