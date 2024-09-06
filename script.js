//import { question,id,options,answer } from "./questions";
// import {questions} from "./questions.js";
const questionnumber = document.querySelector(".question-number");
const questiontext  = document.querySelector(".question-text");
const optioncontainer = document.querySelector(".option-container");
const answerindicatorcontainer = document.querySelector(".ans-indicator")
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

// let question limit on dispalay only 5 out of 7 then create 'limit' variable instead of questions.length
//let questionlimit = 5;  
let currentquestion; 
let questtioncounter = 0;
let availablequestions = []
let availableoptions = [];
let correctanswer = 0;
let attepts = 0;

// push the questions into availablequestions array
setavailablequestions = (() => {
     for(let i=0; i<questions.length; i++){
        availablequestions.push(questions[i])
   }
     //console.log(availablequestions)
})

// set question  number and options 

getnewquestion = (() => {

   //console.log("new question called")
    questionnumber.innerHTML = "Question" +" " + (questtioncounter + 1) + " " + "of" +" " + questions.length;
    // set quesion text
    // get random question
const questionindex = availablequestions[Math.floor(Math.random() * availablequestions.length)]
 currentquestion = questionindex;
 questiontext.innerHTML = currentquestion.question;
 //get the position of 'questionindex' from the availablequestions array
 const index1 = availablequestions.indexOf(questionindex);
 //remove the questionindex from the availablequestions Array so that questions does not repeat
 availablequestions.splice(index1,1);
 //console.log(questionindex);

 
 
 for (let i=0; i<currentquestion.options.length; i++){
    availableoptions.push(i)
 } 
 let animationdelay  = 0.15;
 

 for (let i=0; i<currentquestion.options.length; i++){
   //  const optionindex = availableoptions[Math.floor(Math.random() * availableoptions.length)];
   //  const index2 = availableoptions.indexOf(optionindex);
   //  availableoptions.splice(index2,1)
    const option = document.createElement("div")
    option.innerHTML = currentquestion.options[i]
    option.id = i;
    option.style.animationDelay = animationdelay + 's';
    animationdelay = animationdelay + 0.15;
    option.className = "option";
    optioncontainer.appendChild(option)
    option.setAttribute("onclick","getresult(this)");
 }

 questtioncounter++;

 getresult=((element)=>{
   //console.log(element.innerHTML);
   const id = parseInt(element.id);
   //console.log(typeof id);
// get the answer id of the clicked option;
   if(id == currentquestion.answer){
    //  console.log("correct answer");
      element.classList.add("answer")
      // element.setAttribute("style","background-color:green")
      updateanswerindicator("answer")
      correctanswer++;
      console.log("correcr:" + correctanswer);
      
   }
   else{
     //  console.log("answer is wrong");
      element.classList.add("wrong")
      // element.setAttribute("style","background-color:red")
    this.document.getElementsByClassName("option")[currentquestion.answer].setAttribute("style","background-color:green")
      updateanswerindicator("wrong");

      // const optionlen = optioncontainer.children.length;
      // for (let i=0; i< optionlen; i++){
      //    if(parseInt(optioncontainer.children[i].id)=== currentquestion.answer){
      //       element.classList.add("answer");
      //    }
      // }
   }
   attepts++;
   // unclickbleoption();


 })
// unclickbleoption  = (()=>{
//    for(let i=0; i< optioncontainer.children.length; i++){
//       optioncontainer.children[i].classList.add("already-answered");
//    }
//  })


  answerindicator = (() => {
   answerindicatorcontainer.innerHTML = '';
   for(let j=0; j<questions.length; j++){
      const indicator = document.createElement("div")
      indicator.setAttribute("id",j);
      answerindicatorcontainer.appendChild(indicator);

   }
  })
function updateanswerindicator(marktype){
   answerindicatorcontainer.children[questtioncounter-1].classList.add(marktype);
   
}

 next = (() => {
   //console.log("next fun called")
   const n=optioncontainer.children.length
   optioncontainer.innerHTML='';
   // for(var k=0;k<n;k++){
   //    optioncontainer.children[k].remove()
   //  }
 if(questtioncounter == questions.length){
    //console.log("quiz over");
    quizOver();

    }
    else{
        getnewquestion();
    }
 })

}) ;

function quizOver(){
   quizBox.classList.add("hide");
   resultBox.classList.remove("hide");
   quizResults();
}

quizResults = (() => {
   resultBox.querySelector(".total-questions").innerHTML = questions.length;
   resultBox.querySelector(".attempted-questions").innerHTML = attepts;
   resultBox.querySelector(".total-correct").innerHTML = correctanswer;
   resultBox.querySelector(".total-wrong").innerHTML = attepts - correctanswer;
     const percentage = (correctanswer/questions.length)*100;
   resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
   resultBox.querySelector(".total-score").innerHTML = correctanswer + " / " + questions.length;
})

function resetQuiz(){
   questtioncounter = 0;
   correctanswer = 0;
   attepts = 0;
}

function tryagainquiz(){
   resultBox.classList.add("hide");
   // getnewquestion();

   quizBox.classList.remove("hide");
   resetQuiz();
   startQuiz();
}
backtohome = (() => {
     resetQuiz();
     resultBox.classList.add("hide");
     homeBox.classList.remove("hide");
})

// start point
startQuiz = (() => {
    homeBox.classList.add("hide");
    
    quizBox.classList.remove("hide");
    
    // first we will set all questions into the array
    setavailablequestions();
    // second call the newquestions(); function
    getnewquestion();

    answerindicator();
  

});

