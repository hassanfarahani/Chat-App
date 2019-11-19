<template>
  <div class="welcome">
        <h1>Welcome</h1>
        <form @submit.prevent.enter="enterChat" class="welcome-form">
          <label class="welcome-label" for="name">Enter your name:</label>
          <input class="welcome-input" type="text" name="name" v-model="name">
          <div class="warning-message">
            <p v-if="feedback"  class="red-text">{{ feedback }}</p>
          </div>
          <button type="submit" class="btn">Enter Chat</button>
        </form>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      name: null, // the name that user enters
      feedback: null
    }
  },
  methods: {
    // entering the chat room
    enterChat() {
      // check to see if the user enter a name
      if (this.name) {
        // redirecting the user to the Chat component along with user input name
        this.$router.push({ name: 'Chat', params: {name: this.name}});
      } else {
        // displaying the warning message in case user do not enter a name
        this.feedback = 'You must enter a name to enter the chat';
        setTimeout(() => { this.feedback = null }, 3000);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
