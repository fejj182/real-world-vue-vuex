import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    todos: [
      { id: 1, text: 'Cheese', done: true },
      { id: 2, text: 'Bread', done: false },
      { id: 3, text: 'Salami', done: true },
      { id: 4, text: 'Aubergine', done: false }
    ]
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: (state) => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
    },
    getEventById: (state) => (id) => {
      return state.todos.find(event => event.id === id).text
    }
  },
  mutations: {},
  actions: {}
})
