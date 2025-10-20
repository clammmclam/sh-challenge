import { Advocate } from "@/app/shared/types";
import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    width: 100%;
    border-spacing: 1rem 2rem;
    text-align: center;

    th,
    td {
      padding: 0.75rem 1rem;
      min-width: 120px;
      width: 10%;
    }

    th:nth-child(5),
    td:nth-child(5) {
      width: 35%;
      max-width: 600px;
    }

    thead th {
      position: sticky;
      top: 0;
      background: ${({ theme }) => theme.colors.primary};
      color: #fff;
    }

    tbody td {
      border-bottom: 1px solid #ddd;
    }

    tbody td:nth-child(5) {
      text-align: left;
    }
  }
`;

type AdvocatesTableProps = {
  advocates: Advocate[];
};

function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate) => {
          return (
            <tr key={advocate.id}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>{advocate.specialties.join(", ")}</td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{advocate.phoneNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}

export default React.memo(AdvocatesTable);
