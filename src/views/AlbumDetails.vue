<template>
  <div class="album-details-container">
    <Album :record="displayRecord" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import Album from "@/components/Album.vue";
import catalogData from "../../utils/albums.json";

@Component({
  components: {
    Album
  }
})
export default class AlbumDetails extends Vue {
  private get displayRecord() {
    if (this.$route.params.id) {
      return catalogData.albums.find(record => record.id == this.$route.params.id);
    } else {
      return catalogData.albums[0];
    }
  }
}
</script>

<style lang="scss"></style>;
