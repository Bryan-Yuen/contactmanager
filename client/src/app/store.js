import { configureStore} from "@reduxjs/toolkit"
import contactsSliceReducer from "../features/contactsSlice"
import searchResultsSliceReducer from "../features/searchResultsSlice"

export const store = configureStore({
  reducer: {
    contacts: contactsSliceReducer,
    searchResults: searchResultsSliceReducer
  }
})