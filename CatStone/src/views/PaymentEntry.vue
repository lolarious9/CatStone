<template>
  <v-sheet
  
    class="mx-auto"
    width="300"
  >
    <h1>Add Payment</h1>
    <v-form @submit.prevent="submitPayment">
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
    <div
      v-show="submissionStatus !== null"
      class="submission-status"
    >
      <v-alert :type="submissionStatus ? 'success' : 'error'">
        {{ submissionStatus ? 'Form submitted successfully! 🎉' : 'Form submission failed. Please fill out all fields correctly.' }}
      </v-alert>
    </div>
  </v-sheet>
</template>
  
  <script setup>
   import {  ref,computed} from 'vue'
  const props = defineProps({borrowers:{type:Array,default(){return []}},ready:Boolean,standby:Boolean})
  const selected  = ref(null);
  const submissionStatus = ref(null);

 
  const namesAndLoans = computed(()=>props.borrowers != null ? props.borrowers.map((borrower)=>{
    return{
      fullName: `${borrower.first_name} ${borrower.last_name}`,
      ...borrower
    }
  }) : {})

    
   
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
    }).then(()=>{submissionStatus.value = true}).catch((e)=>{
      console.log(selected.value)
      console.error(e)
      submissionStatus.value = false
    })
    
    const paymentRules = [
      value => {
        if (value) return true
        return 'This field is required.'
      },
    ]
  </script>
  