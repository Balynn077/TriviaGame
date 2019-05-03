$(document).ready(function(){
  
	
$("#remaining-time").hide();
$("#start").on('click', trivia.startGame);
$(document).on('click' , '.option', trivia.guessChecker);
	
})
  
var trivia = {
	
correct: 0,
incorrect: 0,
unanswered: 0,
currentSet: 0,
timer: 20,
timerOn: false,
timerId : '',
	
questions: {
	q1: "Who carries the One Ring?",
	q2: "How many years old is Legolas?",
	q3: "How many rings of power did Sauron create?",
	q4: "Which kingdom does Aragorn hail from?",
	q5: "How many members are in the Fellowship of the Ring?",
	q6: "Originally which race was Smeagol?",
	q7: "Who WAS the king of Rohan?"
},
options: {
	q1: ['Frodo', 'Samwise', 'Aragorn', 'Gimli'],
	q2: ['45', '1259', '568', '2931'],
	q3: ['5', '13', '9', '19'],
	q4: ['Mordor', 'The Shire', 'Gondor', 'Rohan'],
	q5: ['9','10','12','7'],
	q6: ['Elf','Hobbit','Human','Orc'],
	q7: ['Aragorn', 'Theoden', 'Sauron','Samwise Gamgee']
},
answers: {
	q1: 'Frodo',
	q2: '2931',
	q3: '19',
	q4: 'Gondor',
	q5: '9',
	q6: 'Hobbit',
	q7: 'Theoden'
},
	
startGame: function(){
	  
	trivia.currentSet = 0;
	trivia.correct = 0;
	trivia.incorrect = 0;
	trivia.unanswered = 0;
	clearInterval(trivia.timerId);
	  
	  
$('#game').show();
	  
$('#results').html('');
	   
$('#timer').text(trivia.timer);
	  
$('#start').hide();
  
$('#remaining-time').show();
	  
trivia.nextQuestion();
	  
},
	
nextQuestion : function(){
	  
	
trivia.timer = 10;
$('#timer').removeClass('last-seconds');
$('#timer').text(trivia.timer);
	  
if(!trivia.timerOn){
trivia.timerId = setInterval(trivia.timerRunning, 1000);
}
	  
var questionContent = Object.values(trivia.questions)[trivia.currentSet];
$('#question').text(questionContent);
	  
var questionOptions = Object.values(trivia.options)[trivia.currentSet];
	  
$.each(questionOptions, function(index, key){
$('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
})
	  
},
	
timerRunning : function(){
	 
if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
$('#timer').text(trivia.timer);
trivia.timer--;
if(trivia.timer === 4){
$('#timer').addClass('last-seconds');
}
}
	 
else if(trivia.timer === -1){
	trivia.unanswered++;
	trivia.result = false;
	clearInterval(trivia.timerId);
	resultId = setTimeout(trivia.guessResult, 1000);
	$('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
}
	  
else if(trivia.currentSet === Object.keys(trivia.questions).length){
		
$('#results')
.html('<h3>Thanks for playing!</h3>'+
'<p>Correct: '+ trivia.correct +'</p>'+
'<p>Incorrect: '+ trivia.incorrect +'</p>'+
'<p>Unaswered: '+ trivia.unanswered +'</p>'+
'<p>Play again?</p>');
		
$('#game').hide();
		
$('#start').show();
}
	  
},
	
guessChecker : function() {
	  
var resultId;
	  
var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
	  
if($(this).text() === currentAnswer){
		
$(this).addClass('btn-success').removeClass('btn-info');
		
trivia.correct++;
clearInterval(trivia.timerId);
resultId = setTimeout(trivia.guessResult, 1000);
$('#results').html('<h3>Correct!</h3>');
}
	 
else{
		
$(this).addClass('btn-danger').removeClass('btn-info');
		
trivia.incorrect++;
clearInterval(trivia.timerId);
resultId = setTimeout(trivia.guessResult, 1000);
$('#results').html('<h3>Wrong! '+ currentAnswer +'</h3>');
}
	  
},
	
guessResult : function(){
	  
trivia.currentSet++;
	  
$('.option').remove();
$('#results h3').remove();
	  
trivia.nextQuestion();
	   
}
  
}