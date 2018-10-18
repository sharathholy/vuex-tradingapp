<template>
  <div id="app" v-cloak>
  
  	<b-container>
		<b-row>
			<Stocks />
			<Holdings />
		</b-row>
		
		<!-- todo, add some vertical space -->
		<div style="height:20px"></div> <!-- this feels lame -->
		<Tradings />	
         
	</b-container>
		
    
  </div>
</template>

<script>
import store from '../store/store';
import Stocks from './Stocks';
import Holdings from './Holdings';
import Tradings from './Tradings';

//speed of how often stocks update
const STOCK_UPD = 20;

export default {
  name: 'App',
  components: {
	   Stocks,
	   Holdings,
	   Tradings,
	}, 
	mounted:function() {
		setInterval(() => {
			console.log('running stock update');
			store.commit('changeStocks');
		}, STOCK_UPD*1000);	
	},	
}
</script>

<style scoped>
#app {
	padding-top: 20px;
}

[v-cloak] { 
	display: none; 
}

.customBtn {
	width: 120px;
}
		
</style>