import { app, BrowserWindow, ipcMain }  from "electron";
import path from "path"
import queries  from "./queries";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // ADD NEW BORROWER
  ipcMain.handle('db:addBorrower', async (evt, borrowerData) => {
    try {
      await queries.addBorrower(borrowerData.firstName, borrowerData.lastName, borrowerData.email, borrowerData.phone, borrowerData.address);
      console.log(`Borrower added successfully: ${borrowerData.firstName} ${borrowerData.lastName}`);
      evt.sender.send('db:addBorrower:success', true); // Send success to frontend
    } catch (err) {
      console.error('Error adding borrower:', err);
      return Promise.reject(err); // Send error to frontend
    }
  });
  
  // ADD NEW LOAN AND UPDATE ACCOUNT BALANCE
  ipcMain.handle('db:addLoan', async (evt, loanData) => {
    try {
      await queries.addLoan(loanData.borrowerID, loanData.loanAmount, loanData.loanDate);
      console.log(`Loan added successfully for borrower ${loanData.borrowerID}`);
      evt.sender.send('db:addLoan:success', true); // Send success to frontend
    } catch (err) {
      console.error('Error adding loan:', err);
      return Promise.reject(err); // Send error to frontend
    }
  });
  
  // ADD NEW PAYMENT AND UPDATE ACCOUNT BALANCE
  ipcMain.handle('db:addPayment', async (evt, paymentData) => {
    try {
      await queries.addPayment(paymentData.borrowerID, paymentData.paymentAmount, paymentData.paymentDate);
      console.log(`Payment added successfully for borrower ${paymentData.borrowerID}`);
      return Promise.resolve();
    } catch (err) {
      console.error('Error adding payment:', err);
      return Promise.reject(err); // Send error to frontend
    }
  });
  
  // GET ALL BORROWERS AND THEIR ACCOUNT BALANCE
  ipcMain.handle('db:getAllBorrowers', async () => {
    try {
      const borrowers = await queries.getAllBorrowers();
      return borrowers;
    } catch (err) {
      console.error('Error getting borrowers:', err);
      return Promise.reject(err);
    }
  });
  
  // GET ALL PAYMENTS MADE BY A SPECIFIED BORROWER
  ipcMain.handle('db:getAllPaymentsByBorrower', async (evt, borrowerID) => {
    try {
      const payments = await queries.getAllPaymentsByBorrower(borrowerID);
      return payments;
    } catch (err) {
      console.error('Error getting payments for borrower:', err);
      return Promise.reject(err); 
    }
  });



  
  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
