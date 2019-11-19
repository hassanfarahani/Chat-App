import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      // Creating gaurd for Chat component (check to see if user has entered his/her name)
      beforeEnter: (to, from, next) => {
        if (to.params.name) {
          next();
        } else {
          alert('You need to enter your name in order to enter chat!')
          next({ name: 'Welcome' });
        }
      }
    }
  ]
})
