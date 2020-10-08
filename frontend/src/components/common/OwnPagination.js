import React from "react";
import { Pagination } from "semantic-ui-react";

const OwnPagination = ({ leadsPerPage, totalLeads, paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalLeads / leadsPerPage); i++) {
    pageNumber.push(i);
  }
  let active = 1;
  return (
    <Pagination
      defaultActivePage={active}
      onPageChange={(event, data) => {
        active = data.activePage;
        paginate(data.activePage);
      }}
      totalPages={pageNumber.length}
    />
  );
};
export default OwnPagination;
