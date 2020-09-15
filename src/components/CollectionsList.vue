<template>
  <div class="collections-list-container" v-if="Object.keys(catalogData.collectionTitles).length > 0">
    <router-link to="/" v-bind:key="all-albums" class="collections-buttons">all albums</router-link>
    <div v-for="(set, belongsTo) in this.collectionSets" v-bind:key="set">
      <button v-on:click="setExpandedState(belongsTo)" class="decades-collapse-btn" v-if="belongsTo !== ''">{{belongsTo}}<span class="expand-symbol">+</span></button>
      <div v-if="isSetExpanded(belongsTo)">
        <router-link :to="{name: 'Collections List', params: { collection: title.displayName } }" v-for="title in set" v-bind:key="title" class="collections-buttons">{{title.displayName}}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { CatalogData, Collection } from "@/records";



@Component
export default class CollectionsList extends Vue {
  @Prop() private catalogData!: CatalogData;
  
  collectionsState: {[key:string]:boolean} = {};

  private get collectionSets() {
    const collectionTitles = Object.values(this.catalogData.collectionTitles);
    type Sets = {
      [key:string]: Collection[]
    }
    const sets = <Sets>{};
    collectionTitles.forEach(title => {
      if (sets[title.belongsTo] == undefined) {
        sets[title.belongsTo] = []
      }
      sets[title.belongsTo].push(title);
    })
    return sets;
  }
  
  constructor() {
    super();
    const collectionTitles = Object.values(this.catalogData.collectionTitles);
      collectionTitles.forEach(title => {
        if (title.belongsTo !== undefined) {
          this.collectionsState[title.belongsTo] = false, 
          this.collectionsState[""] = true
        }
      })
  }

  private setExpandedState(belongsTo:string) {
    this.collectionsState[belongsTo] = !this.collectionsState[belongsTo];
  }

  private isSetExpanded(belongsTo:string) {
    return this.collectionsState[belongsTo];
  }

 
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

.collections-buttons, .decades-collapse-btn {
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

.decades-collapse-btn {
  display: flex;
  width: 95%;
  text-align: center;
  position: relative;
}

.expand-symbol {
  position: absolute;
  right: 5px;
  top: 5px;
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