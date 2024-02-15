import { defineStore } from 'pinia';
import { SHA256, AES, enc, mode, pad } from 'crypto-js'
// let key = await window.crypto.subtle.generateKey(
//   {
//     name: "AES-GCM",
//     length: 256,
//   },
//   true,
//   ["encrypt", "decrypt"],
// );
// const iv = window.crypto.getRandomValues(new Uint8Array(12));

// function getMessageEncoding(text) {
//   const enc = new TextEncoder();
//   return enc.encode(text);
// }

// function encryptMessage(key, text) {
//   const encoded = getMessageEncoding(text);
//   return window.crypto.subtle.encrypt(
//     { name: "AES-GCM", iv: iv },
//     key,
//     encoded,
//   );
// }

// function decryptMessage(key, ciphertext) {
//   return window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
// }

// let pwd = "password";

// function Encrypt(word) {
//     return AES.encrypt(word, pwd).toString();
// }

// function Decrypt(word) {
//     return AES.decrypt(word, pwd).toString(enc.Utf8);
// }

// TODO
// iv対応
const key = enc.Utf8.parse('0123456789abcede');
const iv = enc.Utf8.parse('1234567812345678');

function Encrypt(word) {
    const srcs = enc.Utf8.parse(word);
    const encrypted = AES.encrypt(srcs, key, { iv: iv, mode: mode.CBC, padding: pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}

function Decrypt(word) {
    const encryptedHexStr = enc.Hex.parse(word);
    const srcs = enc.Base64.stringify(encryptedHexStr);
    const decrypt = AES.decrypt(srcs, key, { iv: iv, mode: mode.CBC, padding: pad.Pkcs7 });
    const decryptedStr = decrypt.toString(enc.Utf8);
    return decryptedStr.toString();
}

export const useStoreUsers = defineStore('users', {
  state: () => ({
    users: [
      // { id: "0", password: "aaaaaaaa", email: "tanaka-taro@example.com", tel: "090-1234-5678", isDeleted: false},
      // { id: "1", password: "bbbbbbbb", email: "tanaka-jiro@example.com", tel: "090-1234-5679", isDeleted: true},
      // { id: "2", password: "cccccccc", email: "tanaka-saburo@example.com", tel: "090-1234-5670", isDeleted: false},
    ],

  }),
  //ここら辺怪しい
  actions: {
    getUserList() {
      let userList = [];
      for (const index in this.users) {
        let user = this.users[index];
        console.log(user)
        if (!user.isDeleted) {
          user.email = Decrypt(user.email);
          user.tel = Decrypt(user.tel);
          userList.push(user);
        }
      }
      console.log(userList)
      return userList;
    },
    useAddUser(user) {
      console.log(this.users)
      // hash化
      const password = SHA256(user.password);
      user.password = password.toString();

      // 暗号化
      user.email = Encrypt(user.email)
      user.tel = Encrypt(user.tel)

      this.users.push(user);
    },
    useDeleteUser(id) {
      for (const index in this.users) {
        if (this.users[index].id === id) {
          this.users[index].isDeleted = true;
          break;
        }
      }
    }
  }
});

// TODO
// checkpassword
// 初期値をいくつかいれる
