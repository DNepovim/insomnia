/** @jsxImportSource @emotion/react */
import React from "react"
import { css, Interpolation, Theme } from "@emotion/react"
import Image from "next/image"
import { ParallaxBanner } from "react-scroll-parallax"
import { theme } from "../theme"
import { Block } from "../components/Block/Block"
import { TinaMarkdown } from "tinacms/dist/rich-text"
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
          image: "/uploads/sky_footer.webp",
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
          padding: 4rem 0;
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
        <TinaMarkdown
          content={richText}
          components={{
            p: ({ children }) => (
              <p
                css={css`
                  color: white;
                `}
              >
                {children}
              </p>
            ),
          }}
        />
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
                src={`/icons/${contact.icon}.svg`}
                alt=""
                width={70}
                height={70}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
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
