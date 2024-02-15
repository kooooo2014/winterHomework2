<template>
	<div class="bg-white p-8 rounded-md w-full">
		<div class="flex justify-end">
			<router-link to="/form">
				<button class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
					+ Add
				</button>
			</router-link>
		</div>
		<div>
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table class="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									ユーザ名
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									メールアドレス
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									電話番号
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="user in userList" v-bind:key="user.id">
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p class="text-gray-900 whitespace-no-wrap">{{ user.id }}</p>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p class="text-gray-900 whitespace-no-wrap">{{ user.email }}</p>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p class="text-gray-900 whitespace-no-wrap">{{ user.tel }}</p>
								</td>
								<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<button
										class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
										@click="modalOpen(user.id)">
										- Delete
									</button>
								</td>
							</tr>
							<div v-if="isModalVisible">
								<div @click="onToggle" class="absolute bg-black opacity-70 inset-0 z-0"></div>
								<div
									class="w-full max-w-lg p-3 absolute mx-auto my-auto rounded-xl shadow-lg bg-white inset-28">
									<div>
										<div class="text-center p-3 flex-auto justify-center leading-6">
											<h2 class="text-2xl font-bold py-4">パスワードの確認</h2>
											<p class="text-md text-gray-500 px-8">
												パスワードを入力してください。
											</p>
											<div class="-mx-3 md:flex mb-6">
												<div class="md:w-full px-3">
													<label
														class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
														for="grid-password">
														パスワード
													</label>
													<input
														class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
														id="grid-password" v-model="password" type="password"
														placeholder="******************">
												</div>
											</div>
											<div class="p-3 mt-2 text-center space-x-4 md:block">
												<button @click="deleteUser()"
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
							</div>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useStoreUsers } from '../stores/users.js';

const { useDeleteUser, getUserList } = useStoreUsers();
const password = ref('');
const deletedUserId = ref('');
const userList = ref(getUserList());
const isModalVisible = ref(false);


function deleteUser() {
	for (const index in userList.value) {
		if (userList.value[index].id === deletedUserId.value) {
			useDeleteUser(deletedUserId.value);
			onToggle();
			deletedUserId.value = '';
			userList.value = getUserList();
			break;
		}
	}
}

function modalOpen(id) {
	deletedUserId.value = id
	onToggle();
}

function onToggle() {
	isModalVisible.value = !isModalVisible.value;
}
</script>

