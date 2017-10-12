$(document).ready(function() {
  // Getting references to the name inout and stylist container, as well as the table body
  var nameInput = $("#stylist-name");
  var stylistList = $("tbody");
  var stylistContainer = $(".stylist-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Stylist
  $(document).on("submit", "#stylist-form", handleStylistFormSubmit);
  $(document).on("click", ".delete-stylist", handleDeleteButtonPress);

  // Getting the intiial list of Stylists
  getStylists();

  // A function to handle what happens when the form is submitted to create a new Stylist
  function handleStylistFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertStylist function and passing in the value of the name input
    upsertStylist({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an stylist. Calls getStylists upon completion
  function upsertStylist(stylistData) {
    $.post("/api/stylists", stylistData)
      .then(getStylists);
  }

  // Function for creating a new list row for stylists
  function createStylistRow(stylistData) {
    var newTr = $("<tr>");
    newTr.data("stylist", stylistData);
    newTr.append("<td>" + stylistData.name + "</td>");
    newTr.append("<td> " + stylistData.Outfits.length + "</td>");
    newTr.append("<td><a href='/blog?stylist_id=" + stylistData.id + "'>Go to Outfits</a></td>");
    newTr.append("<td><a href='/cms?stylist_id=" + stylistData.id + "'>Create a Outfit</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-stylist'>Delete Stylist</a></td>");
    return newTr;
  }

  // Function for retrieving stylists and getting them ready to be rendered to the page
  function getStylists() {
    $.get("/api/stylists", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createStylistRow(data[i]));
      }
      renderStylistList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of stylists to the page
  function renderStylistList(rows) {
    stylistList.children().not(":last").remove();
    stylistContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      stylistList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no stylists
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Stylist before you can create a Outfit.");
    stylistContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("stylist");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/stylists/" + id
    })
    .done(getStylists);
  }
});
