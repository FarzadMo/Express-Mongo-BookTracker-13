// console.log("app.js is connected");

function displayReadResults() {
  $.getJSON("/read", function(data) {
    // console.log("this is the Read data: " + data);
    $("#read").empty();

    for (var i = 0; i < data.length; i++) {
      $("#read").append(
        "<tr data-id='" +
          data[i].id +
          "'><th>" +
          data[i].title +
          "</th><th>" +
          data[i].author +
          "</th><th><button data-id='" +
          data[i].id +
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
          data[i].id +
          "'><th>" +
          data[i].title +
          "</th><th>" +
          data[i].author +
          "</th><th><button data-id='" +
          data[i].id +
          "'class='markread btn'>Mark Read</button></th></tr>"
      );
    }

    $("#unread").prepend(
      "<tr><th>Title</th><th>Author</th><th>Read/ Unread</th></tr>"
    );
  });
}

displayUnreadResults();
