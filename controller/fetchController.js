
const { con } = require('../utils/db')
const stringify = require("csv-stringify");
var bcrypt = require('bcryptjs');


checkForExistingUser = (email) => {
    return new Promise(function (resolve, reject) {
        con.query(`select * from user where email='${email}'`, (err, result) => {
            if (err) throw err;
            resolve(result)
        })
    })
}

generateHash = (password) => {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                resolve(hash)
            });
        });
    })
}

exports.registerUser = async (request, response) => {
    let { userName, email, password } = request.body;
    let isExisting = await checkForExistingUser(email)
    console.log("Existing User", isExisting)
    if (isExisting.length == 0) {
        let hashPassword = await generateHash(password)
        con.query(`Insert into user (name,email,password) values('${userName}','${email}','${hashPassword}')`, (err, result) => {
            if (err) throw err;
            response.json({
                data: "Inserted Successfully in to the database"
            })
        })
    }
    else {
        response.json({
            data: "Email Already Exists"
        })
    }
}

exports.validateUser = async (request, response) => {
    const { email, password } = request.body;
    const isExisting = await checkForExistingUser(email)
    if (isExisting.length == 0) {
        response.status(404).json({
            data: "Email doesn't Existss"
        })
    } else {
        bcrypt.compare(password, isExisting[0].password).then((res) => {
            if (res) {
                response.status(200).json({
                    info: "Login Successful",
                    email:isExisting[0].email,
                    userName:isExisting[0].name
                })
            } else {
                response.status(404).json({
                    data: "Invalid Credentials"
                })
            }
        });
    }
}

exports.fetchRecordsWithMysql = function (req, res) {
    const { pageNum, NoOfRecords } = req.body

    var skip = (pageNum - 1) * NoOfRecords;
    var limit = skip + ',' + NoOfRecords;

    con.query(`select * from porto limit ${limit}`, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
}

exports.downloadCSV = function (req, res) {
    // res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
    // res.set('Content-Type', 'text/csv');
    con.query('SELECT * FROM porto').stream({ highWaterMark: 1 })
        .pipe(stringify({
            header: true,
        }))
        .pipe(res)
        .on('finish', function () {
            console.log("Done ")
        })
}

exports.getTotal = function (req, res) {
    con.query(`select count(*) as TotalCount from porto`, (err, count) => {
        if (err) throw err;
        res.json({ count })
    })
}