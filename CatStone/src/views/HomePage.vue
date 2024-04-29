<template>
  <v-card
    v-if="ready"
  >
    <v-card-title>
      Accounts: {{ numAccouts }}
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
 
  const selected  = ref(null);
  
   function getBorrowers (){
    const ready = ref(false)
    const borrowers = ref(null);
    //execute the search
    const exe = async()=>
    {
      ready.value=false;
      borrowers.value =  await window.dbDispatch.getBorrowers();   
      ready.value = true;
    }

    exe();
    return {
      borrowers,
      ready
    }
  }
  
  
  let {borrowers,ready}= getBorrowers();



 
  // Computed will change with the underlying object (borrowersDataIn for now)
  //let sumAccts = computed(()=> borrowers != null ? borrowers.reduce((prev,curr)=> prev+ curr.loanSum,0):"woah");
  let numAccouts = computed(()=>borrowers.value.length != null ?  borrowers.value.length : 0)
  let selectedAmts = computed(()=>selected.value != null ?  {
    loans:selected.value.loans.reduce((prev,curr)=> prev+ curr.loanAmount,0),
    payments:selected.value.payments.reduce((prev,curr)=> prev+ curr.paymentAmount,0)
  }:"woah");
  


</script>