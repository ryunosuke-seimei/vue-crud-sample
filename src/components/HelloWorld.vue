<template>
  <div class="hello">
    <h1>Hello {{ name }}!!</h1>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <button @click="signOut">Sign out</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: firebase.auth().currentUser.email
    }
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>
