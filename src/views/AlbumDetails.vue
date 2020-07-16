<template>
  <div class="album-details-container">
    <Album v-if="this.$route.name == 'Album Details'" :record="displayRecord" />
    <AlbumEdit v-if="this.$route.name == 'Album Edit'" :record="displayRecord"/>  
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import Album from "@/components/Album.vue";
import AlbumEdit from "@/components/AlbumEdit.vue";
import firebase from "firebase/app";
import 'firebase/database';
const database = firebase.database();

let catalogData = Vue.observable({
  album:{}
})

@Component({
  components: {
    AlbumEdit,
    Album
  }
})

export default class AlbumDetails extends Vue {
  created () {
    database.ref('/albums/' + this.$route.params.id).on('value', function(snapshot) {
      catalogData.album = snapshot.val();
    });
    console.log(this.$route.name)
  }

  get displayRecord() {
    return catalogData.album;
  }
}
</script>

<style lang="scss"></style>;
