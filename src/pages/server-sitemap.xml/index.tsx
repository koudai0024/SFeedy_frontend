import axios from "axios";
import type { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const urls: PostType[] = await (await axios("/api/v1/posts?limit=-1")).data
    .posts;

  const posts = urls.map((post) => {
    const result = {
      loc: `${process.env.SITE_URL}/users/${post.userId}/posts/${post.id}`,
      lastmod: post.createdAt,
    };
    return result;
  });

  const fields = [...posts];

  return getServerSideSitemap(ctx, fields);
};

const sitemap = () => {
  return null;
};
export default sitemap;
