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
        alert('Connection lost, restarting...');
        setupConnectionToRestartOnConnectionLost();
    };
}

setupConnectionToRestartOnConnectionLost();

console.log(">> sending Dan to .net");
_connection.send('greeting', 'Dan', greeting => {
    console.log("   << received " + greeting + " from .net" ); // will print "Hello Dan!"  
});

_connection.on('statusChanged', statusMsg => {
    //console.clear();
    console.log("   << .Net status changed to " + statusMsg);
})
