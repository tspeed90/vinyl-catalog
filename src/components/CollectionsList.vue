<template>
    <div class="collections-list-container">
        <router-link to="/collections" v-bind:key="all-albums" class="collections-buttons">all albums</router-link>
        <router-link :to="{name: 'Collections List', params: { collection: title } }"  v-for="title in catalogData.collectionTitles" v-bind:key="title" class="collections-buttons">{{title}}</router-link>
    </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class CollectionsList extends Vue {
  @Prop() private catalogData!;
}
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";

.collections-buttons {
  padding: 8px;
  font-size: 18px;
  background-color: $theme-color;
  border: solid 1px $theme-color;
  margin: 5px;
  color:#333;
}
</style>