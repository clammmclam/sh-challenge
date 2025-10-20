import { Advocate } from "@/app/shared/types";
import React from "react";
import AdvocateCard from "./AdvocateCard";
import styled from "styled-components";

const StyledCardsLayout = styled.div`
  display: block;
  margin: 0 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

type AdvocateCardsProps = {
  advocates: Advocate[];
};

function AdvocateCards({ advocates }: AdvocateCardsProps) {
  return (
    <StyledCardsLayout>
      {advocates.map((advocate) => (
        <AdvocateCard key={`${advocate.id}`} advocate={advocate} />
      ))}
    </StyledCardsLayout>
  );
}

export default React.memo(AdvocateCards);
