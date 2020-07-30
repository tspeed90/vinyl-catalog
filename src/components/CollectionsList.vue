<template>
  <div class="collections-list-container" v-if="Object.keys(catalogData.collectionTitles).length > 0">
    <router-link to="/collections" v-bind:key="all-albums" class="collections-buttons">all albums</router-link>
    <router-link :to="{name: 'Collections List', params: { collection: title } }"  v-for="title in Object.keys(catalogData.collectionTitles)" v-bind:key="title" class="collections-buttons">{{title}}</router-link>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class CollectionsList extends Vue {
  @Prop() private catalogData;
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.collections-list-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  justify-content: center;
}

.collections-buttons {
  padding: 2px 5px;
  font-size: 20px;
  background-color: $theme-color;
  border: solid 1px $theme-color;
  margin: 5px;
  color:#333;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (min-width: 700px) {
  .collections-list-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 0;
    margin: 0px 40px 0 25px;
    width: 200px;
  }
}

</style>