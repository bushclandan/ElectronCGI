let information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${appAPI.chrome()}), Node.js (v${appAPI.node()}), and Electron (v${appAPI.electron()})`
information.innerText = "This is where the filepath will appear";

let _connection = null;
let mruDataPath = null;

function setupConnectionToRestartOnConnectionLost() {    
    _connection = appAPI.connBuilder().connectTo('dotnet', 'run', '--project', 'ElectronConsoleApp').build();     
    _connection.onDisconnect = () => {
        console.log('Connection lost, restarting...');
        setupConnectionToRestartOnConnectionLost();
    };
}

const appSettings = appAPI.settings;

//#region page startup functions
setupConnectionToRestartOnConnectionLost();
getSchoolName();
getSessionProgress();

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
    console.log('   << loading school data from ' + filePath);
    information.innerText = filePath;
});
//#endregion

//#region .net call functions
function sendMessageToNet(message)
{
    console.log('>> sending ' + message + ' to .net');
    _connection.send('greeting', message, (error, response) => {
        console.log('   << received ' + response + ' from .net' ); 
        document.getElementById('txtMessageResponse').value = response;   
    });
}

function getSchoolName()
{
    _connection.send('getSchoolName', null, (error, response) => {
        console.log('>> startup: getting school name');
        console.log('   << received ' + response + ' from .net');
        document.getElementById('txtSchoolName').value = response;
    })
}

function getSessionProgress()
{
    _connection.send('getSessionProgress', null, (error, response) => {
        console.log('>> startup: getting session progress');
        console.log('   << received ' + response + ' from .net');
        document.getElementById('progressBar').style.width = response;
    })
}
//#endregion

//#region callback funtions
_connection.on('statusChanged', statusMsg => {
    console.log('   << Message from .Net: ' + statusMsg);
})

//#endregion
