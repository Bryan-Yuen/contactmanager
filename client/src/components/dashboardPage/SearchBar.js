import React, {useState, useEffect} from 'react'
import { updateSearchResults } from '../../features/searchResultsSlice'
import {useSelector, useDispatch} from 'react-redux'

export default function SearchBar() {
  const [search, setSearch] = useState()

  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.value)

  useEffect(() => {
    const results = contacts.filter(data =>
      (data.contactName).toLowerCase().includes(search) ||
      (data.contactPhoneNumber).toLowerCase().includes(search) || (data.contactEmail).toLowerCase().includes(search)
    );
    dispatch(updateSearchResults(results))
  }, [search])

  return (
    <input type="text" class="form-control searchBar" id="" placeholder="Search" onChange={e => setSearch(e.target.value)}></input>
  );
}
