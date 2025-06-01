import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Transformer } from '../../types/index';
import { fetchTransformers } from '../../lib/api';

interface TransformersState {
  data: Transformer[];
  searchResults: Transformer[];
  regionFilter: string;
  isLoading: boolean;
  error: any;
  searchValue: string;
}

const initialState: TransformersState = {
  data: [],
  searchResults: [],
  regionFilter: 'All',
  isLoading: false,
  error: '',
  searchValue: ''
};

export const fetchTransformersAsync = createAsyncThunk(
  'transformers/fetchTransformers',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchTransformers();
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const transformersSlice = createSlice({
  name: 'transformers',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<Transformer[]>) => {
      state.searchResults = action.payload;
    },
    setRegionFilter: (state, action: PayloadAction<string>) => {
      state.regionFilter = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      state.searchValue = action.payload;
    },
    resetState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransformersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransformersAsync.rejected, (state, action: PayloadAction<any>) => {
        state.data = initialState.data;
        state.searchResults = initialState.searchResults;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTransformersAsync.fulfilled, (state, action: PayloadAction<Transformer[]>) => {
        state.error = '';
        state.isLoading = false;
        state.data = action.payload;
        state.searchResults = action.payload;
      });
  }
});

export const { setSearchResults, setRegionFilter, resetState, setSearchValue } = transformersSlice.actions;
export default transformersSlice.reducer;
