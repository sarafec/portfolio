
(function() {
	// variables for modal window
	let modal = document.querySelector(".modal");
	let modalOverlay = document.querySelector(".modal-overlay");
	let closeButton = document.querySelector(".close-button");
	let bottomButton = document.querySelector(".bottom-btn");
	let openList = document.querySelector(".side-project-annotated");
	
	// variables for project viewer
	let chevronRight = document.querySelector(".chevron-right");
	let chevronLeft = document.querySelector(".chevron-left");
	let photoViewerContainer = document.querySelector(".main-project-viewer");
	let totalCount = document.querySelector(".main-project-icons").children.length;
	let currentCount = 1;

	// modal window events
	closeButton.addEventListener("click", toggleModal);
	bottomButton.addEventListener("click", toggleModal);

	openList.addEventListener("click", function(evt) {
		toggleModal();
		window.setTimeout(function () {
			document.getElementById('first-annotated-item').focus();
		}, 0);
	});

	openList.addEventListener("keydown", function(evt){
		if(evt.which === 13){
			toggleModal();
			window.setTimeout(function () {
				document.getElementById('first-annotated-item').focus();
			}, 0);
		}
	});

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

	// toggle modal window
	function toggleModal() {
		modal.classList.toggle("closed");
		modalOverlay.classList.toggle("closed");
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

//fix modal window focus issue