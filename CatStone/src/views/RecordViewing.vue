<template>
  <v-select
    :items="users"
    item-title="name"
    label="Select an account"
  />
  <v-btn> View </v-btn>
  
  <v-data-table
    :headers="header1"
    :items="users"
  >
    <template #item="{ item }">
      <tr>
        <td>{{ item.loans[0].loanID }}</td>
        <td>{{ item.loans[0].loanAmount }}</td>
        <td>{{ item.loans[0].loanDate }}</td>
      </tr>
    </template>
  </v-data-table>
  <v-data-table
    :headers="header2"
    :items="users"
  >
    <template #item="{ item }">
      <tr>
        <td>{{ item.payments[0].paymentID }}</td>
        <td>{{ item.payments[0].paymentAmount }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
  
  <script setup>
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
            loanAmount: 300,
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
            loanAmount: 300,
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
            loanAmount: 300,
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
  </script>