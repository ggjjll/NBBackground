var pageIndex = -1;
var pageLength = 4;

function getDom(id, bool) {
	return bool ? document.getElementsByClassName(id) : document.getElementById(id);
}

function main() {
	initData();
	initSetBtn();
	initListEvent();
	initBtns();
}

function initData() {
	if (localStorage.nbbgText !== undefined) {
		var $texts = getDom("texts");
		$texts.value = localStorage.nbbgText;
		updateText();
	}
	var $welcomeBtn = getDom("welcomeBtn");
	if (localStorage.nbbgWelcom !== undefined) {		
		$welcomeBtn.checked = localStorage.nbbgWelcom;	
	} else {
		$welcomeBtn.checked = true;
	}
	updateWelcome();
}

function initSetBtn() {
	var $setBtn = getDom("setBtn");
	$setBtn._isActive = false;
	$setBtn.onclick = function () {
		$setBtn._isActive = !$setBtn._isActive;
		getDom("setList").style.display = $setBtn._isActive ? "" : "none";	
		var $welcomeBtn = getDom("welcomeBtn");
		localStorage.nbbgWelcom = $welcomeBtn.checked;
		var $texts = getDom("texts");
		localStorage.nbbgText = $texts.value;
	}
}

function initListEvent() {
	var $welcomeBtn = getDom("welcomeBtn");
	$welcomeBtn.onchange = updateWelcome;
	var $texts = getDom("texts");
	$texts.oninput = updateText;
}

function updateWelcome() {
	var $welcomeBtn = getDom("welcomeBtn");
	getDom("welcome").style.display = $welcomeBtn.checked ? "" : "none";
//	localStorage.nbbgWelcom = $welcomeBtn.checked;
}

function updateText() {
	var $texts = getDom("texts");
	getDom("text").innerHTML = $texts.value.replace("\n", "<br/>");
//	localStorage.nbbgText = $texts.value;
}

function initBtns() {
	for (var i = 0; i < pageLength; i ++) {
		var $btn = getDom("btn" + i);
		$btn._id = i;
		$btn.onclick = function() {
			if (pageIndex === this._id) {
				return;
			}
			pageIndex = this._id;
			changePage();
		}
	}
	getDom("firstPage").onclick = replay;
}

function changePage() {
	if (pageIndex < 0) {
		return ;
	}
	var $pageC = getDom("pageC", true)[0];
	if ($pageC) {
		$pageC.classList.remove("pageC");
		$pageC.classList.add("pageL");
		playVideo($pageC, false);
	}
	var $page = getDom("page" + pageIndex);
	$page.classList.remove("pageR");
	$page.classList.remove("pageL");
	$page.classList.add("pageC");
	playVideo($page, true);
	
	
	getDom("firstPage").classList.remove("show");
	getDom("firstPage").classList.add("hidden");
	
//	for (var i = 0; i < pageLength; i ++) {
//		var $page = getDom("page" + i);
//		if (i === pageIndex) {
//			$page.classList.remove("pageR");
//			$page.classList.remove("pageL");
//			$page.classList.add("pageC");
//		} else if ($page !== $pageC){
////			$page.classList.remove("pageR");
//			$page.classList.remove("pageL");
//			$page.classList.add("pageR");
//		}
//	}
}

function playVideo($page, bool) {
	if ($page.className.indexOf("videoBox") !== -1) {
		var video = $page.children[0];
		if (bool) {
			video.currentTime = 0;
			video.play();
		} else {
			video.pause();
		}
	}
}

function replay() {
	getDom("firstPage").classList.remove("hidden");
	getDom("firstPage").classList.add("show");
	var $page = getDom("page" + pageIndex);
	if ($page) {
		$page.classList.remove("pageC");
		$page.classList.add("pageR");
		pageIndex = -1;
		playVideo($page, false);
	}
}

window.onload = function() {
	main();
}

