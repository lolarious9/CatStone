import { app, BrowserWindow, ipcMain }  from "electron";
import path from "path"

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


  //Make these async
  //Loan Creater
  ipcMain.handle("db:createLoan", async(evt,loanee,loan)=>{
    
    // create db entry 
    console.log(`${evt}\t${loanee},${loan}`)
   
  })
  
  //Get borrowers and their loans
   ipcMain.handle("db:getBorrowers",async (evt, constraints = null)=>{
    if (!constraints){
      //  Return DB CALL FOR ALL BORROWERS WITH LOANS
       return Promise.resolve([
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
    ] );
    }

    // Return DB CALL WITH CONSTRAINTS


     console.log(`${evt}\t${constraints}`);
     
  })

  //Pay loan for given borrower
   ipcMain.handle("db:payLoan",(evt,loan,amt)=>{
    // Handle pay logic and update db
    console.log(`${evt}\t${loan},${amt}`)
  })



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
