var wTime = new Date();
wTime = wTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });

if (wTime == "12 PM" || wTime == "1 AM" || wTime == "2 AM" || wTime == "3 AM" || wTime == "4 AM" || wTime == "5 AM" || wTime == "6 AM" || wTime == "7 AM"){
  document.getElementById("onof").style.color = 'red';
  document.getElementById("onof").innerHTML = "Offline";
}
else{
  document.getElementById("onof").style.color = 'green';
}


function isEmpty(str) {
    return !str.trim().length;
}

let inputText = document.getElementById("input-text");
let inputButton = document.getElementById("micAndsend");
var timer = 0;

var enterClick = 0;
var clicked = 0;

var maxText = 0;

document.getElementById("input-text").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    if(enterClick == 1){
      clickt()
      enterClick = 0
    }
  }
});

inputText.addEventListener("input", function() {
  if( isEmpty(this.value) ) {
    inputButton.classList.remove("fa-arrow-right");
    inputButton.classList.add("fa-microphone");
  } else {
    inputButton.classList.remove("fa-microphone");
    inputButton.classList.add("fa-arrow-right")
    enterClick = 1;
    if(clicked == 1){
      clickt();
    } 
  }
});

var emojiClickt = 0;


function emojiClick(){
  emojiClickt++

  console.log(emojiClickt);

  function isOdd(num) { return num % 2;}
  var singleORdouble  = isOdd(emojiClickt);

  console.log(singleORdouble);

  if(singleORdouble == 1){
    document.getElementById("panel-emote").style.display = "block";
  }else{
    document.getElementById("panel-emote").style.display = "none";
  }
  
}

var xTime = 119;

function timeToGlock(){
  
  var xsss = inputText.value.length;

  xsss--;

  var vaow = xTime - xsss;

  document.getElementById("timerGlock").innerHTML = vaow;

}

const questions = [ 
  ["how are you", "how is life", "how are things"], 
  ["hi", "hey", "hello", "good morning", "good afternoon"], 
  ["what are you doing", "what is going on", "what is up"],  
  ["how old are you"],	
  ["who are you", "are you human", "are you bot", "are you human or bot"],  
];

const answers = [
 ["Fine... how are you?","Pretty well, how are you?","Fantastic, how are you?"], 
 ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],
 ["Nothing much","About to go to sleep","Can you guess?","I don't know actually"]
 ["I am infinite"],
 ["I am just a bot", "I am a bot. What are you?"],
];

function clickt(){
  clicked = 1;

  var useText = inputText.value;
  
    // I think it's useless, let them write as they want. 1.00AM 7/2/22

    // var idiot = useText.indexOf(' ');

    // if(idiot == -1){
    //   useText = "Are You Idiot Dude? \n why don't you space"
    // }
  
  //Nonsense Administration
  
  // var useTextL = useText.length;
  
  // useText1 = useText.substring(0,30);
  // var n1 = useText1.lastIndexOf(' ');
  // // useTextN1 = useText.substring(0,n1);

  // useText2 = useText.substring(0,60);
  // var n2 = useText2.lastIndexOf(' ');
  // // useTextN2 = useText.substring(n1,n2);

  // useText3 = useText.substring(0,90);
  // let n3 = useText3.lastIndexOf(' ');
  // // useTextN3 = useText.substring(n2,n3);

  // // useText = useTextN1.concat('\n' ,useTextN2 , '\n' , useTextN3);


  // if(useTextL > 0 && useTextL <= 30){

  //  if(n1 == -1){

  //   useTextN1 = useText.substring(0,30);

  //  }else{

  //   textUser1 = useText.substring(20,30);
  //   userSpace1 = textUser1.lastIndexOf(' ');

  //   useTextN1 = useText.substring(0,n1);

  //  }

  //  useText = useTextN1

  // }
  
  // else if(useTextL > 30 && useTextL <= 60){

    

  //   if(n1 == -1){

      

  //     if(n2 == -1){

       

  //     }

  //   }else if(n2 == -1){

      

  //   }


  // }

  let ccItem = document.createElement('div');
  let ssItem = document.createElement('div');
  let selectElement = document.getElementById("chatPanel");
  
  ccItem.innerHTML = `<p class="chat-Text num='${timer}'">${useText}</p>`;
  selectElement.insertBefore(ccItem, selectElement.childNodes[timer]);
  timer++

  ssItem.style.cssText = 'text-align: right;';
  ssItem.innerHTML = `<p class="chat-Text">${answers[3][1]}</p>`;
  selectElement.insertBefore(ssItem, selectElement.childNodes[timer]);
  timer++
  
  // Numarayi 2 azaltip en usttekini sil
  // if(timer == 12){
  //   document.getElementsByClassName("chat-Text").num;
  // }

  inputText.value = "";
  clicked = 0;

  document.getElementById("micAndsend").classList.remove("fa-arrow-right");
  inputButton.classList.add("fa-microphone");   

  document.getElementById("timerGlock").innerHTML = 120;

}

