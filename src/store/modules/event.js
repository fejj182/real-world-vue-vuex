import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  currentEvent: {}
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}

export const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event).then(response => {
      commit('ADD_EVENT', response.data)
    })
  },
  fetchEvents({ commit }, { perPage, page }) {
    return EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  fetchEvent({ commit, getters }, { id }) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      return EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    }
  }
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT(state, event) {
    state.currentEvent = event
  }
}
