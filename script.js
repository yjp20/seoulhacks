window.addEventListener("load", () => {
	const cards = document.getElementsByClassName("card-expand")
	const title = document.getElementById("main-title")


	for (var i=0; i<cards.length; i++) {
		cards[i].addEventListener("click", function () {
			this.dataset.expanded = this.dataset.expanded == "true" ? false : true
		}.bind(cards[i]))
	}


	charming(title)

	anime({
		targets: 'path',
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: 1500,
		delay: function(el, i) { return i * 250 },
	});
})
