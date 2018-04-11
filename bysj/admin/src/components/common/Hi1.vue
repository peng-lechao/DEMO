<template>
	<div>
		i am Hi1
	</div>
</template>

<script>
import store from '@/store'
	export default {
		name:'Hi1',
		data() {
return{
				
			}
		},
		mouted(){
			store.commit('setIsActive','Hi')
		}
	}
</script>