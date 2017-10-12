$(document).ready(function() {
  /* global moment */

  // blogContainer holds all of our outfits
  var blogContainer = $(".blog-container");
  var outfitCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleOutfitDelete);
  $(document).on("click", "button.edit", handleOutfitEdit);
  // Variable to hold our outfits
  var outfits;

  // The code below handles the case where we want to get blog outfits for a specific stylist
  // Looks for a query param in the url for stylist_id
  var url = window.location.search;
  var stylistId;
  if (url.indexOf("?stylist_id=") !== -1) {
    stylistId = url.split("=")[1];
    getOutfits(stylistId);
  }
  // If there's no stylistId we just get all outfits as usual
  else {
    getOutfits();
  }


  // This function grabs outfits from the database and updates the view
  function getOutfits(stylist) {
    stylistId = stylist || "";
    if (stylistId) {
      stylistId = "/?stylist_id=" + stylistId;
    }
    $.get("/api/outfits" + stylistId, function(data) {
      console.log("Outfits", data);
      outfits = data;
      if (!outfits || !outfits.length) {
        displayEmpty(stylist);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete outfits
  function deleteOutfit(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/outfits/" + id
    })
    .done(function() {
      getOutfits(outfitCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed outfit HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var outfitsToAdd = [];
    for (var i = 0; i < outfits.length; i++) {
      outfitsToAdd.push(createNewRow(outfits[i]));
    }
    blogContainer.append(outfitsToAdd);
  }

  // This function constructs a outfit's HTML
  function createNewRow(outfit) {
    var formattedDate = new Date(outfit.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newOutfitPanel = $("<div>");
    newOutfitPanel.addClass("panel panel-default");
    var newOutfitPanelHeading = $("<div>");
    newOutfitPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newOutfitTitle = $("<h2>");
    var newOutfitDate = $("<small>");
    var newOutfitStylist = $("<h5>");
    newOutfitStylist.text("Styled by: " + outfit.Stylist.name);
    newOutfitStylist.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newOutfitPanelBody = $("<div>");
    newOutfitPanelBody.addClass("panel-body");
    var newOutfitBody = $("<p>");
    newOutfitTitle.text(outfit.title + " ");
    newOutfitBody.text(outfit.body);
    newOutfitDate.text(formattedDate);
    newOutfitTitle.append(newOutfitDate);
    newOutfitPanelHeading.append(deleteBtn);
    newOutfitPanelHeading.append(editBtn);
    newOutfitPanelHeading.append(newOutfitTitle);
    newOutfitPanelHeading.append(newOutfitStylist);
    newOutfitPanelBody.append(newOutfitBody);
    newOutfitPanel.append(newOutfitPanelHeading);
    newOutfitPanel.append(newOutfitPanelBody);
    newOutfitPanel.data("outfit", outfit);
    return newOutfitPanel;
  }

  // This function figures out which outfit we want to delete and then calls deleteOutfit
  function handleOutfitDelete() {
    var currentOutfit = $(this)
      .parent()
      .parent()
      .data("outfit");
    deleteOutfit(currentOutfit.id);
  }

  // This function figures out which outfit we want to edit and takes it to the appropriate url
  function handleOutfitEdit() {
    var currentOutfit = $(this)
      .parent()
      .parent()
      .data("outfit");
    window.location.href = "/cms?outfit_id=" + currentOutfit.id;
  }

  // This function displays a messgae when there are no outfits
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Stylist #" + id;
    }
    blogContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No outfits yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    blogContainer.append(messageh2);
  }

});
