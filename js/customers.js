
function listCustomers() {
    // Call Web API to get a list of post
    $.ajax({
      url: 'https://custapp2018.azurewebsites.net/api/customers',
      type: 'GET',
      dataType: 'json',
      success: function (customers) {
        onGetCustomersSuccess(customers);
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }

  function onGetCustomersSuccess(customers) {
    if ($("#customersTable tbody").length == 0) {
      $("#customersTable").append("<tbody></tbody>");
    }
    $("#customersTable tbody").empty();
    // Iterate over the collection of data
    $.each(customers, function (index, customer) {
      // Add a row to the post table
      addCustomerRow(customer);
    });
  }

  function addCustomerRow(customer) {
    // Check if <tbody> tag exists, add one if not
     // Append row to <table>
     $("#customersTable tbody").append(
       buildCustomerRow(customer));
   }

   function buildCustomerRow(customer) {
    var ret =
      "<tr>" +
       "<td>" + customer.id + "</td>" +
       "<td>" + customer.firstName + "</td>" +
       "<td>" + customer.lastName + "</td>" +
      "<td>" + customer.address + "</td>" +
      "<td>" +
        "<button type='button' " +
          "class='btn btn-info' " +
          "data-id='" + customer.id + "'>" +
          "<i class='fas fa-info-circle'></i>" +
        "</button>" +
      "</td >" +
      "<td>" +
      "<button type='button' " +
      "class='btn btn-danger' " +
      "data-id='" + customer.id + "'>" +
      "<i class='fas fa-minus-circle'></i>" +
      "</button>" +
      "</td >" +
      "</tr>";
    return ret;
  }

  $('#customerTable').on('click', 'button', event => {
    getOrders(event.currentTarget);
  });


$('#myForm').on('submit',function(e){
  e.preventDefault();
  var firstName = $( "#customerFirstName" ).val();
  var lastName = $( "#customerLastName" ).val();
  var customerAddress = $( "#customerAddress" ).val();

  // In my case, I need to fetch these data before custom actions
  $.ajax({
    url: "https://custapp2018.azurewebsites.net/api/customers",
    type: 'POST',
    data: JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "address": customerAddress}),
    processData: false,
    contentType: 'application/json',
    success: function (comments) {
      console.log("Yiiiaaaahhhhaaaaaa");
    },
    error: function (request, message, error) {
      handleException(request, message, error);
    }
  });
});
