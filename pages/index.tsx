/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react"
import type { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import React from "react"
import { useTina } from "tinacms/dist/react"
import { Navigation, NavigationItem } from "../components/Navigation/Navigation"
import { fonts } from "../fonts"
import { globalStyles } from "../globalStyles"
import { theme } from "../theme"
import client from "../tina/__generated__/client"
import {
  NavigationQuery,
  NavigationQueryVariables,
  PageQuery,
  PageQueryVariables,
  SettingsQuery,
  SettingsQueryVariables,
} from "../tina/__generated__/types"

interface HomeProps {
  pages: {
    data: PageQuery
    variables: PageQueryVariables
    query: string
  }
  navigation: {
    data: NavigationQuery
    variables: NavigationQueryVariables
    query: string
  }
  settings: {
    data: SettingsQuery
    variables: SettingsQueryVariables
    query: string
  }
}

const Home: NextPage<HomeProps> = ({ pages, navigation, settings }) => {
  const pagesData = useTina({
    query: pages.query,
    variables: pages.variables,
    data: pages.data,
  })
  const navigationData = useTina({
    query: navigation.query,
    variables: navigation.variables,
    data: navigation.data,
  })
  const settingsData = useTina({
    query: settings.query,
    variables: settings.variables,
    data: settings.data,
  })

  return (
    <div>
      <Head>
        <title>{settingsData.data.settings.siteTitle}</title>
        <meta
          name="description"
          content="Pojeď na Insomnii a pohlédni všem oblastem vedení přímo do očí. Těšíme se na tebe!"
        />

        <link rel="icon" href="/favicons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color={theme.color.brand}
        />
        <meta name="msapplication-TileColor" content={theme.color.background} />
        <meta name="theme-color" content={theme.color.background} />

        <link rel="preconnect" href="https://cdn.skauting.cz" />
      </Head>

      <Global styles={fonts} />
      <Global styles={globalStyles} />

      <main
        css={css`
          min-height: 300vh;
          padding-top: 96px;
        `}
      >
        <Navigation
          logo="/images/logo.webp"
          items={(navigationData.data.navigation.items ?? []).map((item) => ({
            title: item?.title ?? "",
            link: item?.link ?? "",
          }))}
        />
        {(pagesData.data.page.blocks ?? []).map((block, i) => {
          const Component = dynamic(
            () => import(`../blocks/${block?.__typename}`)
          )
          console.log(Component)
          return React.createElement(Component, { ...block, key: i })
        })}
      </main>
    </div>
  )
}

export const getServerSideProps = async (): Promise<{ props: HomeProps }> => {
  const pages = await client.queries.page({
    relativePath: `index.mdx`,
  })

  const navigation = await client.queries.navigation({
    relativePath: "navigation.json",
  })

  const settings = await client.queries.settings({
    relativePath: "settings.json",
  })

  return { props: { pages, navigation, settings } }
}

export default Home
