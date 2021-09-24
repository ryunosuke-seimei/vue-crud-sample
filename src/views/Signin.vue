<template>
  <div class="signin">
    <h2>Sign in</h2>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="signIn">Signin</button>
    <button @click="signInGoogle">Google Signin</button>
    <p>
      You don't have an account?
      <router-link to="/signup">create account now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Signin",
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    signIn: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(
          (user) => {
            console.log(user);
            alert("Success!");
            this.$router.push("/");
          },
          (err) => {
            alert(err.message);
          }
        );
    },
    signInGoogle: function () {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          console.log(token); // Token
          console.log(user); // User that was authenticated
          alert("Success!");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err); // This will give you all the information needed to further debug any errors
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signin {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>