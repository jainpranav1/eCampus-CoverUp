// start up
console.log("start up");

// saves list of question nodes
var questions = document.querySelectorAll(".clearfix.liItem.read");

// displays or hides answers when question clicked
function display_function() {
	if (this.hidden == true) {
		hide_answers(this, false);
		this.hidden = false;
	}
	else {
		hide_answers(this, true);
		this.hidden = true;
	}
}

// shows or hides answers
function hide_answers(question, hide) {
	var indents, details, question_points, selec_ans_label, selec_ans, big_icon, labels;
	if (hide == true) {
		// hides question points
		question_points = question.querySelector(".contentListRight");
		if (question_points != null) {
			question_points.style.display = "none";
		}
		
		// saves details node
		details = question.querySelector(".details");
		
		// hides big correct/incorrect icon
		big_icon = details.querySelector(".reviewTestSubCellForIconBig");
		if (big_icon != null) {
			big_icon.style.display = "none";
		}
		
		// saves labels (selected answer, answers, response feedback, correct answer)
		labels = details.querySelectorAll(".label");
		
		// checks if choices are available
		var are_choices = false
		for (var j = 0; j < labels.length; ++j) {
			if (labels[j].textContent == "Answers:") {
				are_choices = true;
				break;
			}
		}
		
		// hides labels (selected answer, answers, response feedback, correct answer) and respective answers
		if (are_choices == true) {
			for (var j = 0; j < labels.length; ++j) {
				if (labels[j].textContent.includes("Selected Answer") || labels[j].textContent.includes("Response Feedback") || labels[j].textContent.includes("Correct Answer")) {
					labels[j].parentElement.parentElement.style.display = "none";
				}
			}
			
			// hides small correct/incorrect icon and spacers
			indents = details.querySelectorAll(".correctAnswerFlag, .incorrectAnswerFlag, .spacerImageHolder");
			for (var j = 0; j < indents.length; ++j) {
				indents[j].style.display = "none";
			}
		}
		else {
			details.firstElementChild.rows[2].style.display = "none";
		}		
	}
	else {
		// shows question points
		question_points = question.querySelector(".contentListRight");
		if (question_points != null) {
			question_points.style.display = "inline";
		}
		
		// saves details node
		details = question.querySelector(".details");
		
		// shows big correct/incorrect icon
		big_icon = details.querySelector(".reviewTestSubCellForIconBig");
		if (big_icon != null) {
			big_icon.style.display = "table-cell";
		}
		
		// saves labels (selected answer, answers, response feedback, correct answer)
		labels = details.querySelectorAll(".label");
		
		// checks if choices are available
		var are_choices = false
		for (var j = 0; j < labels.length; ++j) {
			if (labels[j].textContent == "Answers:") {
				are_choices = true;
				break;
			}
		}
		
		// shows labels (selected answer, answers, response feedback, correct answer) and respective answers
		if (are_choices == true) {
			for (var j = 0; j < labels.length; ++j) {
				if (labels[j].textContent.includes("Selected Answer") || labels[j].textContent.includes("Response Feedback") || labels[j].textContent.includes("Correct Answer")) {
					labels[j].parentElement.parentElement.style.display = "table-row";
				}
			}
			
			// shows small correct/incorrect icon and spacers
			indents = details.querySelectorAll(".correctAnswerFlag, .incorrectAnswerFlag, .spacerImageHolder");
			for (var j = 0; j < indents.length; ++j) {
				indents[j].style.display = "inline";
			}
		}
		else {
			details.firstElementChild.rows[2].style.display = "table-row";
		}
	}
}

// receives message from ecampus_coverup_button.js
chrome.runtime.onMessage.addListener(gotMessage);

// runs when message received from ecampus_coverup_button.js
function gotMessage(message, sender, sendResponse) {	
	if (message == "on") {		
		for (var i = 0; i < questions.length; ++i) {
			// adds hidden attribute to question node
			questions[i].setAttribute("hidden", false);
			
			// displays or hides answers when question clicked
			questions[i].addEventListener("click", display_function);
			
			// hides answers
			hide_answers(questions[i], true);
		}
	}
	else {
		for (var i = 0; i < questions.length; ++i) {
			// removes hidden attribute to question node
			questions[i].removeAttribute("hidden");
			
			// disables the displaying or hiding of answers when question clicked
			questions[i].removeEventListener("click", display_function);
			
			// shows answers
			hide_answers(questions[i], false);
		}	
	}
}

