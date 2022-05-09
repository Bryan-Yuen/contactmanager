import {createSlice} from "@reduxjs/toolkit"

export const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: {
    value: []
  },
  reducers: {
    updateSearchResults: (state, action) => {
      state.value = action.payload
    }
  }
})

export const {updateSearchResults} = searchResultsSlice.actions

export default searchResultsSlice.reducer