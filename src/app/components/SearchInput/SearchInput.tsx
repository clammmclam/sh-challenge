import React from "react";
import styled from "styled-components";

const StyledSearchInput = styled.input`
  border: 1px solid black;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
`;

const StyledSearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const StyledResetButton = styled.button`
  position: absolute;
  right: 15px;
  top: 7px;
  font-size: 20px;
`;

type SearchInputProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset: () => void;
};

function SearchInput({ searchTerm, onChange, handleReset }: SearchInputProps) {
  return (
    <div>
      <p>
        Searching for: <span id="search-term"></span>
      </p>
      <StyledSearchContainer>
        <label htmlFor="search-input" className="sr-only">
          Search Input
        </label>
        <StyledSearchInput
          id="search-input"
          name="search-input"
          type="input"
          value={searchTerm}
          onChange={onChange}
        />
        {searchTerm.trim().length > 0 && (
          <StyledResetButton onClick={handleReset}>X</StyledResetButton>
        )}
      </StyledSearchContainer>
    </div>
  );
}

export default React.memo(SearchInput);
