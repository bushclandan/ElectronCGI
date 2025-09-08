using ElectronCgi.DotNet;

var connection = new ConnectionBuilder()
    .WithLogging()
    .Build();

connection.On<string, string>("greeting", name =>
{
    return $"Hello {name}";
});

connection.Listen();