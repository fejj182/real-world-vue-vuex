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
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(response => {
        commit('ADD_EVENT', response.data)
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    return EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, dispatch, getters }, { id }) {
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      return EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching an event: ' + error.message
          }
          dispatch('notification/add', notification, {
            root: true
          })
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
