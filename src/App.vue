<template>
  <CBox bg="#E5E5E5" fontFamily="Montserrat Helvetica, Arial, sans-serif">
    <router-view/>
  </CBox>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import { CBox } from '@chakra-ui/vue'
import {fetchCurrentUser} from "./http/index.js"
  @Component({
    components: {CBox},
  })
  export default class App extends Vue {}
</script>