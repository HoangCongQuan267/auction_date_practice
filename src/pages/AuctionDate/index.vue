<template lang="">
  <div>
    <tab-bar/>
    <auction-date-settings />
  </div>
</template>
<script lang="ts">
import { AuctionDateSettings } from "../../components";
import { TabBar } from "../../components";

export default {
  components: {
    AuctionDateSettings,
    TabBar
  },
  props: {},
  data() {
    return {};
  },
};
</script>
<style lang=""></style>
