<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-spacer />
      <Connection />
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {}
</script>
