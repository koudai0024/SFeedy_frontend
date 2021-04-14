import type { VFC } from "react";
import type { Hit, HitsProvided } from "react-instantsearch-core";
import { connectHits } from "react-instantsearch-dom";
import { PostCard } from "src/components/Sheard/PostCard";

const HitsItem: VFC<HitsProvided<Hit<PostType>>> = ({ hits }) => {
  return (
    <div>
      {hits.map((hit) => {
        return <PostCard key={hit.id} post={hit} />;
      })}
    </div>
  );
};
const Hits = connectHits(HitsItem);
export { Hits };
