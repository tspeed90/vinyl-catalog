<template>
  <div class="album-details-container">
    <Album v-if="this.$route.name == 'Album Details'" :record="displayRecord" />
    <AlbumEdit v-if="this.$route.name == 'Album Edit'" :record="displayRecord"/> 
    <router-link :to="editAlbumRoute">
      <font-awesome-icon :icon="editLinkIcon" class="edit-icon" :title="editStatus" />
    </router-link>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import Album from "@/components/Album.vue";
import AlbumEdit from "@/components/AlbumEdit.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/app";
import 'firebase/database';
const database = firebase.database();

library.add(faPencilAlt, faCheck);

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
  }

  get displayRecord() {
    return catalogData.album;
  }

  get editAlbumRoute() {
    if (this.$route.name == 'Album Details') {
      return {name: 'Album Edit'};
    } else {
      return {name: 'Album Details'};
    }
  }

  get editLinkIcon() {
    if (this.$route.name == 'Album Details') {
      return ['fas', 'pencil-alt'];
    } else {
      return ['fas', 'check'];
    }
  }

  get editStatus() {
     if (this.$route.name == 'Album Details') {
      return 'edit';
    } else {
      return 'save changes';
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.album-details-container:first-child {
  position: relative;
}

.edit-icon {
  color: #333;
  font-size: 30px;
  border: 1px solid $theme-color;
  background-color: $theme-color;
  padding: 15px;
  border-radius: 50%;
  position: absolute;
  right: 10%;
  bottom: 3%;
}

@media screen and (min-width: 800px) {
  .edit-icon {
    right: 5%;
    bottom: 5%;
  }
}

</style>;
