const canva = document.getElementById('canvas');
var context = canva.getContext('2d');

const aceptedMoves = {
	'ArrowUp': (player) =>{
		player.y--
	},
	'ArrowDown': (player) => {
		player.y++
	},
	'ArrowLeft': (player) => {
		player.x--
	},
	'ArrowRight': (player) =>{
		player.x++
	}
}

const game = {
	init: function(){
		addEventListener('keyup', (event) => {keyboardListener(event.key)})
		game.renderScreen()
		game.fruitInterval = setInterval(game.addFruit, 10000)
	},
	players:{
		'player1': {x:1, y:1}
	},
	fruits: [],
	renderScreen: function(){
		context.fillStyle = 'rgb(30,30,30)'
		context.fillRect(0,0,screen.width, screen.height)
		for(playerId in game.players){
			const player = game.players[playerId]
			context.fillStyle = 'blue'
			context.fillRect(player.x, player.y, 1, 1)
		}
		
		for(fruitId in game.fruits){
			const fruit = game.fruits[fruitId]
			context.fillStyle = 'green'
			context.fillRect(fruit.x, fruit.y, 1, 1)
		}
		game.rAF = requestAnimationFrame(game.renderScreen)
	},
	addFruit: function(){
		game.fruits[game.fruits.length] = {x:random(20), y:random(20)}
	},
	checkColision: function(player){
		const fruits = game.fruits
		for(fruitId in fruits){
			const fruit = fruits[fruitId]
			if(player.x == fruit.x && player.y == fruit.y){
				delete game.fruits[fruitId]
				console.log("fruit "+fruitId+" deleted")
			}
		}
	},
	end: function(){
		cancelAnimationFrame(game.rAF)
		clearInterval(game.fruitInterval)
	}
}

function keyboardListener(key){
	console.log(key)
	movePlayer(key)
}

function random(x){
	return Math.trunc(Math.random()*x)
}

function movePlayer(move){
	const player = game.players['player1']
	const moveRules = {
		'ArrowUp': player.y>0,
		'ArrowDown': player.y<19,
		'ArrowLeft': player.x>0,
		'ArrowRight': player.x<19,
	}

	if(moveRules[move] == true && aceptedMoves[move] != undefined){
		console.log("Moving with "+move)
		aceptedMoves[move](player)
		game.checkColision(player)
	}
}
