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
  selectedIds: number[]
}

const initialState: TransformersState = {
  data: [],
  searchResults: [],
  regionFilter: 'All',
  isLoading: false,
  error: '',
  searchValue: '',
  selectedIds: []
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
    setSelectedIds: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.selectedIds = state.selectedIds.includes(id) ? state.selectedIds.filter(i => i !== id) : [...state.selectedIds, id];
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
        state.selectedIds = [];
      })
      .addCase(fetchTransformersAsync.fulfilled, (state, action: PayloadAction<Transformer[]>) => {
        state.error = '';
        state.isLoading = false;
        state.data = action.payload;
        state.searchResults = action.payload;

        if (state.selectedIds.length === 0) {
          state.selectedIds = action.payload.map(t => t.assetId);
        }
      });
  }
});

export const { setSearchResults, setRegionFilter, resetState, setSearchValue, setSelectedIds } = transformersSlice.actions;
export default transformersSlice.reducer;
