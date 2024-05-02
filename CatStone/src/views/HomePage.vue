<template>
  <v-card
    
    v-if="ready"
  >
    <v-card-title>
      Accounts: {{ numAccouts }} 
      <v-select
        v-model="selected"
        :loading="standby"
        item-title="fullName"
        :items="namesAndLoans"
        placeholder="Borrowers"
        no-data-text="Unable to contact database"
        return-object
      />
    </v-card-title>
    <v-card-text v-if="selected">
      {{ selected }}
      {{ selectedBorrower }}
    </v-card-text>
  </v-card>
</template>


<script setup>
  import {  ref,computed,watch} from 'vue'
  const props = defineProps({borrowers:{type:Array,default(){return []}},ready:Boolean,standby:Boolean})
  const selected  = ref(null);


  const namesAndLoans = computed(()=>props.borrowers != null ? props.borrowers.map((borrower)=>{
    return{
      fullName: `${borrower.first_name} ${borrower.first_name}`,
      ...borrower
    }
  }) : {})

  
  // Computed will change with the underlying object (borrowersDataIn for now)
  //let sumAccts = computed(()=> borrowers != null ? borrowers.reduce((prev,curr)=> prev+ curr.loanSum,0):"woah");
  //let selectedAmts = computed(()=>readySelect.value ? selectedBorrowe)
  let numAccouts = computed(()=> props.borrowers != null ?  props.borrowers.length : 0)
  const selectedBorrower = ref(null)
  const readySelect = ref(false);  
  watch(selected, async()=>{ 
    readySelect.value = false;
    
      window.dbDispatch.getAllPaymentsByBorrower(selected.value.borrower_id)
      .then((v)=>{
        selectedBorrower.value=v
        console.log(v)
        readySelect.value = true
      })
      .catch((e)=>{
        console.error(e)
        selectedBorrower.value = null
        
      })
    })
    

</script>