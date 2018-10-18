<template>    
	<b-col>
		<b-card title="Stocks">
			<b-list-group>
				<b-list-group-item variant="info" v-for="stock in stocks" :key="stock.name">
					<b-container>
						<b-row>
							<b-col sm="3">{{ stock.name }}</b-col>
							<b-col sm="3" class="text-center">{{ stock.price | money}}</b-col>
						</b-row>
					</b-container>
				</b-list-group-item>
			</b-list-group>
		</b-card>
	</b-col>
</template>	

<script>
import store from '../store/store';

export default {
    name: 'Stocks',
	filters:{
		money(value) {
			let numb = Number(value).toFixed(2);
			return '$'+numb;
		}
	},	
	computed:{
		stocks() {
			return store.state.stocks;
		}
	}
}
</script>