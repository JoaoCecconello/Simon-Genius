var playerClickedSequency;
var playerRound;
var sequency;
var difficultyTime;
var fadeTime;
var round;
var rounds;
var timer;
var shineSequencyTimer;

const buttons = document.getElementsByClassName("button");
for (var i = buttons.length - 1; i >= 0; i--) {
	buttons[i].addEventListener("click",verify);
}

var difficultyBtn = document.getElementsByName("difficultyBtn");
for(i = 0; i<difficultyBtn.length; i++){
	difficultyBtn[i].addEventListener("click",start)
}

function verify(){
	if(playerRound){
		blink(this,150);
		playerClickedSequency+=this.value
		if(playerClickedSequency.charAt(playerClickedSequency.length-1) != sequency.charAt(playerClickedSequency.length-1))
				youLoseScreen();

		if(playerClickedSequency.length==round){
			if(playerClickedSequency == sequency)
				youWonScreen();

			if(round!=rounds){
				setTimeout(function(){
					for (var i = 3; i >= 0; i--){
						blink(buttons[i], 600);
					}
				},250)
				playerRound = false;
				playerClickedSequency = "";
				shineSequency();
				round++;
				document.getElementById("roundNumber").innerHTML = Number(round);
			}
		}
	}
}

function shineSequency(){
	for (var i = buttons.length - 1; i >= 0; i--){
		buttons[i].setAttribute('disabled','disabled');
		buttons[i].style.cursor = "context-menu";
	}

	let countTimes = 0;
	shineSequencyTimer = setInterval(function(){
		if(countTimes == round){
			clearInterval(shineSequencyTimer);
			for(var i = buttons.length - 1; i >= 0; i--){
				buttons[i].removeAttribute('disabled','disabled');
				buttons[i].style.cursor = "pointer";
			}
			playerRound = true;
		}else{
			let btn = buttons[sequency.charAt(countTimes)];
			setTimeout(blink, 700, btn, fadeTime);
			countTimes++;
		}
	},difficultyTime);
}

function blink(element, fadeTime){
	if(element.classList.contains("yellow")){
		element.style.background = "rgba(255, 255, 0,1)";
		setTimeout(function(){element.style.background = "rgba(255, 255, 0, 0.5)"}, fadeTime);
	}else if(element.classList.contains("red")){
		element.style.background = "rgba(255, 0, 0, 1)";
		setTimeout(function(){element.style.background = "rgba(255, 0, 0, 0.5)"}, fadeTime);
	}else if(element.classList.contains("green")){
		element.style.background = "rgba(0, 255, 16,1)";
		setTimeout(function(){element.style.background = "rgba(0, 255, 16, 0.5)"}, fadeTime);
	}else if(element.classList.contains("blue")){
		element.style.background = "rgba(0, 0, 255,1)";
		setTimeout(function(){element.style.background = "rgba(0, 0, 255, 0.5)"}, fadeTime);
	}
}

function start(){
	geniusScreen();
	let modeInfo;

	if(this.value == 2){
		rounds = 16;
		difficultyTime = 800;
		modeInfo = "difícil";
	}else if(this.value == 1){
		rounds = 13;
		difficultyTime = 1000;
		modeInfo = "normal";
	}else{
		rounds = 10;
		difficultyTime = 1200;
		modeInfo = "fácil";
	}
	fadeTime = difficultyTime/2;

	for(var i = 0; i<rounds;i++)
		sequency += Math.floor(Math.random()*4);

	round = 1

	shineSequency();
	timing();
	document.getElementById('roundNumber').innerHTML = round;
	document.getElementById('modeInfoDifficulty').innerHTML = modeInfo;
}

function clean(){
	playerClickedSequency = "";
	playerRound = false;
	sequency = "";
	difficultyTime = 0;
	fadeTime = 0;
	round = 1;
	rounds = 0;
	clearTimeout(shineSequencyTimer);
	clearInterval(timer);
}

function timing(){
	let cent = 00;
	let seconds = 00;
	let minutes = 00;
	let strTimer = "00:00";
	timer = setInterval(function(){
		if (cent < 99) {
			cent++;
		}
		if (cent == 99) {
			cent = -1;
		}
		if (cent == 0) {
			seconds ++;
			if (seconds < 10 && minutes < 10)
				strTimer = "0"+minutes+":"+"0"+seconds
			else if(seconds < 10 && minutes >= 10)
				strTimer = minutes+":"+"0"+seconds
			else if(seconds >= 10 && minutes < 10)
				strTimer = "0"+minutes+":"+seconds
			else if(seconds >= 10 && minutes >= 10)
				strTimer = "0"+minutes+":"+seconds
		}
		if (seconds == 59) {
			seconds = -1;
		}
		if ( (cent == 0)&&(seconds == 0) ) {
			minutes++;
			if (seconds < 10 && minutes < 10)
				strTimer = "0"+minutes+":"+"0"+seconds
			else if(seconds < 10 && minutes >= 10)
				strTimer = minutes+":"+"0"+seconds
			else if(seconds >= 10 && minutes < 10)
				strTimer = "0"+minutes+":"+seconds
			else if(seconds >= 10 && minutes >= 10)
				strTimer = "0"+minutes+":"+seconds
		}
		document.getElementById("timerNumber").innerHTML = strTimer;
	},10)
	document.getElementById("timerNumber").innerHTML = strTimer;
}

function difficultyScreen(){
	clean();
	document.getElementById('content').style.display = "none";
	document.getElementById('youLose').style.display = "none";
	document.getElementById('youWon').style.display = "none";
	document.getElementById('load').style.display = "flex";
	document.getElementById('difficulty').style.display = "flex";
}
function youLoseScreen(){
	clean();
	document.getElementById('content').style.display = "none";
	document.getElementById('youLose').style.display = "flex";
	document.getElementById('youWon').style.display = "none";
	document.getElementById('load').style.display = "flex";
	document.getElementById('difficulty').style.display = "none";
}
function youWonScreen(){
	clean();
	document.getElementById('content').style.display = "none";
	document.getElementById('youLose').style.display = "none";
	document.getElementById('youWon').style.display = "flex";
	document.getElementById('load').style.display = "flex";
	document.getElementById('difficulty').style.display = "none";
}
function geniusScreen(){
	clean();
	document.getElementById('content').style.display = "grid";
	document.getElementById('youLose').style.display = "none";
	document.getElementById('youWon').style.display = "none";
	document.getElementById('load').style.display = "none";
	document.getElementById('difficulty').style.display = "none";
}

document.getElementById('navBack').addEventListener("click", difficultyScreen);
document.getElementById("backWin").addEventListener("click", difficultyScreen);
document.getElementById("youLoseBack").addEventListener("click", difficultyScreen);