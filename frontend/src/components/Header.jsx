import React, { useState } from 'react';

const Header = ({ handleSearch,handleLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update search term state
    handleSearch(value); // Trigger search with the updated search term
  };

  return (
    <div className='header'>
      <h1 className='title'>WriteIT</h1>
      <input
        type="text"
        placeholder="Search Note..."
        value={searchTerm}
        onChange={handleChange}
        className="searchInput"
      />
      <button className='note_logout' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
