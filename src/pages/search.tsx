import { CustomPagination } from "src/components/Sheard/algolia/Pagination";
import { CommonContainer } from "src/components/Sheard/CommonContainer";

import { Hits } from "../components/Sheard/algolia/Hits";
import { SearchBox } from "../components/Sheard/algolia/SearchBox";

const SearchPage = () => {
  return (
    <CommonContainer>
      <SearchBox />
      <Hits />
      <CustomPagination />
    </CommonContainer>
  );
};

export default SearchPage;
