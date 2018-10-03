function postList() {
    // Call Web API to get a list of post
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      type: 'GET',
      dataType: 'json',
      success: function (posts) {
        postListSuccess(posts);
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }

  function postListSuccess(posts) {
    // Iterate over the collection of data
    $.each(posts, function (index, post) {
      // Add a row to the post table
      postAddRow(post);
    });
  }

  function postAddRow(post) {
    // Check if <tbody> tag exists, add one if not
     if ($("#postTable tbody").length == 0) {
      $("#postTable").append("<tbody></tbody>");
     }
     // Append row to <table>
     $("#postTable tbody").append(
       postBuildTableRow(post));
   }

   function postBuildTableRow(post) {
    var ret =
      "<tr>" +
       "<td>" + post.userId + "</td>" +
       "<td>" + post.title + "</td>" + 
       "<td>" + post.body + "</td>" +
       "<td>" +
        "<button type='button' " +
          "class='btn btn-default' " +
          "data-id='" + post.id + "'>" +
          "<i class='fas fa-comments'></i>" + 
        "</button>" +
      "</td >" +
      "</tr>";
    return ret;
  }

  $('#postTable').on('click', 'button', event => {
    postGetComments(event.currentTarget);
  });

  function postGetComments(ctl) {

    var id = $(ctl).data("id");
      
    // Store post id in hidden field
    $("#postid").val(id);
        
    // Call Web API to get a list of posts
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/comments?postId=1" + id,
      type: 'GET',
      dataType: 'json',
      success: function (comments) {
        commentsListSuccess(comments);
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }

  function commentsListSuccess(comments) {
    $("#commentsTable tbody").empty();
    // Iterate over the collection of data
    $.each(comments, function (index, comment) {
     // Append row to <table>
     $("#commentsTable tbody").append(
       commentsBuildTableRow(comment));
    });
  }

  function commentsBuildTableRow(comment) {
    var ret =
      "<tr>" +
       "<td>" + comment.name + "</td>" +
       "<td>" + comment.email + "</td>" + 
       "<td>" + comment.body + "</td>" +
      "</tr>";
    return ret;
  }

  function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
    msg += "Message" +
    request.responseJSON.Message + "\n";
    }
    alert(msg);
  }