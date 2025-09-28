const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('fs');
const settings = require('electron-settings');

let dataPath = null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  })

  win.loadFile('index.html')
  
  // get app settings
  loadAppSettings();

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
  win.webContents.send('onLoadDataFile', schoolDataPath);
  console.log(schoolDataPath);

}
//#endregion