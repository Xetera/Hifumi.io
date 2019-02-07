import * as React from "react";
import { Layout } from "../layouts/layout";
import { LandingPanel } from "../components/landing/landing_panel";
import { SiteFooter } from "../components/outro/footer";
import { SiteIntro } from "../components/intro/intro";
import { MarkdownGirl } from "../components/girls/girls";
import { graphql } from "gatsby";
import { MarkdownTweet } from "../components/intro/twitter/tweet";
import { GirlsQuery, IndexProps, TweetMetadata, TweetsQuery, UsersQuery } from "../types";

export default ({ data: { girls, tweets, users } }: IndexProps) => {
  const allTweets = tweets.edges.map(tweet => ({
    ...tweet.node.frontmatter,
    html: tweet.node.html
  }));

  const allGirls = girls.edges.map(item => ({
    ...item.node.frontmatter,
    html: item.node.html
  }));

  const allUsers: TweetMetadata = users.edges.reduce((all, { node: { frontmatter } }) => ({
    ...all,
    [frontmatter.name]: {
      ...frontmatter,
      avatar: frontmatter.avatar.childImageSharp.fixed
    }
  }), {});

  const tweetInfo = allTweets.map(tweet => ({ ...tweet, ...allUsers[tweet.name] }));

  return (
    <Layout>
      <LandingPanel/>
      <SiteIntro>
        {tweetInfo.map(tweet => <MarkdownTweet {...tweet}/>)}
      </SiteIntro>
      {allGirls.map(girl => <MarkdownGirl {...girl}/>)}
      <SiteFooter/>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    girls: allMarkdownRemark(
      sort: {order: ASC, fields: [frontmatter___order]}
      filter: {fileAbsolutePath: {regex: "/\/girls\//"}}
    ) {
      edges {
        node {
          html
          frontmatter {
            color
            name
            quote
            strengths
            weaknesses
          }
        }
      }
    }
    tweets: allMarkdownRemark(
      sort: {order: ASC, fields: [frontmatter___date]}
      # filtering only the first level markdown files
      filter: {fileAbsolutePath: {regex: "/\/tweets\/[^/]+.md/"}}
    ) {
      edges {
        node {
          html
          frontmatter {
            name
            hashtags
            date
            retweets
            likes
          }
        }
      }
    }
    users:  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/tweets/users/[^/]+.md/"}}) {
      edges {
        node {
          frontmatter {
            name
            verified
            tag
            avatar {
              childImageSharp {
                fixed (width: 64 height:64 quality: 100) {
                  ...GatsbyImageSharpFixed_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;
