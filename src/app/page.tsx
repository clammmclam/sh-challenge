"use client";

import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import AdvocateCards from "./components/AdvocateCards";
import { useAdvocates } from "./api/hooks/useAdvocates";
import AdvocatesTable from "./components/AdvocatesTable";
import SearchInput from "./components/SearchInput";
import React from "react";

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 4rem;
`;

const StyledSearchSectionContainer = styled.div`
  padding: 24px 24px 8px 24px;
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: ${({ theme }) => theme.breakpoints.xl};
    margin: 0 auto;
  }
`;

const StyledLoader = styled.p`
  margin: 0 24px;
`;

const StyledResultsContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-height: 70vh;
    overflow-y: auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: ${({ theme }) => theme.breakpoints.xl};
    margin: 0 auto;
  }
`;

const StyledResultsAmount = styled.p`
  display: block;
  margin-top: 2rem;
  margin-left: 0px;
  font-style: italic;
`;

const getSingleOrPluralWord = (count: number, word: string) => {
  return count === 1 ? word : `${word}s`;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const { advocates, isLoading } = useAdvocates(debouncedTerm);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleReset = React.useCallback(() => {
    setSearchTerm("");
  }, []);

  return (
    <main>
      <StyledSearchSectionContainer>
        <StyledTitle>Solace Advocates</StyledTitle>
        <SearchInput
          searchTerm={searchTerm}
          onChange={handleSearchChange}
          handleReset={handleReset}
        />
        <StyledResultsAmount>
          Showing {advocates.length}{" "}
          {getSingleOrPluralWord(advocates.length, "result")}
        </StyledResultsAmount>
      </StyledSearchSectionContainer>

      <StyledResultsContainer>
        {isLoading && <StyledLoader>Loading...</StyledLoader>}
        {!isLoading && advocates.length > 0 && (
          <>
            <AdvocatesTable advocates={advocates} />
            <AdvocateCards advocates={advocates} />
          </>
        )}
      </StyledResultsContainer>
    </main>
  );
}
