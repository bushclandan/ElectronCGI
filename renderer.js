const { ConnectionBuilder } = require('electron-cgi');

let connection = new ConnectionBuilder()
    .connectTo('dotnet', 'build', '--project', 'ElectronCgiConsole')
    .build();

connection.onDisconnect = () => 
{
    console.error('Connection lost between node and .net');
}

connection.send('greeting', 'Dan', response =>
    {
        console.error(response);
        connection.close();
    }
);

document.getElementById('banner').innerText = "Welcome";

document.getElementById('button').addEventListener('click', () => 
{
    window.alert('Hello back!');
});