<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p>This event is created by {{ user.name }}</p>
    <p>There are {{ catLength }} items in this category.</p>
    <p>There are {{ activeTodos }} active To Do's left</p>
    <p>Remember to buy an {{ getEvent(4) }}</p>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        catLength: 'catLength', 
        activeTodos: 'activeTodosCount', 
        getEvent: 'getEventById'
        }),
      ...mapState(['categories', 'user']) // <-- using object spread operator
    }
  }
</script>

<style scoped>

</style>
