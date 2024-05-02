<template>
  <v-select
    v-model="selected"
    :items="users"
    item-title="name"
    label="Select an account"
    :return-object="true"
  />
  
  
  <v-data-table
    v-if="readySelect"
    :items="selectedBorrower"
    :headers="header2"
  >
    <template #item="{ item }">
      <tr>
        <td>{{ item.paymentID }}</td>
        <td>{{ item.paymentAmount }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
  
  <script setup>
  import { ref,computed,watch} from 'vue'
    const header1 = [
      { title: 'Loan ID' },
      { title: 'Loan Amount' },
      { title: 'Loan Date' },
    ]
    
  const props = defineProps({borrowers:{type:Array,default(){return []}},ready:Boolean,standby:Boolean})
  const selected  = ref(null);
  const success = ref(null);
  
  const selectedBorrower = ref(null)
  const readySelect = ref(false);  
   let selectedAmts = ref(-1.0) 
  let total = ref(0.0)
  const users = computed(()=>props.borrowers != null ? props.borrowers.map((borrower)=>{
    return{
      fullName: `${borrower.first_name} ${borrower.last_name}`,
      ...borrower
    }
  }) : {})
    const header2 = [{ title: 'Payment ID' }, { title: 'Payment Amount' }]
   watch(selected, async()=>{ 
    readySelect.value = false;
    
      window.dbDispatch.getAllPaymentsByBorrower(selected.value.borrower_id)
      .then((v)=>{
        selectedAmts.value = v.reduce((prev,curr)=>prev + parseFloat(curr.payment_amt),0)
        total.value = Math.round(((parseFloat(selected.value.accountBalance)- selectedAmts.value)+Number.EPSILON)*100)/100
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