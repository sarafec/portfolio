
(function() {
	
	// variables for project viewer
	let chevronRight = document.querySelector(".chevron-right");
	let chevronLeft = document.querySelector(".chevron-left");
	let photoViewerContainer = document.querySelector(".main-project-viewer");
	let totalCount = document.querySelector(".main-project-icons").children.length;
	let currentCount = 1;


	// project viewer events
	chevronRight.addEventListener("click", movePhotosRight);
	chevronRight.addEventListener("keydown", function(evt){
		if(evt.which === 13){
			movePhotosRight();
		}
	});

	chevronLeft.addEventListener("click", movePhotosLeft);
	chevronLeft.addEventListener("keydown", function(evt){
		if(evt.which === 13){
			movePhotosLeft();
		}
	});

	// project viewer events - swipe
	photoViewerContainer.addEventListener("touchstart", handleTouch);
	photoViewerContainer.addEventListener("touchend", handleTouch);
	photoViewerContainer.addEventListener("touchcancel", handleTouch);

	// swipe functionality
	let touch1 = {x: 0, y: 0, time: 0 };
	function handleTouch(evt){
		let touch = evt.touches[0] || evt.changedTouches[0];
		if (evt.type === 'touchstart'){
			touch1.x = touch.pageX;
			touch1.y = touch.pageY;
			touch1.time = evt.timeStamp;
		} else if (evt.type === 'touchend'){
			let dx = touch.pageX - touch1.x;
			let dy = touch.pageY - touch1.y;
			let dt = evt.timeStamp - touch1.time;
		
		if (dt < 500){
			if (Math.abs(dx) > 60){
				if (dx > 0){
					movePhotosLeft();
				} else {
					movePhotosRight();
				}
			}
		}
		}
	}

	// project viewer - move left
	function movePhotosLeft() {
		if (currentCount > 1) {
			photoViewerContainer.style.transform += "translateX(370px)";
			currentCount--;
		}
	}

	// project viewer - move right
	function movePhotosRight() {
		if(currentCount < totalCount){
			photoViewerContainer.style.transform += "translateX(-370px)";
			currentCount++;
		}
	}
})();

//todos
// 1 - create photo viewer 
// 	a. how does slick carousel work?
// 	b. how to netflix and xfinity icon carousels work?
// 	c. how to create batches of photos that translate to types of projects 
// 	   while maintaining a continuous photo stream 