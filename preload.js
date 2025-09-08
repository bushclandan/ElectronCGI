const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('appAPI', {
    toggleDarkModeTheme: () => ipcRenderer.invoke('dark-mode:toggle'),
    systemDarkModeTheme: () => ipcRenderer.invoke('dark-mode:system'),
    addItem: (item) => ipcRenderer.invoke('add-item', item)
  })