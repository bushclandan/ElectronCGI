const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('fs');
const settings = require('electron-settings');

let dataPath = null;
let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  })

  win.loadFile('index.html')
  win.webContents.once("did-finish-load", () => {
    console.log("did-finish-load");
    loadAppSettings();
  });

  win.webContents.once("dom-ready", () => {
    console.log("dom-ready");
  });

  win.once("ready-to-show", () => {
    console.log("ready-to-show");
  });

  // Open Dev Tools
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })  
})



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})




//#region functions

//called once webContents('did-finish-load') is called
function loadAppSettings()
{  
  //get all settings
  let lastSchoolDataPath = null;

  //confirm and get path to most recent school
  if(settings.hasSync('lastSchoolName') == false)
  {
    console.error('unable to load app settings file');
  }
  else
  {
    lastSchoolDataPath = settings.getSync('lastSchoolName');
  }
  const schoolDataPath = path.resolve(app.getPath('documents'),lastSchoolDataPath);
  //pass path to .net
  console.log('>> sending school data file path: ' + schoolDataPath);
  win.webContents.send('setDataFile',schoolDataPath);
  
  
}
//#endregion