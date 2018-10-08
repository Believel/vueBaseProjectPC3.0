<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="count"/>
	<hr/>
	<ul class="tablelist">
		<li v-for="(item, index) in list" :key="index" class="tableitem">
			<p>{{item.userName}} —— {{item.Address}}</p>
		</li>
	</ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapActions, mapState} from 'vuex';
import {get_tablelist} from '@/api.js';

export default {
	name: 'home',
	data() {
		return {
			list: []
		}
	},
	computed: {
		// 在这里映射store.state.count,使用方法和computed里的其他属性一样
		...mapState([
			'count'
		])
	},
	created() {
		this.incrementStep();
		this.getTablelist();
	},
	methods: {
		async getTablelist() {
			try {
				let res = await get_tablelist();
				if (res.data.code === 0) {
					this.list = res.data.result.list;
				}
			} catch (error) {
				console.log(error)
			}
		},
		...mapActions([
			'incrementStep'
		])
	},
	components: {
		HelloWorld
	}
}
</script>
