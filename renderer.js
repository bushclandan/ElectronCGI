let information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${appAPI.chrome()}), Node.js (v${appAPI.node()}), and Electron (v${appAPI.electron()})`
information.innerText = "This is where the filepath will appear";

let _connection = null;
let mruDataPath = null;

function setupConnectionToRestartOnConnectionLost() {    
    _connection = appAPI.connBuilder()
                .connectTo('dotnet', 'run', '--project', 'ElectronConsoleApp')
                .build();
    
    _connection.onDisconnect = () => {
        logMessage('Connection lost, restarting...');
        setupConnectionToRestartOnConnectionLost();
    };
}

const appSettings = appAPI.settings;

//#region page startup functions
setupConnectionToRestartOnConnectionLost();
getSchoolName();
getSessionProgress();

//#endregion

//#region general functions
function logMessage(message)
{
    console.log(message);
    // _connection.log(message);
}
//#endregion

//#region page element event listeners
const btnTestSendMessage = document.getElementById('btnTestSendMessage');
btnTestSendMessage.addEventListener('click', () => 
    {        
        let msgText = document.getElementById('txtMessage').value;
        sendMessageToNet(msgText);
    });

const btnTestSessionProgress = document.getElementById('btnTestSessionProgress');
btnTestSessionProgress.addEventListener('click', () =>
    {
        getSessionProgress();
    });

//#end region

//#region ipcMain process handlers
window.appAPI.onSetDataFile((filePath) =>
{
    logMessage('   << loading school data from ' + filePath);
    information.innerText = filePath;
});
//#endregion

//#region .net call functions
function sendMessageToNet(message)
{
    logMessage('>> sending ' + message + ' to .net');
    _connection.send('greeting', message, (error, response) => {
        logMessage('   << received ' + response + ' from .net' ); 
        document.getElementById('txtMessageResponse').value = response;   
    });
}

function getSchoolName()
{
    _connection.send('getSchoolName', null, (error, response) => {
        logMessage('>> startup: getting school name');
        logMessage('   << received ' + response + ' from .net');
        document.getElementById('txtSchoolName').value = response;
    })
}

function getSessionProgress()
{
    _connection.send('getSessionProgress', null, (error, response) => {
        logMessage('>> startup: getting session progress');
        logMessage('   << received ' + response + ' from .net');
        document.getElementById('progressBar').style.width = response;
    })
}
//#endregion

//#region callback funtions
_connection.on('statusChanged', statusMsg => {
    logMessage('   << Message from .Net: ' + statusMsg);
})

//#endregion
