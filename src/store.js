import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    counter: 0
  },
  getters: {},
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(response => {
        commit('ADD_EVENT', response.data)
      })
    },
    fetchEvents({ commit }) {
      return EventService.getEvents()
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  },
  mutations: {
    ADD_EVENT(state, event) {
      console.log(event)
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    }
  }
})
