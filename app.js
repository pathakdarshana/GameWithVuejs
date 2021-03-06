new Vue({
	el:"#app",
	data:{
		playerHealth:100,
		monsterHealth:100,
		gameIsRunning: false,
		turns:[]
	},
	methods:{
		startGame:function(){
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;	
			this.turns = [];
		},
		attack:function(){
			var damage = this.calculateDamage(10,3);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer:true,
				text: "Player hits Monster for " + damage
			});
			if(this.checkWin()){
				return;
			}

			this.monsterAttack();
		},
		specialAttack:function(){
			var damage = this.calculateDamage(20,10);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer:true,
				text: "Player hits Monster with special attack for " + damage
			});
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
			this.turns.unshift({
				isPlayer:true,
				text: "Player heals by 10"
			});
			this.monsterAttack();
		},
		giveup: function(){
			this.gameIsRunning = false;
		},
		monsterAttack:function(){
			var damage = this.calculateDamage(12,5);
			this.playerHealth -= damage;
			this.turns.unshift({
				isPlayer:false,
				text: "Monster hits Player for " + damage
			});
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