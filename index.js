const { app, BrowserWindow, ipcMain, nativeTheme, Menu } = require('electron');
const path = require('node:path')
let mainWindow;

//#region APP LEVEL methods
function createMainWindow() 
{
    mainWindow = new BrowserWindow(
        {
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                nodeIntegration: true
              }
        }
    )  
    mainWindow.loadFile('mainWindow.html');

    // Quit app when closed
    mainWindow.on('closed', function()
    {
        app.quit();
    });
}

app.whenReady().then(() =>
    {
        createMainWindow();

        app.on('activate', () => 
            {
                if (BrowserWindow.getAllWindows().length === 0) 
                {
                    createMainWindow();
                }
            }
        )
        
        // Build menu from template
        const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    
        // Insert menu
        Menu.setApplicationMenu(mainMenu);
    }
)

app.on('window-all-closed', () =>
    {
        if (process.platform !== 'darwin') app.quit;
    }
)
//#endregion
  
//#region MENU TEMPLATES
const mainMenuTemplate =  [
    // Each object is a dropdown
    {
      label: 'File',
      submenu:[
        {
          label:'Add Item',
          click(){
            createAddWindow();
          }
        },
        {
          label:'Clear Items',
          click(){
            mainWindow.webContents.send('item:clear');
          }
        },
        {
          label: 'Quit',
          accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click(){
            app.quit();
          }
        }
      ]
    }
  ];