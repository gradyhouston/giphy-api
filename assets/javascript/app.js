// Variables

giphyObj = {
  topics: [
    "Ironman",
    "Spiderman",
    "The Flash",
    "Captain America",
    "Star Lord",
    "Batman",
    "Black Panther",
    "Green Lantern",
    "Superman",
    "The Hulk",
    "Thor",
    "Green Arrow"
  ],


// Functions

buildButtons: function() {

  // Deletes the gifs prior to adding the new gifs

    // Figure out what I need to target
    $("#buttonsView").empty();
    // Loops through the array of topics (gifs)
      for (var i = 0; i < this.topics.length; i++) {
        console.log("This is the topics object: " + this.topics);

        // Dynamically generates buttons for each gif in the array
        var buildButton = $("<button>"); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        buildButton.attr("class", "col s6 m3 l2 waves-effect waves-light btn blue darken-1 z-depth-3 celeb") // Added a class
        buildButton.attr("data-name", this.topics[i]); // Added a data attribute
        buildButton.text(this.topics[i]); // Provided the inital button text
        console.log("the button element: " + JSON.stringify(buildButton));

        // Append the div to buttonsView
        $("#buttonsView").append(buildButton);
      }
},

displayCelebInfo: function() {
  // API Data
  var celeb = $(this).data("name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celeb + "&api_key=XizAh0aiv856PoVkEuUUHz46uApuVJIc&limit=8";

    // Ajax call that pulls the data from the giphy API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
   .done(function(response) {
      // Logs the response
      console.log("This is the API response: " + JSON.stringify(response));

      // Sets the variable 'results' = the data coming in from the giphy API
      var results = response.data;

      // Empties the buttonsView before adding a new button
      $("#gifsAppearHere").empty();

      // // using Underscore.js and template the image changes.
      var $gifs = $("#gifsAppearHere");
      // Targeting the underscore template housed in the html
      var $giphy = _.template($("#giphy").html());
      // for each loop similar to that used in Star wars game
      results.forEach(function(result) {
            $gifs.prepend($giphy({result: result }));
        });


});

}
}

// Page load and run functions

$(document).ready(function() {


  // This function handles events when a button is clicked
  $("#addCeleb").click(function() {

    // This will grab the line of code from the textbox
    var celeb = $("#celeb-input").val().trim();
    console.log("The input was: " + celeb);
    // The celeb picked is pushed to the topics array
    giphyObj.topics.push(celeb);
    // This function puts the button just created on the page
    giphyObj.buildButtons();

    return false;
});

// Displays the celebrity information on the page after click

$(document).on("click", ".celeb", giphyObj.displayCelebInfo);
  console.log(this);

// This handles the gif animations. Depending on the current state, the gif's state will either be still or animated once clicked.
$(document).on("click", ".card-image img", function() {
  console.log("Image click: " + this);

  var state = $(this).attr("data-state");
  // Changes the state to be animated
  if (state === "still") {
    var animateUrl = $(this).attr("data-animate");
    $(this).attr("src", animateUrl);
    $(this).attr("data-state", "animate");
    console.log(state);

  } else {
    var animateUrl = $(this).attr("data-still");
    $(this).attr("src", animateUrl);
    $(this).attr("data-state", "still");
  }
});

$("#buttonsView").empty();
giphyObj.buildButtons();

});
