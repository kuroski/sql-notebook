<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-connection"
      circle
      @click="isOpen = true"
    ></el-button>

    <el-dialog title="Connection" :visible.sync="isOpen">
      <el-form>
        <el-form-item label="Host">
          <el-input v-model="host" />
        </el-form-item>

        <el-form-item label="Database">
          <el-input v-model="database" />
        </el-form-item>

        <el-form-item label="Port">
          <el-input v-model="port" type="number" />
        </el-form-item>

        <el-form-item label="Username">
          <el-input v-model="username" />
        </el-form-item>

        <el-form-item label="Password">
          <el-input v-model="password" type="password" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isOpen = false">Close</el-button>
      </span>
    </el-dialog>
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
