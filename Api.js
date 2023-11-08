var express = require('express');
var bodyParser = require('body-parser');
var sql = require('mssql/msnodesqlv8');
var cors = require('cors');

var app = express(); 
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


//Connect
var config = {
    server: "localhost", 
    user : "sa",  
    password: "1234", 
    database: "dbbook", 
    driver: "msnodesqlv8",
    port : 1433,
    options:{
        trustedConnection: true,
        enableArithAbort: true,
    },
}
var conn = new sql.ConnectionPool(config);

//Route
//GET ALL
app.get('/book', async function(req, res){
    //SELECT *FROM YourTable
    await conn.connect()
    var sqlString = "SELECT * FROM bestseller";
    const result = await conn.request().query(sqlString, function(err, data){
    res.send({result: data.recordset});
    });  
    }
)

//SEARCH
app.get('/book/:id',async function(req, res){
    //SELECT *FROM YourTable Where YourPrimaryKeyColumn = @key
    var id = req.params.id;
    await conn.connect()
    var sqlString = "SELECT * FROM bestseller WHERE id = @id";
    const result = await conn.request()
    .input('id', sql.Int, id)
    .query(sqlString, function(err, data){
        if(data.recordset.length > 0){
            res.send({result: data.recordset[0]})
        }else{
            res.send({result: null})
        }
        
    });
})

//INSERT
app.post('/addbook', async function(req, res){
    //INSERT INTO YourTable VALUES(@ColumnName)
    await conn.connect()
    var sqlString = "INSERT INTO Book VALUES(@img,@id,@bname,@author,@rated,@btype,@price)";
    const result = await conn.request()
    .input('img', sql.Char, req.body.img)
    .input('id', sql.Int, req.body.id)
    .input('bname', sql.VarChar, req.body.bname)
    .input('author', sql.VarChar, req.body.author)
    .input('rated', sql.Char, req.body.rated)
    .input('btype', sql.VarChar, req.body.btype)
    .input('price', sql.Char, req.body.price)
    .query(sqlString, function(err, result){
        if(err) throw err;
            res.send({result: "Add successfully!"});
    });
})

//UPDATE
app.put('/updatebook', async function(req, res){
    //UPDATE YourTable SET ColumnName = @name WHERE YourPrimaryKeyColumn = @key
    await conn.connect()
    var sqlString = "UPDATE Book SET img = @img, bname = @bname, author = @author,rated = @rated,btype = @btype, price = @price WHERE id = @id";
    const result = await conn.request()
    .input('img', sql.Char, req.body.img)
    .input('id', sql.Int, req.body.id)
    .input('bname', sql.VarChar, req.body.bname)
    .input('author', sql.VarChar, req.body.author)
    .input('rated', sql.Char, req.body.rated)
    .input('btype', sql.VarChar, req.body.btype)
    .input('price', sql.Char, req.body.price)
    .query(sqlString, function(err, result){
        if(err) throw err;
            res.send({result: "Update successfully!"});
    });

})
//DELETE
app.delete('/delete/:id',async function(req,res){
    //DELETE FROM YourTable WHERE YourPrimaryKeyColumn = @key
    var id = req.params.id;
    await conn.connect()
    var sqlString = "DELETE FROM Book WHERE BookID = @id";
    const result = await conn.request()
    .input('id', sql.Int, id)
    .query(sqlString, function(err, result){
        if(err) throw err;
            res.send({result: "Delete successfully!"});
    });
})


var server = app.listen(5555, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("Server is listening at: http://%s:%s", host, port);
})

