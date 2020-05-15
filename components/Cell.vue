<template>
  <div class="flex-column cell">
    <v-form label-width="0">
      <prism-editor v-model="query" class="cell__editor" line-numbers />

      <v-btn
        class="cell__query"
        fab
        x-small
        :loading="isLoading"
        :disabled="isLoading"
        @click="executeQuery"
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
    </v-form>

    <v-data-table
      v-if="cell.data && cell.data.length"
      :items="cell.data"
      :headers="columns"
      disable-pagination
      hide-default-footer
      class="elevation-1"
    ></v-data-table>

    <v-card v-if="cell.error" outlined>
      <v-card-text>
        <tree-view :data="cell.error" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isLoading: false
  }),
  computed: {
    cell() {
      return this.$store.state.notebook.cells.find(
        (cell) => cell.uuid === this.uuid
      )
    },
    columns() {
      return (
        this.cell?.data.length &&
        Object.keys(this.cell.data[0]).map((key) => ({
          text: key,
          value: key
        }))
      )
    },
    query: {
      get() {
        return this.cell.query
      },
      set(value) {
        this.$store.commit('notebook/updateCell', {
          uuid: this.uuid,
          payload: {
            query: value
          }
        })
      }
    }
  },
  methods: {
    executeQuery() {
      this.isLoading = true
      this.$axios
        .$post('query', {
          query: this.query,
          connection: this.$store.state.connection
        })
        .then(
          (result) => {
            this.$store.commit('notebook/updateCell', {
              uuid: this.uuid,
              payload: {
                data: result.results,
                error: null
              }
            })
          },
          (error) => {
            this.$notify.error({
              title: 'Error',
              message: error.message
            })
            this.$store.commit('notebook/updateCell', {
              uuid: this.uuid,
              payload: {
                data: null,
                error: error.response.data
              }
            })
          }
        )
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped>
.cell > form {
  position: relative;
}

.cell__editor {
  position: relative;
  padding-right: 4rem;
  background-color: #1e1e1e;
  box-sizing: border-box;
  min-height: 3.5rem;
}

.cell__editor >>> pre > code {
  background-color: transparent;
  box-shadow: none;
}

.cell__editor >>> pre > code::before {
  content: none;
}

.cell__query {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
</style>
