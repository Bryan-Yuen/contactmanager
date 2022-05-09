import {createSlice} from "@reduxjs/toolkit"

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    value: []
  },
  reducers: {
    updateContacts: (state, action) => {
      state.value = action.payload
    }
  }
})

export const {updateContacts} = contactsSlice.actions

export default contactsSlice.reducer