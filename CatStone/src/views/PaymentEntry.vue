<template>
  <v-sheet
  
    class="mx-auto"
    width="300"
  >
    <h1>Add Payment</h1>
    <v-form @submit.prevent="submitPayment">
      <v-text-field
        v-model="Name"
        :rules="nameRules"
        label="Name"
      />
      <v-select
        v-model="selected"
        :loading="standby"
        item-title="fullName"
        :items="namesAndLoans"
        placeholder="Borrowers"
        no-data-text="Unable to contact database"
        return-object
      />
   
      <v-text-field
        v-model="PaymentAmount"
        :rules="paymentRules"
        label="Payment Amount"
      />
      <v-btn
        class="mt-2"
        type="submit"
        block
      >
        Submit
      </v-btn>
    </v-form>
  </v-sheet>
</template>
  
  <script setup>
   import {  ref,computed,watch} from 'vue'
  const props = defineProps({borrowers:{type:Array,default(){return []}},ready:Boolean,standby:Boolean})
  const selected  = ref(null);
  const success = ref(null);
  const namesAndLoans = computed(()=>props.borrowers != null ? props.borrowers.map((borrower)=>{
    return{
      fullName: `${borrower.first_name} ${borrower.last_name}`,
      ...borrower
    }
  }) : {})
    watch(selected,()=>{
      if(selected.value.fullName){
      Name.value = selected.value.fullName
      }
    })
    const Name = ref('')
    const PaymentAmount = ref('')
    function formatDate(date) {
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${year}/${month}/${day}`;
    }

    const submitPayment = ()=> window.dbDispatch.addPayment({
      borrowerID: selected.value.borrower_id,
      paymentAmount: parseFloat(PaymentAmount.value),
      paymentDate: formatDate(new Date(Date.now()))
    }).then(()=>{success.value = true}).catch((e)=>{
      console.log(selected.value)
      console.error(e)
      success.value = false
    })
    const nameRules = [
      value => {
        if (value) return true
        return 'This field is required.'
      },
    ]
    const paymentRules = [
      value => {
        if (value) return true
        return 'This field is required.'
      },
    ]
  </script>
  