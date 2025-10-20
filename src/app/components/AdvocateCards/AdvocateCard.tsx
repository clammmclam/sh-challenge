import { Advocate } from "@/app/shared/types";
import React from "react";
import styled from "styled-components";

const StyledAdvocateCard = styled.div`
  border: 1px solid black;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  width: 100%;
  h2 {
    margin: 0 0 8px 0;
    font-weight: bold;
  }
`;

const StyledAdvocateCardDetails = styled.dl`
  display: block;

  dt {
    margin-top: 8px;
    font-weight: bold;
  }

  dt:first-of-type {
    margin-top: 0;
  }
`;

type AdvocateCardProps = {
  advocate: Advocate;
};

function AdvocateCard({ advocate }: AdvocateCardProps) {
  return (
    <StyledAdvocateCard
      key={`${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}`}
    >
      <StyledAdvocateCardDetails>
        <dt>Name:</dt>
        <dd>
          {advocate.firstName} {advocate.lastName}
        </dd>

        <dt>City:</dt>
        <dd>{advocate.city}</dd>

        <dt>Degree:</dt>
        <dd>{advocate.degree}</dd>

        <dt>Specialties:</dt>
        <dd>{advocate.specialties.join(", ")}</dd>

        <dt>Years of Experience:</dt>
        <dd>{advocate.yearsOfExperience}</dd>

        <dt>Phone Number:</dt>
        <dd>{advocate.phoneNumber}</dd>
      </StyledAdvocateCardDetails>
    </StyledAdvocateCard>
  );
}
export default React.memo(AdvocateCard);
