<template>
  <div class="album-details-container">
    <Album :record="firstRecord" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import Album from "@/components/Album.vue";
import records from "../../utils/albums.json";

@Component({
  components: {
    Album
  }
})
export default class AlbumDetails extends Vue {
  private get firstRecord() {
    if (this.$route.params.id) {
      return records[this.$route.params.id];
    } else {
      return records[0];
    }
  }
}
</script>

<style lang="scss"></style>;
