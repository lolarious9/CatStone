<template>
  <v-select
    v-model="test"
    :items="users"
    item-title="name"
    label="Select an account"
    :return-object="true"
    @update:model-value="onBorrowerSelect"
  />
  <v-btn> View </v-btn>
  
  <v-data-table
   
    :items="test.loans"
    :headers="header1"
  >
    <template #item="{ item }">
      <tr>
        <td>{{ item.loanID }}</td>
        <td>{{ item.loanAmount }}</td>
        <td>{{ item.loanDate }}</td>
      </tr>
    </template>
  </v-data-table>
  <v-data-table
  
    :items="test.payments"
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
  import { ref } from 'vue';
    const header1 = [
      { title: 'Loan ID' },
      { title: 'Loan Amount' },
      { title: 'Loan Date' },
    ]
    const header2 = [{ title: 'Payment ID' }, { title: 'Payment Amount' }]
    const users = [
      {
        name: 'User 1',
        loans: [
          {
            loanID: 1,
            loanAmount: 123,
            loanDate: new Date('3/17/24'),
          },
        ],
        payments: [
          {
            paymentID: 1,
            paymentAmount: 150,
          },
          {
            paymentID: 2,
            paymentAmount: 150,
          },
        ],
      },
      {
        name: 'User 2',
        loans: [
          {
            loanID: 2,
            loanAmount: 41233,
            loanDate: new Date('3/24/24'),
          },
        ],
        payments: [
          {
            paymentID: 3,
            paymentAmount: 100,
          },
          {
            paymentID: 4,
            paymentAmount: 200,
          },
        ],
      },
      {
        name: 'User 3',
        loans: [
          {
            loanID: 4,
            loanAmount: 3200,
            loanDate: new Date('4/7/24'),
          },
        ],
        payments: [
          {
            paymentID: 5,
            paymentAmount: 125,
          },
          {
            paymentID: 6,
            paymentAmount: 175,
          },
        ],
      },   
    ] 
    
          let test = ref(users[0]); 
          let onBorrowerSelect = (val)=>{test.value=val};

  </script>