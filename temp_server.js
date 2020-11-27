// 모듈을 추출합니다.
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');

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

// 웹 서버를 실행합니다.
app.listen(54321, function () {
    console.log('Server Running at http://127.0.0.1:54321');
});