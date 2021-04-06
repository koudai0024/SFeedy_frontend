import algoliasearch from "algoliasearch";

// ===================================
// algoliaの設定
// ===================================
export const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_KEY
);
