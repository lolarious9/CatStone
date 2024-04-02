<template>
  <v-card title="Loans">
    <v-card-text>{{ numAccouts + " Debtors : $" + sumAccts }}</v-card-text>
  </v-card>
</template>


<script setup>
 import {  computed } from 'vue'

  let tmpDataIn = [{
    loanSum:100
  },
  {loanSum: 250},
  {loanSum: 350}
  ]

  // Computed will change with the underlying object (tmpDataIn for now)
  let sumAccts = computed(()=>tmpDataIn.reduce((prev,curr)=> prev+ curr.loanSum,0))
  let numAccouts = computed(()=>tmpDataIn.length)

  


</script>