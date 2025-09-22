// See https://aka.ms/new-console-template for more information
using ElectronCgi.DotNet;

Console.Error.WriteLine("starting .net process");

var connection = new ConnectionBuilder()
					.WithLogging()
					.Build();

// expects a request named "greeting" with a string argument and returns a string
connection.On<string, string>("greeting", name =>
{
	Console.Error.WriteLine($"received {name}");
	return $"Hello {name}";
});

// wait for incoming requests
connection.Listen();

