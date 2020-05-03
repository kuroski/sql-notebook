<template>
  <div>
    <v-btn type="primary" circle icon @click="isOpen = true">
      <v-icon>mdi-database</v-icon>
    </v-btn>

    <v-dialog v-model="isOpen" max-width="400px" light>
      <v-card>
        <v-card-title>
          <v-spacer />
          <v-btn icon @click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field v-model="host" label="Host" />
            <v-text-field v-model="database" label="Database" />
            <v-text-field v-model="port" label="Port" type="number" />
            <v-text-field v-model="username" label="Username" />
            <v-text-field v-model="password" label="Password" type="password" />
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Connection',
  data: () => ({
    isOpen: false
  }),
  computed: {
    host: {
      get() {
        return this.$store.state.connection.host
      },
      set(payload) {
        this.$store.commit('connection/setHost', payload)
      }
    },
    username: {
      get() {
        return this.$store.state.connection.username
      },
      set(payload) {
        this.$store.commit('connection/setUsername', payload)
      }
    },
    password: {
      get() {
        return this.$store.state.connection.password
      },
      set(payload) {
        this.$store.commit('connection/setPassword', payload)
      }
    },
    database: {
      get() {
        return this.$store.state.connection.database
      },
      set(payload) {
        this.$store.commit('connection/setDatabase', payload)
      }
    },
    port: {
      get() {
        return this.$store.state.connection.port
      },
      set(payload) {
        this.$store.commit('connection/setPort', payload)
      }
    }
  }
}
</script>
