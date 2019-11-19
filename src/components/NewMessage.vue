<template>
    <form @submit.prevent.enter="submit" class="new-message">
        <span class="smile-icon"><i class="fas fa-smile"></i></span>
        <input class="input" type="text" placeholder="type a message" v-model="messageContent">
        <button class="btn btn-red" type="submit">Send</button>
        <div class="warning-message">
            <p v-if="feedback"  class="red-text">{{ feedback }}</p>
        </div>
    </form>
</template>

<script>
import moment from 'moment'
export default {
    props:['henchMan'], // the henchman name that user selects transferred from the Chat component to NewMessage component
    data() {
        return {
            messageContent: null, // message text
            feedback: null
        }
    },
    methods: {
        // sending the message to the state
        submit() {
            // check if user select a name from the list before sending the message
            if (!this.henchMan) {
                this.feedback = 'You must select a name to send message!';
                setTimeout(() => { this.feedback = null }, 3000);
            } else {
                // check to see if user's message is not empty
                if (this.messageContent) {
                    let newMessage = {
                        henchMan: this.henchMan,
                        content: this.messageContent,
                        timestamp: moment(Date.now()).format('lll')
                    };
                // dispatching the action getMessage along with the new input message
                this.$store.dispatch('getMessage', newMessage);
                // clearing the input field 
                this.messageContent = null;
                // removing the warning message if there is any
                this.feedback = null;
            } else {
                // displaying the warning message & removing it after 5 seconds
                this.feedback = 'You must enter a message to send one!';
                setTimeout(() => { this.feedback = null }, 3000);
            }
            }
        }
        
    }
}
</script>

<style>

</style>
