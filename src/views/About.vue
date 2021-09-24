<template>
  <div class="about">
    <h1>This is a firestore read db</h1>
    <h1>Firestore Test</h1>
    <li v-for="(item, index) in data" :key="index">
      {{ item }}
    </li>
  </div>
</template>

<script>
import db from "../firebase.js"
export default {
 data() {
   return {
     data: [],
   }
 },
 mounted: function () {
   db.collection("test")
     .get()
     .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
         console.log(`${doc.id} => ${doc.data().name}`)
         this.data.push(doc.data().name)
       })
     })
 },
}
</script>