"use strict"

const http = require("http");
const fs = require("fs");
const todos = [];

http.createServer(function(req, res){
  if (req.url === "/"){
    fs.readFile('./public/index.html', function(err, data){
        if (err){
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end( 'This is a BIG error' );
        }
        res.end(data);
    });
  }
  else if (req.url==="/savedtodos" && req.method==="GET"){
    res.end(JSON.stringify(todos));
  }

  else if (req.url==="/todoAdd" && req.method==="POST"){
    req.on("data", function(obj){
      let object = JSON.parse(obj);
      object.id = Math.random();
      todos.push(object);
    });
    req.on("end", function(){return res.end(JSON.stringify(todos))});
  }
  else if (req.url==="/todoCheck" && req.method==="PUT"){
    req.on("data", function(obj){
      let object = JSON.parse(obj);
      for (let i=0; i<=todos.length-1;i++){
        if (todos[i].id===object.checkid){
          todos[i].checked = !todos[i].checked;
        }
      }
  });
    req.on("end", function(){res.end(JSON.stringify(todos))});
  }

  else if( req.url==="/todoSearch" && req.method==="POST"){
    let ar = [];
    req.on("data", function(obj){
      let object = JSON.parse(obj);
      for (let i=0; i<=todos.length-1;i++){
        if (todos[i].todo.toLowerCase().search(object.searchtext.toLowerCase())>=0){
          ar.push(todos[i]);
        }
      }
      req.on("end", function(){res.end(JSON.stringify(ar))});
  });
}

  else if (req.url==="/todoDelete" && req.method==="DELETE"){
    req.on("data", function(obj){
      let object = JSON.parse(obj);
      for (let i=0; i<=todos.length-1;i++){
        if (todos[i].id===object.deleteid){
          todos.splice(i,1);
        }
      }
    });
    req.on("end", function(){return res.end(JSON.stringify(todos))});
  }
else {
  fs.readFile('./public' + req.url, function(err, data){
      if (err){
        res.end("This is a BIG error!!!");
      }
      res.end(data);
  });
}
}).listen(80);