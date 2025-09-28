const { contextBridge, ipcRenderer } = require('electron');
const { ConnectionBuilder } = require('electron-cgi');
//const { settings } = require('electron-settings');

contextBridge.exposeInMainWorld('appAPI', 
{
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  connBuilder: () => new ConnectionBuilder(),
  onSetDataFile: (callback) => ipcRenderer.on('setDataFile', (_event,filePath) => callback(filePath))
  // we can also expose variables, not just functions
})