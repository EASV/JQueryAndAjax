
function getOrders(ctl) {

  var id = $(ctl).data("id");

  // Store post id in hidden field
  $("#customerId").val(id);

  // Call Web API to get a list of posts
  $.ajax({
    url: "https://custapp2018.azurewebsites.net/api/orders?customerId=" + id,
    type: 'GET',
    dataType: 'json',
    success: function (comments) {
      getOrdersSuccess(comments);
    },
    error: function (request, message, error) {
      handleException(request, message, error);
    }
  });
}

function getOrdersSuccess(orders) {
  $("#ordersTable tbody").empty();
  // Iterate over the collection of data
  $.each(orders, function (index, order) {
    // Append row to <table>
    $("#ordersTable tbody").append(
      buildOrderTableRow(order));
  });
}

function buildOrderTableRow(order) {
  var ret =
    "<tr>" +
    "<td>" + order.id + "</td>" +
    "<td>" + order.OrderDate + "</td>" +
    "<td>" + order.DeliveryDate + "</td>" +
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

$('#myForm').on('submit',function(e){
  e.preventDefault();
  var name = $( "#exampleInputName" ).val();
  var email = $( "#exampleInputEmail" ).val();

  // In my case, I need to fetch these data before custom actions
  console.log("ola", name);

});