<template>
  <div>
    <v-btn
      type="primary"
      icon="v-icon-connection"
      circle
      @click="isOpen = true"
    ></v-btn>

    <v-dialog title="Connection" :visible.sync="isOpen">
      <v-form>
        <v-form-item label="Host">
          <v-input v-model="host" />
        </v-form-item>

        <v-form-item label="Database">
          <v-input v-model="database" />
        </v-form-item>

        <v-form-item label="Port">
          <v-input v-model="port" type="number" />
        </v-form-item>

        <v-form-item label="Username">
          <v-input v-model="username" />
        </v-form-item>

        <v-form-item label="Password">
          <v-input v-model="password" type="password" />
        </v-form-item>
      </v-form>
      <span slot="footer" class="dialog-footer">
        <v-btn @click="isOpen = false">Close</v-btn>
      </span>
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
