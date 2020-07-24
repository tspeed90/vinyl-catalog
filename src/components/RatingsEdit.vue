<template>
  <div class="ratings-container">
    <span v-if="this.$route.name == 'Album Edit'">
      <p>{{type}} rating:</p>
      <input v-model.lazy="condition.rating" />
    </span>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {Condition} from '@/records';
  import firebase from "firebase/app";
  import 'firebase/database';
  const database = firebase.database();

  @Component 
  export default class Ratings extends Vue {
    @Prop() private condition!: Condition;
    @Prop() private type!: String;
    
  }
</script>