const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${appAPI.chrome()}), Node.js (v${appAPI.node()}), and Electron (v${appAPI.electron()})`

// const cb = new appAPI.connBuilder();
// const connection = cb.connectTo('dotnet', 'run', '--project', 'ElectronConsoleApp').build();

// connection.onDisconnect = () => {
//     alert('Connection lost, restarting...');
//     connection = cb.connectTo('dotnet', 'run', '--project', 'ElectronConsoleApp').build();
// };
let _connection = null;

function setupConnectionToRestartOnConnectionLost() {    
    _connection = appAPI.connBuilder().connectTo('dotnet', 'run', '--project', 'ElectronConsoleApp').build();     
    _connection.onDisconnect = () => {
        console.log('Connection lost, restarting...');
        setupConnectionToRestartOnConnectionLost();
    };
}

setupConnectionToRestartOnConnectionLost();

btnMessage.addEventListener('click',() => 
    {
        const btnMessage = document.getElementById('btnMessage');
        let msgText = document.getElementById('txtMessage').value;
        sendMessageToNet(msgText);
    });

function sendMessageToNet(message)
{
    console.log('>> sending ' + message + ' to .net');
    _connection.send('greeting', message, response => {
        console.error('   << received ' + response + ' from .net' );    
    });
}


_connection.on('statusChanged', statusMsg => {
    //console.clear();
    console.log('   << .Net status changed to ' + statusMsg);
})
