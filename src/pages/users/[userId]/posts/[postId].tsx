import axios from "axios";
import cheerio from "cheerio";
import { format } from "date-fns";
import hljs from "highlight.js";
import marked from "marked";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import type { VFC } from "react";

type Props = {
  post: PostType;
};

const PostPage: VFC<Props> = (props) => {
  const post = props.post;

  marked.setOptions({
    headerIds: false,
  });
  const $ = cheerio.load(marked(post?.body || ""));
  $("a").each((_, elm) => {
    $(elm).attr("rel", "noopener noreferrer");
    $(elm).attr("target", "_blank");
  });
  $("img").each((_, elm) => {
    $(elm).attr("loading", "lazy");
    $(elm).attr("width", "1000");
    $(elm).attr("height", "1000");
  });
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });
  return (
    <>
      <Head>
        <title>{post.title} | SFeedy - 簡単に始められる技術ブログ</title>
        <meta
          name="description"
          content={marked(post.body)
            .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
            .substr(0, 150)}
        />
        <meta
          property="og:title"
          content={`${post.title} | SFeedy - 簡単に始められる技術ブログ`}
        />
        <meta
          property="og:description"
          content={marked(post.body)
            .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
            .substr(0, 150)}
        />
      </Head>
      <div>
        <div className="w-full xl:w-11/12 max-w-screen-xl text-center mx-auto mt-4 md:mt-8 mb-3 md:mb-6 px-2 xl:px-0">
          <h1 className="inline-block text-xl md:text-3xl font-bold text-left mb-2 md:mb-4">
            {post?.title}
          </h1>
          <p className="text-xs md:text-base font-bold mb-1 md:mb-2">
            <Link href="/users/[userId]" as={`/users/${post.userId}`}>
              {post?.user.name}
            </Link>
          </p>
          <p className="text-xs md:text-base text-gray-800">
            {format(new Date(post?.createdAt || ""), "yyyy年M月d日")}
          </p>
        </div>
        <div
          className="markdown-body bg-white w-full max-w-screen-xl mx-auto shadow px-1 md:px-2 py-2 md:py-4"
          dangerouslySetInnerHTML={{ __html: $.html() }}
        ></div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("/api/v1/posts?limit=-1");
  const { posts } = await res.data;
  const paths: Array<string> = posts.map((repo: UserType) => {
    return `/users/[userId]/posts/${repo.id}`;
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = await axios.get(`/api/v1/posts/${ctx.params?.postId}`);
  const post = await res.data;
  return {
    props: { post },
    revalidate: 60,
  };
};

export default PostPage;
