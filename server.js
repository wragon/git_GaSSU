﻿// 모듈을 추출합니다.
var express = require('express');
var bodyParser = require('body-parser');
// 변수를 선언합니다.
var items = [{
    name: '우유',
    price: '2000'
}, {
    name: '홍차',
    price: '5000'
}, {
    name: '커피',
    price: '5000'
}];
// 웹 서버를 생성합니다.
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
// /data.html => path 이름
app.all('/data.html', function (request, response) {
    var output = '';
    output += '<!DOCTYPE html>';
    output += '<html>';
    output += '<head>';
    output += '    <title>Data HTML</title>';
    output += '</head>';
    output += '<body>';
    items.forEach(function (item) {
        output += '<div>';
        output += '    <h1>' + item.name + '</h1>';
        output += '    <h2>' + item.price + '</h2>';
        output += '</div>';
    });
    output += '</body>';
    output += '</html>';
    response.send(output);
});
app.all('/data.json', function (request, response) {
    // send method에서 javascript array, object등인 변수를 보내면
    // web browser에는 json format으로 전송
    response.send(items);
});
app.all('/data.xml', function (request, response) {
    var output = '';
    output += '<?xml version="1.0" encoding="UTF-8" ?>';
    output += '<products>';
    items.forEach(function (item) {
        output += '<product>';
        output += '    <name>' + item.name + '</name>';
        output += '    <price>' + item.price + '</price>';
        output += '</product>';
    });
    output += '</products>';
//    response.type('text/xml');
    response.send(output);
});
app.all('/parameter', function (request, response) {
    // 변수를 선언합니다.
    // request.query javascript object => query string data를 갖고 있음
    var name = request.query.name;
    var region = request.query.region;
    // 응답합니다.
    response.send('<h1>' + name + ':' + region + '</h1>');
});
// :id => 동적 router의 data를 갖고있는 변수로 개발자가 변경 가능
app.all('/parameter/:id', function (request, response) {
    // 변수를 선언합니다.
    // params js object를 통해 가져옴
    var id = request.params.id;
    // 응답합니다.
    response.send('<h1>' + id + '</h1>');
});

// app.get : get method를 지원하는 middleware
app.get('/products', function (request, response) {
    response.send(items);
});
app.get('/products/:id', function (request, response) {
    // 변수를 선언합니다.
    var id = Number(request.params.id);
    if (isNaN(id)) {
        // 오류: 잘못된 경로
        response.send({
            error: '숫자를 입력하세요!'
        });
    } else if (items[id]) {
        // 정상
        response.send(items[id]);
    } else {
        // 오류: 요소가 없을 경우
        response.send({
            error: '존재하지 않는 데이터입니다!'
        });
    }
});
app.post('/products', function (request, response) {
    // 변수를 선언합니다.
    var name = request.body.name;
    var price = request.body.price;
    var item = {
        name: name,
        price: price
    };
    // 데이터를 추가합니다.
    items.push(item);
    // 응답합니다.
    response.send({
        message: '데이터를 추가했습니다.',
        data: item
    });
});
app.put('/products/:id', function (request, response) {
    // 변수를 선언합니다.
    var id = Number(request.params.id);
    var name = request.body.name;
    var price = request.body.price;
    if (items[id]) {
        // 데이터를 수정합니다.
        if (name) { items[id].name = name; }
        if (price) { items[id].price = price; }
        // 응답합니다.
        response.send({
            message: '데이터를 수정했습니다.',
            data: items[id]
        });
    } else {
        // 오류: 요소가 없을 경우
        response.send({
            error: '존재하지 않는 데이터입니다!'
        });
    }
});
app.del('/products/:id', function (request, response) {
    // 변수를 선언합니다.
    var id = Number(request.params.id);
    if (isNaN(id)) {
        // 오류: 잘못된 경로
        response.send({
            error: '숫자를 입력하세요!'
        });
    } else if (items[id]) {
        // 정상: 데이터 삭제
        items.splice(id, 1);
        response.send({
            message: '데이터를 삭제했습니다.'
        });
    } else {
        // 오류: 요소가 없을 경우
        response.send({
            error: '존재하지 않는 데이터입니다!'
        });
    }
});
// 웹 서버를 실행합니다.
app.listen(52273, function () {
    console.log('Server Running at http://127.0.0.1:52273');
});