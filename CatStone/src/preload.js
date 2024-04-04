// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer }  from "electron/renderer"
contextBridge.exposeInMainWorld('dbDispatch', {
  createLoan: (loanee,loan) => ipcRenderer.send('db:createLoan', loanee,loan),
  getBorrowers:(constraints) => ipcRenderer.send('db:getBorrowers',constraints)
  
})