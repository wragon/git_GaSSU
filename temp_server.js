// 모듈을 추출합니다.
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : '123456',
    database : 'gassu'
});


// 웹 서버를 생성합니다.
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

//주소입력시 각각 연결
app.all('/mainhome', function (request, response) {
    response.writeHead(200, {"Content-Type":"text/HTML; charset=utf-8"});
    fs.createReadStream("./public/index.html", {encoding: null}).pipe(response);
});

app.all('/place', function (request, response) {
    response.writeHead(200, {"Content-Type":"text/HTML; charset=utf-8"});
    fs.createReadStream("./public/place.html", {encoding: null}).pipe(response);
});

app.all('/social', function (request, response) {
    response.writeHead(200, {"Content-Type":"text/HTML; charset=utf-8"});
    fs.createReadStream("./public/social.html", {encoding: null}).pipe(response);
});

app.all('/route', function (request, response) {
    response.writeHead(200, {"Content-Type":"text/HTML; charset=utf-8"});
    fs.createReadStream("./public/route.html", {encoding: null}).pipe(response);
});

app.all('/mypage', function (request, response) {
    response.writeHead(200, {"Content-Type":"text/HTML; charset=utf-8"});
    fs.createReadStream("./public/myPage.html", {encoding: null}).pipe(response);
});

app.post('/write.html', function (request, response) {
    var writer = 00000000;
    var title = request.body.post_name;
    var post_desc = request.body.post_desc;
    var image = request.body.post_image;

    var param = [writer, title, image, post_desc];
    var sql = 'INSERT INTO sns (writer, title, sphoto, sdesc) VALUES(?,?,?,?)';

    conn.query(sql, param, function(err, rows, fields){
        if (err) {throw err;
            console.log(err);}
        else{
            console.log(rows.insertId); //중요함!!!!!!!!!!!!!!!!!!!!
            response.writeHead(200, {"Content-Type":"text/HTML; charset=utf-8"});
            fs.createReadStream("./public/index.html", {encoding: null}).pipe(response);
        }
    });
});

// 웹 서버를 실행합니다.
app.listen(54321, function () {
    console.log('Server Running at http://127.0.0.1:54321');
});