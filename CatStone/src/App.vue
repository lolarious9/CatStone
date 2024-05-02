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
      <component
        :is="route.sfc"  
        :borrowers="borrowers"  
        :ready="ready"
        :standby="standby"
      />
    </v-main>
  </v-layout>
</template>

<script setup>
 import { ref, computed } from 'vue'
 import routes  from "./routes.js"
 //Controls the current route
 let routeName =  ref("HomePage")
 function setRoute(val){
  routeName.value = val.replace(" ","")
 }
function getBorrowers (){
    const ready = ref(false)
    const borrowers = ref(null);
    const standby = ref(false)
    //execute the search
    const exe = async()=>
    {
      standby.value = true;
      ready.value=false;
      window.dbDispatch.getAllBorrowers()
        .then((borrowersIn)=>{
          borrowers.value = borrowersIn
             ready.value = true;
    })
      .catch((err)=>{
        console.error(err)
      })


   
      standby.value = false;
    }
    exe();
    return {
      borrowers,
      ready,
      standby
    }
  }
  
  
  let {borrowers,ready,standby}= getBorrowers();


 //Computes it after changes so we dont have to.
  const route = computed(()=>{return routes[routeName.value]})

 console.log('👋 This message is being logged by "App.vue", included via Vite');




  
  


</script>