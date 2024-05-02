// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer }  from "electron"
contextBridge.exposeInMainWorld("dbDispatch", {
  createLoan:  (loanee,loan) =>  ipcRenderer.invoke('db:createLoan', loanee,loan),
  getBorrowers:(constraints) =>  ipcRenderer.invoke('db:getBorrowers',constraints),
  payLoan: (loan,amt) =>  ipcRenderer.invoke('db:createLoan', loan,amt)
  
})