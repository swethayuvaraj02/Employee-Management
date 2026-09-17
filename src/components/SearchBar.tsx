import type { ChangeEvent } from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;