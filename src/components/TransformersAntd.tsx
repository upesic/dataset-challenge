import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTransformersAsync, setRegionFilter, setSearchResults } from '../store/slices/transformerSlice';
import type { Option } from '../types';
import Spinner from './Spinner';
import SearchInput from './SearchInput';
import ChartWrapper from './ChartWrapper';
import { Table } from "antd";
import { Select } from "antd";

const TransformersAntd = () => {
  const dispatch = useAppDispatch();
  const { data, searchResults, regionFilter, isLoading, error, searchValue } = useAppSelector(state => state.transformers);

  useEffect(() => {
    dispatch(fetchTransformersAsync())
  }, []);

  useEffect(() => {
    dispatch(setSearchResults(data));
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


  const handleSearchSubmit = (value: string) => {
    if (value.trim() === "") {
      dispatch(setSearchResults(data));
    } else {
      const filtered = data.filter((transformer) => {
        return transformer.name.toLowerCase().includes(value.toLowerCase());
      });
      dispatch(setSearchResults(filtered));
    }
  };

  const handleRegionChange = (val: string) => {
    dispatch(setRegionFilter(val))
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'Health',
      dataIndex: 'health',
      key: 'health',
    },
  ];

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className='mt-2'>{error}</p>
      ) : (
        <div className='flex flex-col gap-6'>
          <div className='flex justify-center flex-col'>
            <div className="flex mt-2 mb-4 gap-4">
              <SearchInput onSearch={handleSearchSubmit} placeholder={'Search by name...'} />
              <div className={'flex justify-between items-center gap-2'}>
                <label>Filter</label>
                <Select options={filterOptions} value={regionFilter} onChange={handleRegionChange} className={'w-[125px]'} />
              </div>
            </div>
            <Table
              dataSource={filteredResults}
              columns={columns}
              size={"middle"}
              pagination={false}
              rowKey={'assetId'}
              className='transformers-table'
            />
          </div>
          {data.length > 0 && <ChartWrapper data={data} />}
        </div>
      )}
    </>

  )
}

export default TransformersAntd;