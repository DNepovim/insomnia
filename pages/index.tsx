/** @jsxImportSource @emotion/react */
import React from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { Navigation as NavigationType, Page, SiteMeta } from "../data"
import { Navigation } from "../components/Navigation/Navigation"
import { css, Global } from "@emotion/react"
import { globalStyles } from "../globalStyles"
import { blockDefs } from "../blocks/blocks"
import { BlockTemplates } from "../blocks/blockTemplates"
import { getMeta, getNavigation, getPage } from "../firebase/database"
import { PROJECT } from "../projects"
import { theme } from "../theme"
import { fonts } from "../fonts"

const Home: NextPage<Props> = ({ meta, navigation, page }) => (
  <div>
    <Head>
      <title>{meta.title}</title>
      <meta
        name="description"
        content="Pojeď na Insomnii a pohlédni všem oblastem vedení přímo do očí. Těšíme se na tebe!"
      />

      <link rel="icon" href={`/${PROJECT}/favicons/favicon.ico`} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`/${PROJECT}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/${PROJECT}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/${PROJECT}/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${PROJECT}/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`/${PROJECT}/safari-pinned-tab.svg`}
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
{/*       <Navigation logo={`/${PROJECT}/images/logo.webp`} items={navigation} /> */}
      {page.blocks
        .filter((block) => !!block && !block.isHidden)
        .map(({ template, fields }) =>
          React.createElement(
            blockDefs[template as BlockTemplates].component,
            fields
          )
        )}
    </main>
  </div>
)

export const getStaticProps = async () => ({
  props: {
    meta: (await getMeta()) ?? {},
    navigation: (await getNavigation()) ?? [],
    page: (await getPage("frontPage")) ?? [],
  },
})

interface Props {
  meta: SiteMeta
  navigation: NavigationType
  page: Page
}

export default Home
