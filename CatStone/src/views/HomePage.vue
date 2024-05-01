<template>
  <v-card
    
    v-if="borrowers"
  >
    <v-card-title>
      Accounts: {{ numAccouts }} {{ borrowers }}
      <v-select
        v-model="selected"
        item-title="name"
        :items="borrowers"
        return-object
      />
    </v-card-title>
    <v-card-text v-if="selected">
      <p class="text-h6 font-weight-black">
        Name: {{ selected.name }}
      </p>
      Loans: ${{ selectedAmts.loans }}
      Payments: ${{ selectedAmts.payments }}
      Total: ${{ selectedAmts.loans - selectedAmts.payments }}
    </v-card-text>
  </v-card>
</template>


<script setup>
  import {  ref,computed} from 'vue'
  const props = defineProps({borrowers:{type:Array,default(){return []}},ready:Boolean})
  const selected  = ref(null);
  
  



 
  // Computed will change with the underlying object (borrowersDataIn for now)
  //let sumAccts = computed(()=> borrowers != null ? borrowers.reduce((prev,curr)=> prev+ curr.loanSum,0):"woah");
  
  let numAccouts = computed(()=> props.borrowers != null ?  props.borrowers.length : 0)
  let selectedAmts = computed(()=>selected.value != null ?  {
    loans:selected.value.loans.reduce((prev,curr)=> prev+ curr.loanAmount,0),
    payments:selected.value.payments.reduce((prev,curr)=> prev+ curr.paymentAmount,0)
  }:"woah");
  


</script>