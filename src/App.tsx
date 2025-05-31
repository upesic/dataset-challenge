import { useEffect, useState, useTransition } from 'react';
import type { Transformer } from './types';
import TransformerTable from './components/TransformerTable';
import SearchInput from './components/SearchInput';
import Spinner from './components/Spinner';

const App = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<Transformer[]>([]);
  const [error, setError] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Transformer[]>([]);

  useEffect(() => {
    startTransition(() => {
      fetchTableData();
    })
  }, []);

  useEffect(() => {
    setSearchResults(data);
  }, [data]);


  const fetchTableData = async () => {
    try {
      const response = await fetch("http://localhost:8000/sampledata/");
      const jsonResponse = await response.json();
      setData(jsonResponse);
    } catch (error) {
      setError(`Error while fetching data: ${error}`)
      return Promise.reject(error);
    }
  };


  const handleSearchSubmit = (term: string) => {
    if (term.trim() === "") {
      setSearchResults(data);
    } else {
      const filtered = data.filter((transformer) => {
        return transformer.name.toLowerCase().includes(term.toLowerCase());
      });
      setSearchResults(filtered);
    }
  };

  return (
    <>
      <div className={'min-h-screen flex p-4 justify-center'}>
        {isPending && <Spinner />}
        {error && <p className='mt-2'>{error}</p>}
        {
          <>
            <div>
              <div className="flex justify-between items-center mt-2 mb-4">
                <SearchInput onSearch={handleSearchSubmit} placeholder={'Search by name...'} />
              </div>
              <TransformerTable data={searchResults} />
            </div>
          </>
        }
      </div>
    </>
  )
}

export default App
