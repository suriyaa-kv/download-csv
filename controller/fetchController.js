
const { con } = require('../utils/db')
const stringify = require("csv-stringify");

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
        res.json({count})
    })
}