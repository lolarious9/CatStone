// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer }  from "electron"
contextBridge.exposeInMainWorld("dbDispatch", {
  addBorrower: (borrowerData) => ipcRenderer.invoke('db:addBorrower', borrowerData),
  addLoan: (loanData) => ipcRenderer.invoke('db:addLoan', loanData),
  addPayment: (paymentData) => ipcRenderer.invoke('db:addPayment', paymentData),
  getAllBorrowers: () => ipcRenderer.invoke('db:getAllBorrowers'),
  getAllPaymentsByBorrower: (borrowerID) => ipcRenderer.invoke('db:getAllPaymentsByBorrower', borrowerID),
  
})