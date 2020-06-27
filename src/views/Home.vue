<template>
  <div class="home">
    <AlbumsList :records="records" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import AlbumsList from "@/components/AlbumsList.vue";
import records from "../../utils/albums.json";

@Component({
  components: {
    AlbumsList
  }
})
export default class Home extends Vue {
  currentIndex = 0;

  private get records() {
    return records;
  }
}
</script>

<style lang="scss"></style>
