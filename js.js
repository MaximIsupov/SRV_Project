speed_container = document.getElementById("speed");
console.log(speed_container.innerHTML);
rasstoyanie_container = document.getElementById("picture_rasst");
console.log(rasstoyanie_container.innerHTML);
rasstoyanie_prev_container = document.getElementById("rasst_1");
rasstoyanie_curr_container = document.getElementById("rasst_2");
sblizhenie_container = document.getElementById("sblizh");
state_container = document.getElementById("state");
uskor_container = document.getElementById("uskor");
speed = 0;
prev_rasstoyanie = 300;
current_rasstoyanie = 300;
sblizh = 0;
uskor = 0.04;
states ={
	"normal": "Нормальное состояние",
	"warning": "Предупреждение",
	"warning_break": "Служебное торможение",
	"extra_break": "Аварийное торомжение",
}
state = states.normal;
start_button = document.getElementById("start_button");
start_button.onclick = start;
breaks_button = document.getElementById("breaks_button");
breaks_button.onclick = avar_breaks;
stop_button = document.getElementById("stop_button");
stop_button.onclick = stop;
default_button = document.getElementById("default_button");
default_button.onclick = set_to_default();
let timerId;


function stop(){
	clearInterval(timerId);
	print_data();
}

function avar_breaks(){
	clearInterval(timerId);
	timerId = setInterval(()=>{
		uskor -= 0.0007;
		speed += uskor;
		check_terms();
		print_data();
		if (speed <= 0) stop();
	},100);
}

function extra_breaks(){
	clearInterval(timerId);
	timerId = setInterval(()=>{
		uskor -= 0.02;
		speed += uskor;
		check_terms();
		print_data();
		if (speed <= 0) stop();
	},100);
}

function start(){
  timerId = setInterval(timer, 100);
}

function timer(){
 {
  	speed += uskor;
  	check_terms();
  	print_data();
  }
}

function check_terms(){
	if (sblizh < 1.5) {state = states.normal;return 0;} 
	else if (sblizh < 2.5) { state = states.warning; }
	else if (sblizh < 3.5) { state = states.warning_break; avar_breaks();}
	else{ state = states.extra_break; state_container.classList.add("anim"); extra_breaks();}
}

function print_data(){
	speed_container.innerHTML = parseFloat(speed).toFixed(2);
  	prev_rasstoyanie = parseFloat(current_rasstoyanie).toFixed(2);
  	rasstoyanie_prev_container.innerHTML = parseFloat(prev_rasstoyanie).toFixed(2);
  	current_rasstoyanie -= speed;
  	rasstoyanie_curr_container.innerHTML = parseFloat(current_rasstoyanie).toFixed(2);
  	sblizh = parseFloat(prev_rasstoyanie - current_rasstoyanie).toFixed(2);
  	sblizhenie_container.innerHTML = parseFloat(sblizh).toFixed(2);
  	uskor_container.innerHTML = parseFloat(uskor).toFixed(2);
  	rasstoyanie_container.innerHTML = parseFloat(current_rasstoyanie).toFixed();
  	state_container.innerHTML = state;
}

function set_to_default(){
	speed = 0;
	prev_rasstoyanie = 300;
	current_rasstoyanie = 300;
	sblizh = 0;
	uskor = 0.06;
	print_data();
}
