<template>    
	<b-card title="Purchase and Sell Stocks">	
	
		<p class="card-text">
			Buy <b-form-input v-model.number="buy" type="number" style="width:100px;display:inline"></b-form-input> shares of 
			<b-form-select style="width:120px;display:inline" v-model="buyStock">
				<option v-for="stock in stocks" :key="stock.name">{{ stock.name }}</option>
			</b-form-select>
			<b-button :variant="'success'" @click="buyStocks" class="customBtn">Purchase</b-button>
			<span v-if="buyError">Not enough cash.</span>
		</p>
		<p class="card-text">
			Sell <b-form-input v-model.number="sell" type="number" style="width:100px;display:inline"></b-form-input> shares of 
			<b-form-select style="width:120px;display:inline" v-model="sellStock">
				<option v-for="stock in stocks" :key="stock.name">{{ stock.name }}</option>
			</b-form-select>
			<b-button :variant="'success'" @click="sellStocks" class="customBtn">Sell</b-button>
			<span v-if="sellError">Not enough on hand.</span>
		</p>

		<p class="card-text">
			You currently have <b>{{ cash | money }}</b> in cash.
		</p>

	</b-card>
			
</template>	

<script>
import store from '../store/store';

export default {
    name: 'Tradings',
	data() {
		return {
			buy:0,
			buyStock:null,
			buyError:false,
			sell:0,
			sellStock:null,
			sellError:false
		}
	},
	filters:{
		money(value) {
			let numb = Number(value).toFixed(2);
			return '$'+numb;
		}
	},	
	computed:{
		stocks() {
			return store.state.stocks;
		},
		holdingValue() {
			return store.getters.holdingValue;
		},
		cash() {
			return store.state.cash;
		}
	},
	methods:{
		buyStocks() {
			if(this.buy < 0) this.buy = 0;
			if(this.buy === 0) return;
			console.log('going to buy '+this.buy +' of '+this.buyStock);
			store.commit('buyStock', { amount:this.buy, stock:this.buyStock });
			this.buy = 0;
			this.buyStock = null;
		},
		sellStocks() {
			if(this.sell < 0) this.sell = 0;
			if(this.sell === 0) return;
			console.log('going to sell '+this.sell +' of '+this.sellStock);
			store.commit('sellStock', { amount:this.sell, stock:this.sellStock });
			this.sell = 0;
			this.sellStock = null;
		}
	}
}
</script>