import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        henchMenMessages: [] // All messages
    },
    mutations: {
        // putting the new message in the state
        setMessage(state, newMessage) {
            state.henchMenMessages.push(newMessage);
        },
        // putting the new messages (except for the one that should be deleted) in the state
        setDeleteHenchmanMessages(state, newAllMessages) {
            state.henchMenMessages = newAllMessages;
        },
        // deleting all the messages
        setDeleteAllMessages(state) {
            state.henchMenMessages = [];
        }
    },
    actions: {
        // sending the new message to the mutation
        getMessage({ commit }, newMessage) {
            commit('setMessage', newMessage);
        },
        // selecting the message to be deleted & sending the remaining messages to the mutation
        getDeleteHenchmanMessages({ commit }, deleteData) {
            let newAllMessages = [];
            deleteData.allMessages.forEach(message => {
                if (message.henchMan !== deleteData.name) {
                    newAllMessages.push(message);
                }
            });
            commit('setDeleteHenchmanMessages', newAllMessages);            
        },
        // deleting all the messages
        getDeleteAllMessages({ commit }) {
            commit('setDeleteAllMessages');
        }
    },
    getters: {
        // getting all the messages from the state
        allMessages(state) {
            return state.henchMenMessages;
        }
    }
});