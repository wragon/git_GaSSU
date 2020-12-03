// 모듈을 추출합니다.
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 's91201478!',
    database: 'gassu'
});

// 웹 서버를 생성합니다.
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

var email;
var name;
var id;

//주소입력시 각각 연결
app.post('/mainhome', function (request, response) {
    email = request.body.email;
    name = request.body.name;
    var findUser = 'SELECT * FROM member where email=?'
    var insert = 'INSERT INTO member (name, email) VALUES (?,?)';
    var params = [name, email];
    console.log('params: ', params);
    conn.query(findUser, email, function (err, rows, fields) {
        if (err) {
            throw err;
            console.log(err);
        }else {
            if (rows.length == 0) {
                conn.query(insert, params, function (err2, rows, fields) {
                    if (err2) {
                        throw err2;
                        console.log(err2);
                    }else {
                        console.log(rows.insertId); //중요함!!!!!!!!!!!!!!!!!!!!
                        id = rows.insertId;
                        response.writeHead(200, { "Content-Type": "text/HTML; charset=utf-8" });
                        fs.createReadStream("./public/index.html", { encoding: null }).pipe(response);
                    }
                });
            }else{
                id = rows[0].id;
                console.log(id);
            }
        }
    });
});

app.all('/mainhome', function (request, response) {
    response.writeHead(200, { "Content-Type": "text/HTML; charset=utf-8" });
    fs.createReadStream("./public/index.html", { encoding: null }).pipe(response);
});

app.all('/place', function (request, response) {
    response.writeHead(200, { "Content-Type": "text/HTML; charset=utf-8" });
    fs.createReadStream("./public/place.html", { encoding: null }).pipe(response);
});

app.all('/social', function (request, response) {
    response.writeHead(200, { "Content-Type": "text/HTML; charset=utf-8" });
    fs.createReadStream("./public/social.html", { encoding: null }).pipe(response);
});

app.all('/route', function (request, response) {
    response.writeHead(200, { "Content-Type": "text/HTML; charset=utf-8" });
    fs.createReadStream("./public/route.html", { encoding: null }).pipe(response);
});

app.all('/mypage', function (request, response) {
    response.writeHead(200, { "Content-Type": "text/HTML; charset=utf-8" });
    fs.createReadStream("./public/myPage.html", { encoding: null }).pipe(response);
});

app.post('/write.html', function (request, response) {
    var writer = id;
    var title = request.body.post_name;
    var post_desc = request.body.post_desc;
    var image = request.body.post_image;

    var param = [writer, title, image, post_desc];
    var sql = 'INSERT INTO sns (writer, title, sphoto, sdesc) VALUES(?,?,?,?)';

    conn.query(sql, param, function (err, rows, fields) {
        if (err) {
            throw err;
            console.log(err);
        }
        else {
            console.log(rows.insertId); //중요함!!!!!!!!!!!!!!!!!!!!
            response.writeHead(200, { "Content-Type": "text/HTML; charset=utf-8" });
            fs.createReadStream("./public/index.html", { encoding: null }).pipe(response);
        }
    });
});

// 웹 서버를 실행합니다.
app.listen(54321, function () {
    console.log('Server Running at http://localhost:54321');
});