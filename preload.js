const { contextBridge, ipcRenderer } = require('electron');
const { ConnectionBuilder } = require('electron-cgi');

contextBridge.exposeInMainWorld('appAPI', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  connBuilder: () => new ConnectionBuilder()
  // we can also expose variables, not just functions
})