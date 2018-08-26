<template>
  <div id="app">
    <p>
   	    <current v-bind:currentCurrency="Cryptos"></current>
	</p>
  </div>
</template>

<script>
import socketIOClient from "socket.io-client";
import Current from './Current.vue';;

export default {
  name: 'App',
  components: {Current},
  data() {
    return {
      Cryptos: {BTC: '', ETH: '', LTC: ''},
    }
  },
  created () {
    // After component created, contact the socket.io
    const endPoint = "http://127.0.0.1:4001";
    const socket = socketIOClient(endPoint);
    
	//ES6 style of writing 
    socket.on("FromAPI", data => this.Cryptos = {BTC: data.BTC.USD, ETH: data.ETH.USD, LTC: data.LTC.USD});
    
	/*
	//Old style
    socket.on("FromAPI", function(data) {
	    //console.log(data.BTC.USD);
		this.Cryptos = {BTC: data.BTC.USD, ETH: data.ETH.USD, LTC: data.LTC.USD}
    }.bind(this));
	*/
	
  }  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
