import type { NextPage } from "next";
import { Hits } from "src/components/Sheard/algolia/Hits";
import { CustomPagination } from "src/components/Sheard/algolia/Pagination";
import { SearchBox } from "src/components/Sheard/algolia/SearchBox";
import { CommonContainer } from "src/components/Sheard/CommonContainer";

const SearchPage: NextPage = () => {
  return (
    <CommonContainer>
      <SearchBox />
      <Hits />
      <CustomPagination />
    </CommonContainer>
  );
};

export default SearchPage;
