import { useEffect, useMemo, useState, useTransition } from 'react';
import type { Transformer, Option } from './types';
import TransformerTable from './components/TransformerTable';
import SearchInput from './components/SearchInput';
import Spinner from './components/Spinner';
import ChartWrapper from './components/ChartWrapper';
import SelectField from './components/SelectField';

const App = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<Transformer[]>([]);
  const [error, setError] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Transformer[]>([]);
  const [regionFilter, setRegionFilter] = useState<string>('All');

  useEffect(() => {
    startTransition(() => {
      fetchTableData();
    })
  }, []);

  useEffect(() => {
    setSearchResults(data);
  }, [data]);

  const uniqueRegions = useMemo(() => {
    const regions = data.map(t => t.region);
    return ['All', ...Array.from(new Set(regions))];
  }, [data]);

  const filterOptions: Option[] = useMemo(() => {
    return uniqueRegions.map(region => (
      { value: region, label: region }
    ))
  }, [uniqueRegions]);

  const filteredResults = useMemo(() => {
    return searchResults.filter(t =>
      regionFilter === 'All' || t.region === regionFilter
    );
  }, [searchResults, regionFilter]);


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
            <div className='flex flex-col gap-6'>
              <div className='flex justify-center flex-col'>
                <div className="flex justify-between items-center mt-2 mb-4">
                  <SearchInput onSearch={handleSearchSubmit} placeholder={'Search by name...'} />
                  <div className={'flex justify-between gap-2'}>
                    <SelectField
                      name={'filter'}
                      label={'Filter by region'}
                      value={regionFilter}
                      onSelectChange={(e) => setRegionFilter(e.target.value)}
                      labelClassName={'font-semibold'}
                      options={filterOptions}
                    />
                  </div>

                </div>
                <TransformerTable data={filteredResults} />
              </div>
              {data.length > 0 && <ChartWrapper data={data} />}
            </div>
          </>
        }
      </div>
    </>
  )
}

export default App
