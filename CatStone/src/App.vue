<template>
  <v-layout>
    <v-app-bar :elevation="2">
      <template #prepend>
        <v-app-bar-nav-icon id="nav-activator" />

        <v-menu
          activator="#nav-activator"
          contained
        >
          <v-list>
            <v-list-item
              v-for="(item, i) in routes"
              :key="i"
              :value="i"
              @click="setRoute(item.title)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <v-app-bar-title>CatStone</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
      <component :is="route.sfc" />
    </v-main>
  </v-layout>
</template>

<script setup>
 import { ref, computed } from 'vue'
 import routes  from "./routes.js"

 //Controls the current route
 let routeName =  ref("HomePage")
 function setRoute(val){
  routeName.value = val
 }

 //Computes it after changes so we dont have to.
 const route = computed(()=>{return routes[routeName.value]})

 console.log('👋 This message is being logged by "App.vue", included via Vite');




  
  


</script>