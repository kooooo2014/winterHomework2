<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="id">
          id
        </label>
        <input
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
          id="id" v-model="id" type="text" placeholder="名前">
      </div>
    </div>
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="email">
          メールアドレス
        </label>
        <input
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
          id="email" v-model="email" type="text" placeholder="xxxx@example.com">
      </div>
    </div>
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="tel">
          電話番号
        </label>
        <input
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
          id="tel" v-model="tel" type="text" placeholder="01234567890">
      </div>
    </div>
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
          パスワード
        </label>
        <input
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
          id="grid-password" v-model="password" type="password" placeholder="******************">
      </div>
    </div>
    <p v-if="isError" class="text-red-500">既に登録されたIDです。</p>
    <button class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
      @click="addUser">
      登録
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStoreUsers } from '../stores/users.js';
import router from '@/router';

const { users } = storeToRefs(useStoreUsers());
const { useAddUser } = useStoreUsers();

const id = ref('');
const password = ref('');
const email = ref('');
const tel = ref('');
const isError = ref(false);

function addUser() {
  isError.value = false;
  for (const index in users.value) {
    if (users.value[index].id === id.value) {
      isError.value = true;
      break;
    }
  }

  if (isError.value === false) {
    const user = {
      id: id.value,
      password: password.value,
      email: email.value,
      tel: tel.value,
      isDeleted: false
    }
    useAddUser(user);
    router.push('/');
  }
}
</script>
