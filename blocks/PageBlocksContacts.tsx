/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import { tp } from "../utils/tp"
import Image from "next/image"
import { ParallaxBanner } from "react-scroll-parallax"
import { theme } from "../theme"
import { Block, BlockFields } from "../components/Block/Block"
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text"
import { PageBlocksContacts } from "../tina/__generated__/types"
import { isDefined } from "../utils/hooks/isDefined"

const Contacts: React.FC<PageBlocksContacts> = ({
  id,
  title,
  richText,
  contacts,
}) => (
  <Block id={id}>
    <ParallaxBanner
      css={css`
        background-color: ${theme.color.brand};
      `}
      layers={[
        {
          image: "/images/sky_footer.webp",
          speed: 0.2,
        },
      ]}
    >
      <div
        css={css`
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          max-width: 800px;
          height: 100%;
          margin: 0 auto;
          padding: 0 16px;
        `}
      >
        <h2
          css={css`
            font-size: ${theme.font.sizes[2]};
            font-family: skautbold;
            text-align: center;
            color: ${theme.color.brand};
            margin-bottom: 4px;
          `}
        >
          {title}
        </h2>
        <TinaMarkdown content={richText} />
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          {(contacts ?? []).filter(isDefined).map((contact) => (
            <a
              key={contact.type}
              href={getHref(contact.url)}
              rel="noreferrer noopener"
              title={contact.type}
            >
              <Image
                css={css`
                  width: 3em;
                  height: 3em;
                  margin-right: 8px !important;
                `}
                src={`/insomnia/icons/${contact.icon}.svg`}
                alt=""
                width={70}
                height={70}
              />
            </a>
          ))}
        </div>
      </div>
    </ParallaxBanner>
  </Block>
)

const getHref = (url: string): string =>
  url.includes("@") ? `mailto:${url}` : url

export default Contacts
