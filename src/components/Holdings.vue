<template>    
	<b-col>
		<b-card title="Holdings">
			<b-list-group>
				<b-list-group-item variant="success" v-for="stock in stocks" :key="stock.name">
					<b-container>
						<b-row>
							<b-col sm="3">{{ stock.name }}</b-col>
							<b-col sm="3" class="text-center">{{ stock.held}}</b-col>
						</b-row>
					</b-container>
				</b-list-group-item>
			</b-list-group>
			<p class="card-text">
				Total value of holdings: <b>{{ holdingValue | money }}</b>
			</p>
		</b-card>
	</b-col>
</template>	

<script>
import store from '../store/store';

export default {
    name: 'Holdings',
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
	}
}
</script>