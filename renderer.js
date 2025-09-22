const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${appAPI.chrome()}), Node.js (v${appAPI.node()}), and Electron (v${appAPI.electron()})`

let cb = new appAPI.connBuilder();
const connection = cb.connectTo('dotnet', 'run', '--project', 'ElectronConsoleApp').build();

connection.onDisconnect = () => {
    alert('Connection lost, restarting...');
    connection = cb.connectTo('dotnet', 'run', '--project', 'ElectronConsoleApp').build();
};

connection.send('greeting', 'Dan', greeting => {
    console.error(greeting); // will print "Hello Dan!"  
});