<template>
  <v-select
    v-model="selected"
    :items="users"
    item-title="fullName"
    label="Select an account"
    :return-object="true"
  />
  <div
    v-if="selected"
    class="text-h6 font-weight-black"
  >
    Balance: ${{ selected.accountBalance }}
    Payments: ${{ selectedAmts }}
    Total Remaining: ${{ total }}
  </div>
  
  <v-data-table
    v-if="readySelect"
    :items="selectedBorrower"
    :headers="header2"
  >
    <template #item="{ item }">
      <tr>
        <td>{{ item.payment_id }}</td>
        <td>{{ item.payment_amt }}</td>
        <td>{{ item.payment_date }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
  
  <script setup>
  import { ref,computed,watch} from 'vue'
   
  const props = defineProps({borrowers:{type:Array,default(){return []}},ready:Boolean,standby:Boolean})
  const selected  = ref(null);
 
  
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
    const header2 = [{ title: 'Payment ID' }, { title: 'Payment Amount' },{title:'Payment Date'}]
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