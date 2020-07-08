<template>
  <div class="album-details-container">
    <Album :record="displayRecord" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import Album from "@/components/Album.vue";
import firebase from "firebase/app";
import 'firebase/database';
const database = firebase.database();

let catalogData = Vue.observable({
  collectionTitles: [],
  albums:{}
})

@Component({
  components: {
    Album
  }
})

export default class AlbumDetails extends Vue {
   created () {
    database.ref('/').once('value').then(function(snapshot) {
      catalogData.collectionTitles = snapshot.val().collectionTitles;
      catalogData.albums = snapshot.val().albums;
    });
  }

  get displayRecord() {
    return catalogData.albums[this.$route.params.id]
  }
}
</script>

<style lang="scss"></style>;
