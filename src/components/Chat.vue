<template>
    <div class="buttons-messages">
        <div class="body">
            <div class="body-buttons">
                <div class="header-text header-welcome">Welcome {{ name | toUppercase }}</div>
                <form>
                    <input class="add-input" type="text" placeholder="Add a name ..." v-model="henchManName">
                    <button @click.prevent.enter="addName" class="add-btn">Add</button>                    
                </form>
                <button v-if="henchMenNames[0]" @click="removeAllNames" class="delete-btn">Delete All</button>
                <div style="overflow:scroll; height: 21rem;">
                    <li v-for="(name, index) in henchMenNames" :key="index" class="btn-list" @click="selectHenchman(name)" :class="{'btnclick': name === henchMan ? true : false}">
                        <div class="btn-list-name">
                            <a>{{ name }}</a> 
                        </div>
                        <div class="btn-list-close-icon">
                            <span><i @click="removeName(name)" class="fas fa-times-circle"></i></span>
                        </div>
                    </li>
                </div>
            </div>
            <div class="body-messages" v-chat-scroll>
                <ul class="messages">
                    <li v-for="(message, index) in sameMessages" :key="index">
                        <div class="message-header">
                            <span class="message-name">{{ message.henchMan }}</span>
                            <span class="message-date">{{ message.timestamp }}</span>
                        </div>
                        <div class="message-content">
                            <span>{{ message.content }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <NewMessage :henchMan="henchMan" />
        </div>
    </div>
</template>

<script>
import NewMessage from '@/components/NewMessage.vue'
export default {
    name: 'Chat',
    props: ['name'], // the user input name transferred from Welcome component to Chat component by props
    data() {
        return {
            henchMan: null, // the henchman name that user selects to send message
            henchManName: null, // the henchman name that user enter
            henchMenNames: [] // storing all henchman names that user enter (add button)
        }
    },
    components: {
        NewMessage
    },
    computed: {
        // getting all the messages from the state
        allMessages() {
            return this.$store.getters.allMessages;
        },
        // searching allMessages for one henchman messages (one name) & showing them on the page
        sameMessages() {
                let sameHenchManMessages = [];
                if (this.allMessages) {
                    this.allMessages.forEach(message => {
                        if (message.henchMan === this.henchMan) {
                            sameHenchManMessages.push(message);
                        }
                    });
                }
                return sameHenchManMessages; // All the messages of one henchman
        }
    },
    filters: {
        // converting the user input name to uppercase
        toUppercase(value) {
            return value.toUpperCase();
        }
    },
    methods: {
        // storing the name of the henchman, which user selects, in the data (henchMan)
        selectHenchman(name) {
            this.henchMan = name;
        },
        // Adding a henchman (button) to the list
        addName() {
            if (this.henchManName) {
                this.henchMenNames.push(this.henchManName);
                this.henchManName = null;
            }
        },
        // deleting a henchman & its related messages from the state
        removeName(name) {
            let newHenchMenNames = [];
            this.henchMenNames.forEach(henchman => {
                if (henchman !== name) {
                    newHenchMenNames.push(henchman);
                }
            })
            this.henchMenNames = newHenchMenNames;
            
            let deleteData = {allMessages: this.allMessages, name: name};
            // dispatching the delete action for a specific name along with the related data
            this.$store.dispatch('getDeleteHenchmanMessages', deleteData);
        },
        // deleting all henchmen & their related messages from the state
        removeAllNames() {
            this.henchMenNames = [];
            // dispatching the delete action for all names
            this.$store.dispatch('getDeleteAllMessages');
        }
    }
}
</script>

<style>



</style>
