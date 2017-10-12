$(document).ready(function() {
  // Getting jQuery references to the stylist body, title, form, and stylist select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var stylistSelect = $("#stylist");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a stylist)
  var url = window.location.search;
  var outfitId;
  var stylistId;
  // Sets a flag for whether or not we're updating a stylist to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the stylist id from the url
  // In '?stylist_id=1', outfitId is 1
  if (url.indexOf("?stylist_id=") !== -1) {
    outfitId = url.split("=")[1];
    getOutfitData(outfitId, "stylist");
  }
  // Otherwise if we have an stylist_id in our url, preset the stylist select box to be our Stylist
  else if (url.indexOf("?stylist_id=") !== -1) {
    stylistId = url.split("=")[1];
  }

  // Getting the stylists, and their stylists
  getStylists();

  // A function for handling what happens when the form to create a new stylist is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the stylist if we are missing a body, title, or stylist
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !stylistSelect.val()) {
      return;
    }
    // Constructing a newOutfit object to hand to the database
    var newOutfit = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      StylistId: stylistSelect.val()
    };

    // If we're updating a stylist run updateOutfit to update a stylist
    // Otherwise run submitOutfit to create a whole new stylist
    if (updating) {
      newOutfit.id = outfitId;
      updateOutfit(newOutfit);
    }
    else {
      submitOutfit(newOutfit);
    }
  }

  // Submits a new stylist and brings user to blog page upon completion
  function submitOutfit(stylist) {
    $.stylist("/api/stylists", stylist, function() {
      window.location.href = "/blog";
    });
  }

  // Gets stylist data for the current stylist if we're editing, or if we're adding to an stylist's existing stylists
  function getOutfitData(id, type) {
    var queryUrl;
    switch (type) {
      case "outfit":
        queryUrl = "/api/outfits/" + id;
        break;
      case "stylist":
        queryUrl = "/api/stylists/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.StylistId || data.id);
        // If this stylist exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        stylistId = data.StylistId || data.id;
        // If we have a stylist with this id, set a flag for us to know to update the stylist
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Stylists and then render our list of Stylists
  function getStylists() {
    $.get("/api/stylists", renderStylistList);
  }
  // Function to either render a list of stylists, or if there are none, direct the user to the page
  // to create an stylist first
  function renderStylistList(data) {
    if (!data.length) {
      window.location.href = "/stylists";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createStylistRow(data[i]));
    }
    stylistSelect.empty();
    console.log(rowsToAdd);
    console.log(stylistSelect);
    stylistSelect.append(rowsToAdd);
    stylistSelect.val(stylistId);
  }

  // Creates the stylist options in the dropdown
  function createStylistRow(stylist) {
    var listOption = $("<option>");
    listOption.attr("value", stylist.id);
    listOption.text(stylist.name);
    return listOption;
  }

  // Update a given stylist, bring user to the blog page when done
  function updateOutfit(stylist) {
    $.ajax({
      method: "POST",
      url: "/api/outfits",
      data: stylist
    })
    .done(function() {
      window.location.href = "/blog";
    });
  }
});
