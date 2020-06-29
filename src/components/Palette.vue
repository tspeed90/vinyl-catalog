<template>
  <div class="palette-container">
    <button v-for="(hexValue, colorName) in paletteColors" v-bind:key="colorName" :class="colorName" class="color-picker"></button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AlbumsList extends Vue {
  paletteColors = {
    yellow: "#e8d84a",
    purple: "#bb89e4",
    cyan: "#4fe3ee",
    red: "#f64b4b"
  };


}
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";

.palette-container {
  display: flex;
  position: absolute;
  top: 40px;
  right: 20px;
}
.color-picker {
  height: 30px;
  width: 30px;
  margin-right: 5px;
  border: none;
}
.yellow {
  background-color: $theme-yellow;
}
.purple {
  background-color: $theme-purple;
}
.cyan {
  background-color: $theme-cyan;
}

.red {
  background-color: $theme-red;
}
</style>
