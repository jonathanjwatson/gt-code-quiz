$(document).ready(function () {
  console.log("Inside the ready function");
  console.log(questions);

  // VARIABLES
  var currentQuestionIndex = 0;
  var secondsRemaining = 75;
  var timer;

  // FUNCTION DEFINITIONS
  function populateQuestions() {
    $("#questions").empty();
    var questionHeadingEl = $("<h1>");
    questionHeadingEl.text(questions[currentQuestionIndex].title);
    $("#questions").append(questionHeadingEl);

    // Populate the answer choices
    // Write a for loop to do that.
    for (var i = 0; i < questions[currentQuestionIndex].choices.length; i++) {
      console.log(questions[currentQuestionIndex].choices[i]);
      var currentChoice = questions[currentQuestionIndex].choices[i];
      var answerEl = $(
        "<div class='row'><button class='btn btn-info answer-choices' value='" +
          currentChoice +
          "'>" +
          currentChoice +
          "</button></div>"
      );
      $("#questions").append(answerEl);
    }
  }

  // FUNCTION CALLS

  // EVENT LISTENERS
  $("#start-button").on("click", function () {
    console.log("You clicked the start button");
    // Hide the welcome div
    $("#welcome").hide();
    // Show the questions div
    $("#questions").show();
    // Populate the questions div with the first question
    populateQuestions();
    // Start the timer
    timer = setInterval(function () {
      // console.log("ticking down");
      if (secondsRemaining <= 0) {
        clearInterval(timer);
        alert("Sorry! You weren't fast enough");
        $("#questions").empty();
      } else {
        secondsRemaining--;
        console.log(secondsRemaining);
        $("#time-remaining").text(secondsRemaining);
      }
    }, 1000);
  });

  $("#questions").on("click", ".answer-choices", function () {
    console.log($(this).val());

    // Compare the value clicked to the correct answer
    if ($(this).val() === questions[currentQuestionIndex].answer) {
      // If the answer is correct - Inform the user that it is correct
      alert("That is correct!");
    } else {
      // If the answer is incorrect -
      // - Inform the user they are incorrect

      alert("That is incorrect!");
      // - Decrease the timer by 10/15 seconds
      secondsRemaining = secondsRemaining - 15;
    }

    // If currentQuestionIndex < questions.length - 1
    if (currentQuestionIndex < questions.length - 1) {
      // Increment the currentQuestionIndex
      currentQuestionIndex++;
      // Populate
      populateQuestions();
    } else {
      // Else
      // Empty out the questions div
      $("#questions").empty();
      // Display the User Name input
      $("#high-score").show();
      // Storing the high score to local storage.
      clearInterval(timer);
    }
  });

  $("#high-score-form").on("submit", function (event) {
    var initials = $("#high-score-input").val();
    event.preventDefault();
    if (initials.length > 0) {
      console.log("You submitted the form");
      var highScores = JSON.parse(localStorage.getItem("high-scores"));
      console.log(highScores);
      if (highScores === null) {
        highScores = [];
      }
      console.log(highScores);

      var currentScore = {
        initials: initials,
        score: secondsRemaining,
      };
      highScores.push(currentScore);
      localStorage.setItem("high-scores", JSON.stringify(highScores));
      // Redirect to high scores page
      window.location.href = "./high-scores.html";
    }

    // Store in Local Storage
    // Your initials and the time remaining
    // Grab initials from the form input
    // Grab the score from time remaining;
    //   var highScores = [
    //       {
    //           initials: "JJW",
    //           score: 50
    //       }
    //   ]
  });
});
