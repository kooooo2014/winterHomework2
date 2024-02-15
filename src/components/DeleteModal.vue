<template>
	<div v-if="isModalVisible">
		<div @click="onToggle" class="absolute bg-black opacity-70 inset-0 z-0"></div>
		<div class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
			<div>
				<div class="text-center p-3 flex-auto justify-center leading-6">
					<h2 class="text-2xl font-bold py-4">パスワードの確認</h2>
					<p class="text-md text-gray-500 px-8">
						パスワードを入力してください。
					</p>
				</div>
				<div class="p-3 mt-2 text-center space-x-4 md:block">
					<button
						class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100">
						Delete
					</button>
					<button @click="onToggle"
						class="mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600">
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isOpen: true
		};
	},

	computed: {
		isModalVisible() {
			return this.isOpen;
		}
	},

	methods: {
		onToggle() {
			this.isOpen = !this.isOpen;
		}
	}
};
</script>

<style>

</style>
