<template>
  <div>
    <el-form label-width="0">
      <el-form-item>
        <prism-editor v-model="query" class="cell__editor" line-numbers />
        <el-button
          class="cell__query"
          circle
          icon="el-icon-caret-right"
          :loading="isLoading"
          :disabled="isLoading"
          plain
          @click="executeQuery"
        />
      </el-form-item>
    </el-form>

    <el-table
      v-if="cell.data && cell.data.length"
      :data="cell.data"
      stripe
      style="width: 100%; margin-bottom: 1rem;"
    >
      <el-table-column
        v-for="column in columns"
        :key="column"
        :prop="column"
        :label="column"
      >
      </el-table-column>
    </el-table>

    <el-card v-if="cell.error" class="cell__error">
      <tree-view :data="cell.error" />
    </el-card>
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
      return this.cell?.data.length && Object.keys(this.cell.data[0])
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
.cell__editor {
  padding-right: 4rem;
  background-color: #1e1e1e;
  box-sizing: border-box;
  min-height: 3.5rem;
}

.cell__query {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}

.cell__error {
  margin-bottom: 1rem;
}
</style>
