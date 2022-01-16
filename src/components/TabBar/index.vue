<template>
  <v-app-bar dense elevation="0" class="tab-bar">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-btn icon>
      <v-icon large>mdi-arrow-left-thin</v-icon>
    </v-btn>

    <v-toolbar-title>
      <b>オークション日の設定</b>
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
const AuctionDateSettings = defineComponent({

})
export default AuctionDateSettings
</script>
<style lang="sass">
  .tab-bar
    border-bottom: 1px solid #8492A6 !important
    background-color: white !important
</style>