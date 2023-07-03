function randomNumber(min,max){
    return Math.floor(Math.random()*(max - min)) + min;
}
const app = Vue.createApp({
    data() {
        return {
            phealth:100,
            mhealth:100,
            playing:true,
            surrrendered:false,
            currentRound:1,
            logMessages:[]
        }
    },

    methods: {
        attackPlayer(){
            const playerDamage = randomNumber(10,16);
            if(this.phealth - playerDamage < 0){
                this.phealth = 0
            }
            else{
                this.phealth -= playerDamage;
            }
            this.addLogMessage('Monster','attack',playerDamage);
            
        },
        
        attack(){
            const monsterDamage = randomNumber(7,13);
            if(this.mhealth - monsterDamage < 0){
                this.mhealth = 0;
            }
            else{
                this.mhealth -= monsterDamage;
            }
            this.addLogMessage('Player','attack',monsterDamage);
            this.attackPlayer();
            this.currentRound += 1;
        },

        specialAttack(){
            const monsterDamage = randomNumber(15,21);
            if(this.mhealth - monsterDamage < 0){
                this.mhealth = 0;
            }
            else{
                this.mhealth -= monsterDamage
            }
            this.addLogMessage('Player','attack',monsterDamage)
            this.attackPlayer();
            this.currentRound += 1;
        },

        heal(){
            const healValue = randomNumber(16,20);
            if (this.phealth + healValue > 100){
                this.phealth = 100
            }
            else{
                this.phealth += healValue;
            }
            this.addLogMessage('Player', 'heal',healValue)
            this.attackPlayer()
            this.currentRound += 1;
        },

        surrender(){
            this.surrrendered = !this.surrendered
            this.playing = false
        },

        playAgain(){
            this.phealth = 100;
            this.mhealth = 100;
            this.playing = true;
            this.surrrendered = false;
            this.currentRound = 1;
            this.logMessages = [];
        },

        addLogMessage(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            })
        }
    },

    computed: {
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        },

       
    },

    watch: {
        phealth(value){
            if (value <= 0){
                this.playing = false
            }
        },

        mhealth(value){
            if (value <= 0){
                this.playing = false
            }
        }
    },
});
app.mount('#game')