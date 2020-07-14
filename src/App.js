import React from 'react';
import './App.css';
import TagsAutocomplete from './components/TagsAutocomplete';
import data from './UserData.json';

function App() {

  return (
    <div className='row'>
        <div className='col'>
            <TagsAutocomplete suggestions={data} />
        </div>
    </div>
  );
}

export default App;
