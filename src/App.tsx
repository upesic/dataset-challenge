import { useEffect, useMemo, useState } from 'react';
import type { Transformer, Option } from './types';
import TransformerTable from './components/TransformerTable';
import SearchInput from './components/SearchInput';
import Spinner from './components/Spinner';
import ChartWrapper from './components/ChartWrapper';
import SelectField from './components/SelectField';
import { fetchTransformers } from './lib/api';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Transformer[]>([]);
  const [error, setError] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Transformer[]>([]);
  const [regionFilter, setRegionFilter] = useState<string>(localStorage.getItem('filterValue') || 'All');

  useEffect(() => {
    fetchTableData();
  }, []);

  useEffect(() => {
    setSearchResults(data);
    const searchValue: string = localStorage.getItem('searchValue') || '';
    if (searchValue) {
      handleSearchSubmit(searchValue);
    }
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
      setIsLoading(true);
      const response = await fetchTransformers()
      setData(response);
    } catch (error) {
      setError(`Error: ${error}`)
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSearchSubmit = (value: string) => {
    if (value.trim() === "") {
      setSearchResults(data);
    } else {
      const filtered = data.filter((transformer) => {
        return transformer.name.toLowerCase().includes(value.toLowerCase());
      });
      setSearchResults(filtered);
    }
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setRegionFilter(val);
    localStorage.setItem('filterValue', val);
  };

  return (
    <div className={'min-h-screen flex p-4 justify-center'}>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className='mt-2'>{error}</p>
      ) : (
        <div className='flex flex-col gap-6'>
          <div className='flex justify-center flex-col'>
            <div className="flex justify-between items-center mt-2 mb-4">
              <SearchInput onSearch={handleSearchSubmit} placeholder={'Search by name...'} />
              <div className={'flex justify-between gap-2'}>
                <SelectField
                  name={'filter'}
                  label={'Filter by region'}
                  value={regionFilter}
                  onSelectChange={handleRegionChange}
                  labelClassName={'font-semibold'}
                  options={filterOptions}
                />
              </div>

            </div>
            <TransformerTable data={filteredResults} />
          </div>
          {data.length > 0 && <ChartWrapper data={data} />}
        </div>
      )}
    </div>
  );
};

export default App;
