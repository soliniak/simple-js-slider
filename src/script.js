// *** VARIABLES *** //
const autoBox	= document.querySelector("input[name=autoplay]"),
	autoDir 	= "left", // left or right
	btnLeft 	= document.querySelector(".button-left"),
	btnRight 	= document.querySelector(".button-right"),
	loader		= document.createElement("div"),
	counter 	= document.querySelector(".slide_counter"),
	slider 		= document.querySelector(".slides"),
	slides 		= document.querySelectorAll(".slides img"),
	speed 		= 2000; // = 2s

let 	count 	= 1
	autoplay	= null;

// *** Create loader *** //
loader.classList.add("loader");
slider.appendChild(loader);
// *** Hide loader when everything is loaded *** //
document.onreadystatechange = function () {
	if (document.readyState === "complete"){
		loader.style.display = "none";
	}
}

// *** Initialize counter *** //
counter.innerText = count + " of " + (slides.length);

// *** Start slideshow if hardcoded -checked- *** //
if(autoBox.checked){
	autoplay = setInterval(slide.bind(this, "auto"), speed);
}

// *** Listen buttons for call *** //
btnLeft.addEventListener('click', () => slide("left"));
btnRight.addEventListener('click', () => slide("right"));

autoBox.addEventListener('change', () => {
	// *** If autoplay is checked then autoplay slides, if not then stop *** //
	if(autoBox.checked){
		autoplay = setInterval(() => slide("auto"), speed);
	} else {
		stopInterval();
	}
});

// *** Change slide *** //
function slide(direction){
	// *** If left or right button were clicked, stop autoplay *** //
	if(direction === "right" || direction === "left"){
		stopInterval();
	}
	// *** If direction is 'auto' then slide to 'autoDir' - variable at the top, otherwise swipe in choosen direction *** //
	direction = (direction == "auto" ? autoDir : direction)
	// *** Clear all previously added classes from every photo. Could be prettier, but it's good for now *** //
	slides.forEach(function(photo){
		photo.classList.remove("outleft");	
		photo.classList.remove("outright");	
	});
	slides[count-1].classList.remove("inleft");
	slides[count-1].classList.remove("inright");
	// *** Add class from sliding out photo *** //
	slides[count-1].classList.add("out"+direction);
	
	// *** Update counter - if clicked right button count -1, else count +1 *** //
	count = (direction == "right" ? count-1 : count+1);
	// *** Looping slides *** //
	if (count > slides.length) { count = 1; } // *** if reached end go to first slide *** //
	if (count < 1) { count = 4; } // *** if reached first go to last one *** //
	
	// *** Add class for sliding in photo *** //
	slides[count-1].classList.add("in"+direction);
	// *** Display updated counter *** //
	counter.innerText = count + " of " + slides.length;
}

// *** Stop slideshow *** //
function stopInterval(){
	clearInterval(autoplay);
	autoplay = null;	
	autoBox.checked = false;
};
// *** The End *** //