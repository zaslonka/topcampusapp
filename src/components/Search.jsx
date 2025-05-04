import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useConfig } from '../context/ConfigContext';

const Search = () => {
  const [query, setQuery] = useState("");
  const config = useConfig();
  const s = config.searchConfig;
  const apiConfig = config.apiConfig;

  const getReferrerBaseUrl = () => {
    try {
      const referrerUrl = new URL(document.referrer);
      return `${referrerUrl.protocol}//${referrerUrl.host}`;
    } catch (error) {
      console.warn("Referrer not available or invalid. Using hosted origin.");
      return window.location.origin;
    }
  };

  const handleSearch = () => {
    const searchTextParam = query.trim()
      ? `?searchText=${encodeURIComponent(query)}`
      : `?searchText=`;

    const baseUrl = apiConfig.isFullUrl ? apiConfig.searchUrl : `${getReferrerBaseUrl()}${apiConfig.searchUrl}`;
    const searchEndpoint = `${baseUrl}${searchTextParam}${apiConfig.queryParameter}`;
    window.top.location.href = searchEndpoint; // Open the search result in the topmost context
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={s.inputGroup}>
      <span style={s.inputGroupText}>
        <FaSearch style={s.icon} />
      </span>
      <input
        type="text"
        placeholder="Søg i kataloget..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        style={s.input}
      />
      <button onClick={handleSearch} style={s.button}>
        Søg
      </button>
    </div>
  );
};

export default Search;