new Vue({
	el:"#app",
	data:{
		playerHealth:100,
		monsterHealth:100,
		gameIsRunning: false
	},
	methods:{
		startGame:function(){
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;	
		},
		attack:function(){
			this.monsterHealth -= this.calculateDamage(10,3);
			if(this.checkWin()){
				return;
			}

			this.monsterAttack();
		},
		specialAttack:function(){
			this.monsterHealth -= this.calculateDamage(20,10);
			if(this.checkWin()){
				return;
			}
			this.monsterAttack();
		},
		heal:function(){
			if(this.playerHealth <= 90){
				this.playerHealth += 10;
				console.log("new health : ", this.playerHealth)
			}else{
				this.playerHealth = 100;
			}
			this.monsterAttack();
		},
		giveup: function(){
			this.gameIsRunning = false;
		},
		monsterAttack:function(){
			this.playerHealth -= this.calculateDamage(12,5);
			this.checkWin();
		},
		
		calculateDamage: function(max,min){
			return  Math.max(Math.floor(Math.random() * max)+ 1, min);
		},
		checkWin:function(){
			if (this.monsterHealth <= 0){
				if(confirm('You won! New Game?')){
					this.startGame();
				}else{
					this.gameIsRunning = false;
				}
				return true;
			}else if (this.playerHealth <= 0){
				if(confirm('You lost! New Game?')){
					this.startGame();
				}else{
					this.gameIsRunning = false;
				}
				return true;

			}
			return false;
		}
	}


})