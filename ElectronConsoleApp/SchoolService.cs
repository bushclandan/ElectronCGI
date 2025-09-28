
public class SchoolService
{
    private string _dataPath = String.Empty;
    public SchoolService()
    {
        
    }

    public SchoolService(string dataPath)
    {
        if (!Path.Exists(dataPath))
        {
            throw new FileNotFoundException($"specified data file {dataPath} does not exist");
        }
        _dataPath = dataPath;
    }
    
}