import { useEffect, useState, useTransition } from 'react';

const App = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    startTransition(() => {
      fetchTableData();
    })
  }, []);


  const fetchTableData = async () => {
    try {
      const response = await fetch("http://localhost:8000/sampledata/");
      const jsonResponse = await response.json();
      setData(jsonResponse);
    } catch (error) {
      setError(error)
      console.error(error);
      return Promise.reject(error);
    }
  };

  return (
    <>
      <div className={'text-amber-300 font-bold'}>
        {isPending && <p>Loading data...</p>}
        {error && <p>Error while fetching data</p>}
        {
          <ul>
            {data.map(item => (
              <li key={item.assetId}>{item.name}</li>
            ))}
          </ul>
        }
        App is running
      </div>

    </>
  )
}

export default App
