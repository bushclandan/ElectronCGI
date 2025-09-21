const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${appAPI.chrome()}), Node.js (v${appAPI.node()}), and Electron (v${appAPI.electron()})`

const connection = new appAPI.connBuilder().connectTo('dotnet', 'run', '--project', 'ElectronConsoleApp').build();