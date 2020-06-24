<template>
  <div class="home">
    <Album :record="firstRecord" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import Album from "@/components/Album.vue";
import records from "../../records.json";

@Component({
  components: {
    Album
  }
})
export default class Home extends Vue {
  private get firstRecord() {
    return records[0];
  }
}
</script>
