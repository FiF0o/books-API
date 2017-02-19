/**
 * Created by jonlazarini on 18/02/17.
 */
import React from 'react'

const Counter = ({ onSomething, listToDo }) => {
	console.log(`\n${onSomething}\n, ${listToDo}\n\n`)
	return (
		<div>
			<p>toto</p>
			<button onClick={() => {console.log('yo!')}}>button</button>
		</div>
	)
}

export default Counter
