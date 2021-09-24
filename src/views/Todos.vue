<template>
  <div>
    <ul class="collection with-header">
      <li class="collection-header">
        <div class="row">
          <div class="input-field col s10">
            <input
              id="new_todo"
              type="text"
              class="validate"
              v-model="todo.title"
            />
          </div>
          <div class="input-field col s2">
            <button class="btn" @click="addTodo">Add</button>
          </div>
        </div>
      </li>
    </ul>
    <li
      class="collection-item"
      v-for="todo in todos"
      :key="todo.id"
      :class="{ fade: todo.isCompleted }"
    >
      <span class="deleteIcon" @click="deleteToDo(todo.id)">✕</span>
      {{ todo.title }}
      <span class="secondary-content">
        <label>
          <input
            type="checkbox"
            class="filled-in"
            :checked="todo.isCompleted"
            @change="completedPressed(todo.id, $event)"
          />
          <span></span>
        </label>
      </span>
    </li>
  </div>
</template>

<style>
.collection.with-header {
  max-width: 500px;
  margin: 0 auto;
}
</style>

<script>
import firebase from "firebase";

export default {
  name: "Todo",
  data: function () {
    return {
      todos: [],
      todo: {
        title: "",
      },
    };
  },
  methods: {
    async getTodos() {
      var todosRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos");

      todosRef.onSnapshot((snap) => {
        this.todos = [];
        snap.forEach((doc) => {
          var todo = doc.data();
          todo.id = doc.id;
          this.todos.push(todo);
        });
      });
    },
    addTodo() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .add({
          title: this.todo.title,
          createdAt: new Date(),
          isCompleted: false,
        });
    },
    updateTodoItem(docId, e) {
      var isChecked = e.target.checked;
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .doc(docId)
        .update({
          isCompleted: isChecked,
        });
    },
    deleteToDo(docId) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("todos")
        .doc(docId)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },
  },
  created() {
    this.getTodos();
  },
};
</script>
