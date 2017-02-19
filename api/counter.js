/**
 * Created by jonlazarini on 18/02/17.
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

export function fetchCounter(callback) {
	setTimeout(() => {
		callback(getRandomInt(1, 100))
	}, 500)
}
