<template>
  <v-card
    v-if="ready"
  >
    <v-card-title>Accounts: {{ numAccouts }}</v-card-title>
    <v-card-text>
      {{ tmp }}
    </v-card-text>
  </v-card>
</template>


<script setup>
 import {  ref,computed} from 'vue'
  
   function getBorrowers (){
    const ready = ref(false)
    const tmp = ref(null);

    //execute the search
    const exe = async()=>
    {
      ready.value=false;
      tmp.value =  await window.dbDispatch.getBorrowers();   
      ready.value = true;
    }

    exe();
    return {
      tmp,
      ready
    }
  }
  
  
  let {tmp,ready}= getBorrowers();



 
  // Computed will change with the underlying object (tmpDataIn for now)
  //let sumAccts = computed(()=> tmp != null ? tmp.reduce((prev,curr)=> prev+ curr.loanSum,0):"woah");
  let numAccouts = computed(()=>tmp.value.length != null ?  tmp.value.length : 0)

  


</script>