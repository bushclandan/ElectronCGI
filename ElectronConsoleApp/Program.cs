using ElectronCgi.DotNet;
using Microsoft.Extensions.Logging;

Console.Error.WriteLine("starting .net process");

var connection = new ConnectionBuilder()
					.WithLogging(minimumLogLevel: LogLevel.Trace, logFilePath: "the-log-file.txt")
					.Build();

// greeting
connection.On<string, string>("greeting", name =>
{
	connection.Send("statusChanged", $"received {name} from node");
	Console.Error.WriteLine($"received {name} from node");
	return $"Hello {name}";
});

//get School Name
connection.On<string, string>("getSchoolName", value =>
{
	connection.Send("statusChanged", $"received request for school name from node");
	Console.Error.WriteLine($"received request for school name from node");
	return $"Gatepost School";
});

// get School session progress
// returns a formatted string with session percentage (i.e. 73%)
connection.On<string, string>("getSessionProgress", value =>
{
	Random random = new Random(DateTime.Now.Millisecond);
	
	connection.Send("statusChanged", $"received request for sessionProgress from node");
	Console.Error.WriteLine($"received request for sessionProgress from node");
	return $"{random.Next(5,95)}%";
});

// wait for incoming requests
connection.Listen();

