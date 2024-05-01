<template>
  <v-sheet
    class="mx-auto"
    width="300"
  >
    <v-form @submit.prevent>
      <v-text-field
        v-model="Name"
        :rules="nameRules"
        label="Name"
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
    import { ref } from 'vue'
  
    const Name = ref('')
    const PaymentAmount = ref('')
  
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
  