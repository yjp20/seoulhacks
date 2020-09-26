/* from anime.js */
function getAttribute(el, prop) {
  return el.getAttribute(prop);
}

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, 'r');
}

function getRectLength(el) {
  return (getAttribute(el, 'width') * 2) + (getAttribute(el, 'height') * 2);
}

function getLineLength(el) {
  return getDistance(
    {x: getAttribute(el, 'x1'), y: getAttribute(el, 'y1')}, 
    {x: getAttribute(el, 'x2'), y: getAttribute(el, 'y2')}
  );
}

function getPolylineLength(el) {
  const points = el.points;
  let totalLength = 0;
  let previousPos;
  for (let i = 0 ; i < points.numberOfItems; i++) {
    const currentPos = points.getItem(i);
    if (i > 0) totalLength += getDistance(previousPos, currentPos);
    previousPos = currentPos;
  }
  return totalLength;
}

function getPolygonLength(el) {
  const points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}

// Path animation

function getTotalLength(el) {
  if (el.getTotalLength) return el.getTotalLength();
  switch(el.tagName.toLowerCase()) {
    case 'circle': return getCircleLength(el);
    case 'rect': return getRectLength(el);
    case 'line': return getLineLength(el);
    case 'polyline': return getPolylineLength(el);
    case 'polygon': return getPolygonLength(el);
  }
}

/* end */

function reverseOffset(el) {
	const pathLength = getTotalLength(el)
  el.setAttribute('stroke-dasharray', pathLength)
	return -pathLength
}

window.addEventListener("load", () => {

	/* animate on scroll */

	AOS.init({
		once: true,
	})

	/* svg animation */

	var paths = [...document.querySelectorAll('path')]
	var lines = document.querySelectorAll('line')
	var polys = document.querySelectorAll('polyline')
	var circles = [...document.querySelectorAll('circle')].concat(paths.filter(e => e.getBoundingClientRect().width <= 20 && e.getBoundingClientRect().height <= 20))
	var not_circles = paths.filter(e => e.getBoundingClientRect().width > 20 || e.getBoundingClientRect().height > 20)

	var combo = [...not_circles, ...lines, ...polys]
	var combo_a = []
	var combo_b = []
	var ring1 = document.getElementById('Layer_1')
	var ring1_paths = [...ring1.querySelectorAll('path')]

	combo.forEach(e => (ring1_paths.includes(e) || Math.random() < 0.7 ? combo_a : combo_b).push(e))

	anime({
		targets: combo_a,
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: 1500,
		direction: 'normal',
		delay: function(el, i) { return i * 5 },
	});
	anime({
		targets: combo_b,
		strokeDashoffset: [reverseOffset, 0],
		easing: 'easeInOutSine',
		duration: 1500,
		direction: 'normal',
		delay: function(el, i) { return i * 5 },
	});
	anime({
		targets: combo,
		opacity: 1,
		easing: 'easeInOutSine',
		duration: 700,
		delay: function(el, i) { return i * 5 },
	});
	anime({
		targets: circles,
		opacity: 1,
		easing: 'easeInOutSine',
		duration: 1500,
		delay: function(el, i) { return i * 5 },
	});
})
