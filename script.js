window.addEventListener("load", () => {
	const cards = document.getElementsByClassName("card-expand")
	const title = document.getElementById("main-title")

	for (var i=0; i<cards.length; i++) {
		cards[i].addEventListener("click", function () {
			this.dataset.expanded = this.dataset.expanded == "true" ? false : true
		}.bind(cards[i]))
	}


	charming(title)

	var paths = [...document.querySelectorAll('path')]
	var lines = document.querySelectorAll('line')
	var polys = document.querySelectorAll('polyline')

	var other_paths = paths.filter(e => e.getBoundingClientRect().width > 10 || e.getBoundingClientRect().height > 10)
	var outside_paths = [...other_paths.filter(e => !e.classList.contains("cls-20"))].map(e => e.parentElement)
	var circle_paths = [...paths.filter(e => e.getBoundingClientRect().width <= 10 && e.getBoundingClientRect().height <= 10), ...document.querySelectorAll("circle")]

	var all = [...other_paths, ...lines, ...polys]

	anime({
		targets: all,
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: 1500,
		delay: function(el, i) { return i * 15 },
	});
	anime({
		targets: outside_paths,
		rotate: 360,
		easing: 'linear',
		duration: 15000,
		loop: true,
	});
	anime({
		targets: [...all, ...circle_paths],
		strokeDashoffset: [anime.setDashoffset, 0],
		opacity: 1,
		easing: 'easeInOutSine',
		duration: 1500,
		delay: function(el, i) { return i * 5 },
	});
})
