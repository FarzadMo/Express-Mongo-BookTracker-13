// console.log("app.js is connected");

function displayReadResults() {
  $.getJSON("/read", function(data) {
    // console.log("this is the Read data: " + data);
    $("#read").empty();

    for (var i = 0; i < data.length; i++) {
      $("#read").append(
        "<tr data-id='" +
          data[i]._id +
          "'><th>" +
          data[i].title +
          "</th><th>" +
          data[i].author +
          "</th><th><button data-id='" +
          data[i]._id +
          "'class='markunread btn'>Mark Unread</button></th></tr>"
      );
    }

    $("#read").prepend(
      "<tr><th>Title</th><th>Author</th><th>Read/ Unread</th></tr>"
    );
  });
}

displayReadResults();

function displayUnreadResults() {
  $.getJSON("/unread", function(data) {
    // console.log("this is the Read data: " + data);
    $("#unread").empty();

    for (var i = 0; i < data.length; i++) {
      $("#unread").append(
        "<tr data-id='" +
          data[i]._id +
          "'><th>" +
          data[i].title +
          "</th><th>" +
          data[i].author +
          "</th><th><button data-id='" +
          data[i]._id +
          "'class='markread btn'>Mark Read</button></th></tr>"
      );
    }

    $("#unread").prepend(
      "<tr><th>Title</th><th>Author</th><th>Read/ Unread</th></tr>"
    );
  });
}

displayUnreadResults();

$(document).on("click", "#addbook", function() {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/submit",

    data: {
      title: $("#title").val(),
      author: $("#uthor").val(),
      created: Date.now()
    },

    success: function(response) {
      displayReadResults();

      $("#title").val("");
      $("#author").val("");
    }
  });
});

$(document).on("click", ".markunread", function() {
  var thisId = $(this).attr("data-id");
  // console.log("thisId= " + thisId);

  $.ajax({
    type: "PUT",
    url: "/markunread/" + thisId,

    success: function(data) {
      displayReadResults();
      displayUnreadResults();
    }
  });
});

$(document).on("click", ".markread", function() {
  var thisId = $(this).attr("data-id");
  console.log("markread thisId= " + thisId);

  $.ajax({
    type: "PUT",
    url: "/markread/" + thisId,

    success: function(data) {
      displayUnreadResults();
      displayReadResults();
    }
  });
});
