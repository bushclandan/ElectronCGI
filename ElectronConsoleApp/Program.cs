using ElectronCgi.DotNet;

Console.Error.WriteLine("starting .net process");

var connection = new ConnectionBuilder()
					.WithLogging()
					.Build();

// expects a request named "greeting" with a string argument and returns a string
connection.On<string, string>("greeting", name =>
{
	connection.Send("statusChanged", $"received {name} from node");
	Console.Error.WriteLine($"received {name} from node");
	return $"Hello {name}";
});

// wait for incoming requests
connection.Listen();

