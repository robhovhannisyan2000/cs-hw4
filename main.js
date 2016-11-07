const completed= function(a){
  if (a)
    return "checked";
  return "";
};

$("#searchButton").on("click", function(){
  if ($("#searchtodo").val()!=""){
$.ajax({
  url: "/todoSearch",
  type: "post",
  data: JSON.stringify( {searchtext: $("#searchtodo").val()}),
  success: function(result){
    $("#list").empty();
    let array = JSON.parse(result);
    for (let i=0; i<=array.length-1; i++){
      let element = '<li id='+array[i].id+'><span>'+array[i].todo+'</span><input type="checkbox" onclick="checkboxClick('+array[i].id+')" '+completed(array[i].checked)+' style="margin-left: 5px; onclick="checkboxClick('+array[i].id+')""/><button onclick="deleteTodo('+array[i].id+')" style="margin-left: 5px;" id="delete">Delete</button></li>';
      $("#list").append(element);
    }
  }
 })
}
else{$.ajax({
  url: "/savedtodos",
  type: "get",
success: function(result){
$("#list").empty();
  let array = JSON.parse(result);
  for (let i=0; i<=array.length-1; i++){
    let element = '<li id='+array[i].id+'><span>'+array[i].todo+'</span><input type="checkbox" onclick="checkboxClick('+array[i].id+')" '+completed(array[i].checked)+' style="margin-left: 5px;"/><button onclick="deleteTodo('+array[i].id+')" style="margin-left: 5px;" id="delete">Delete</button></li>';
    $("#list").append(element);
  }
}
});
}
});
let checkboxClick =  function(id){
  $.ajax({
    url: "/todoCheck",
    type: "put",
    data: JSON.stringify({checkid: id}),
    success: function(result){
      $("#list").empty();
      let array = JSON.parse(result);
      for (let i=0; i<=array.length-1; i++){
        let element = '<li id='+array[i].id+'><span>'+array[i].todo+'</span><input type="checkbox" onclick="checkboxClick('+array[i].id+')" '+completed(array[i].checked)+' style="margin-left: 5px; onclick="checkboxClick('+array[i].id+')""/><button onclick="deleteTodo('+array[i].id+')" style="margin-left: 5px;" id="delete">Delete</button></li>';
        $("#list").append(element);
      }
    }
  })
};

let deleteTodo = function(id){
  $.ajax({
    url: "/todoDelete",
    type: "delete",
    data: JSON.stringify({deleteid: id}),
    success: function(result){
      $("#list").empty();
      let array = JSON.parse(result);
      for (let i=0; i<=array.length-1; i++){
        let element = '<li id='+array[i].id+'><span>'+array[i].todo+'</span><input type="checkbox" onclick="checkboxClick('+array[i].id+')" '+completed(array[i].checked)+' style="margin-left: 5px;"/><button onclick="deleteTodo('+array[i].id+')" style="margin-left: 5px;" id="delete">Delete</button></li>';
        $("#list").append(element);
      }
    }
  });
};

$.ajax({
  url: "/savedtodos",
  type: "get",
success: function(result){
//  $("#list").empty();
  let array = JSON.parse(result);
  for (let i=0; i<=array.length-1; i++){
    let element = '<li id='+array[i].id+'><span>'+array[i].todo+'</span><input type="checkbox" onclick="checkboxClick('+array[i].id+')" '+completed(array[i].checked)+' style="margin-left: 5px;"/><button onclick="deleteTodo('+array[i].id+')" style="margin-left: 5px;" id="delete">Delete</button></li>';
    $("#list").append(element);
  }
}
});

$("#submitButton").on("click", function(){
  if ($("#todo").val()!="") {
    $.ajax({
      url: "/todoAdd",
      type: "post",
      data: JSON.stringify({todo: $("#todo").val(), id: null, checked: false} ),
    success: function(result){
      $("#list").empty();
      let array = JSON.parse(result);
      for (let i=0; i<=array.length-1; i++){
        let element = '<li id='+array[i].id+'><span>'+array[i].todo+'</span><input type="checkbox" onclick="checkboxClick('+array[i].id+')" '+completed(array[i].checked)+' style="margin-left: 5px;"/><button onclick="deleteTodo('+array[i].id+')" style="margin-left: 5px;" id="delete">Delete</button></li>';
        $("#list").append(element);
      }
    }
  })
  $("#todo").val("")
  }


})