//W3

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  document.getElementById("myModal").style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  document.getElementById("myModal").style.display = "none";
}


// use document.form["form-name"] to reference the form
const ccForm = document.forms["ccform"];

// bind the onsubmit property to a function to do some logic
ccForm.onsubmit = function(e) {

  // access the desired input through the var we setup
  var forumSelection1 = ccForm.fontTypeFORUM.value;
  var forumSelection2 = ccForm.fontSizeFORUM.value;
  var forumSelection3 = ccForm.backgroundColorFORUM.value;


  if(forumSelection1 == "None"){
    document.getElementById("uWannaDelete").remove();
    document.getElementById("iWannaDeleteModal").remove();
    document.getElementsByTagName("html")[0].style.backgroundImage = 'url("404notfound.png")';
    document.getElementsByTagName("html")[0].style.backgroundRepeat = "no-repeat";
    document.getElementsByTagName("html")[0].style.backgroundPosition = "center";
    document.getElementsByTagName("html")[0].style.backgroundAttachment = "fixed";
    document.getElementById("myModal").style.background = "none"
    
    alert("U're So Funny \n I have surprise For U")
  }


  document.getElementById("forForum").style.fontSize = forumSelection2;

  e.preventDefault();

  if(forumSelection3 == "black"){
    document.querySelector(".menubackground1").style.background = "white";
    document.querySelector(".menubackground2").style.background = forumSelection3;
    document.querySelector(".text-panel").style.background = forumSelection3;
    document.querySelector("#panel-text").style.background = forumSelection3;
    document.querySelector(".glockTimer").style.color = "rgba(255, 255, 255, 0.5)";
    document.querySelector("#myBtn").style.color = "white";
    document.querySelector(".chat-Text").style.background = "white";
    document.querySelector(".chat-Text").style.color = forumSelection3;
  }
  else if(forumSelection3 == "colorful"){
    document.querySelector(".menubackground1").style.background = "linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)";
    document.querySelector(".menubackground2").style.background = "black";
    document.querySelector(".text-panel").style.background =  "black";
    document.querySelector("#panel-text").style.background =  "black";
    document.querySelector(".glockTimer").style.color = "rgba(255, 255, 255, 0.5)";
    document.querySelector("#myBtn").style.color = "blueviolet";
    document.querySelector(".chat-Text").style.background = "white";
    document.querySelector(".chat-Text").style.color = "darkblue";
  }
  else{
    document.querySelector(".menubackground1").style.background = "black";
    document.querySelector(".menubackground2").style.background = forumSelection3;
    document.querySelector(".text-panel").style.background = forumSelection3;
    document.querySelector("#panel-text").style.background = forumSelection3;
    document.querySelector(".glockTimer").style.color = "black";
    document.querySelector("#myBtn").style.color = "black";
    document.querySelector(".chat-Text").style.background = "black";
    document.querySelector(".chat-Text").style.color = forumSelection3;
  }

}

// Adaptive Upper Line


// var text = "Bakalım robot benim yazdığım algoritma sfdsfasf safsf asfas f"

// var x = "Bakalım robot benim yazdığım" + '\n' + "sdasds"

// var textL = text.length;

// console.log(textL);

// if(textL > 60 && textL < 90){
    
//   text1 = text.substring(0,30);
//   let tn1 = text1.lastIndexOf(' ');
//   tn1++
//   textN1 = text.substring(0,tn1);

//   text2 = text.substring(0,60);
//   let tn2 = text2.lastIndexOf(' ');
//   tn2++
//   textN2 = text.substring(tn1,tn2);

//   text3 = text.substring(0,90);
//   let tn3 = textL;
//   textN3 = text.substring(tn2,tn3);


//   text = textN1.concat('\n' ,textN2 , '\n' , textN3);

//   console.log("bIRIN KELLESI "+ text);


// }else if(textL > 30 && textL < 60){

//   text1 = text.substring(0,30);
//   let tn1 = text1.lastIndexOf(' ');
//   tn1++
//   textN1 = text.substring(0,tn1);

//   text2 = text.substring(0,60);
//   let tn2 = textL;
//   textN2 = text2.substring(tn1,tn2);


//   text = textN1.concat('\n' + textN2);

//   console.log("2 KELLESI " + text);

// }else {
//  alert("üşendim sorry")
// }

//Biri bana şunu sormuştu ikizimi buldum tamamen aynıyız ama bir türlü konuşamıyorum gururuma yediremiyorum şey demiştim içimden bu kadar buluyorsun ve beraber olamıyor musunuz garipsin sen falan yapmıştım noldu acaba onlara