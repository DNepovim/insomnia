/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react"
import { css, Interpolation, keyframes, Theme } from "@emotion/react"
import Image from "next/image"
import { ParallaxBanner } from "react-scroll-parallax"
import { theme } from "../theme"
import { Block } from "../components/Block/Block"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { isDefined } from "../utils/hooks/isDefined"
import { PageBlocksContacts } from "../tina/__generated__/types"

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
          speed: -20,
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
          box-sizing: border-box;
          max-width: 600px;
          height: 100%;
          margin: 0 auto;
          padding: 4rem 16px;
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
            p: (props?: { children: JSX.Element }) => (
              <p
                css={css`
                  color: white;
                `}
              >
                {props?.children}
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
              css={css`
                display: block;
                margin-right: 8px;

                img {
                  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                &:hover img,
                &:focus-visible img {
                  animation: ${hop} 0.5s ease-out;
                  transform: scale(1.08);
                }

                &:active img {
                  transform: scale(0.97);
                }

                @media (prefers-reduced-motion: reduce) {
                  &:hover img,
                  &:focus-visible img {
                    animation: none;
                  }
                }
              `}
            >
              <Image
                css={css`
                  display: block;
                  width: 3em;
                  height: 3em;
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

const hop = keyframes`
  0% { transform: translateY(0) rotate(0) scale(1); }
  35% { transform: translateY(-4px) rotate(-5deg) scale(1.08); }
  65% { transform: translateY(0) rotate(3deg) scale(1.08); }
  100% { transform: translateY(0) rotate(0) scale(1.08); }
`

const getHref = (url: string): string =>
  url.includes("@") ? `mailto:${url}` : url

export default Contacts
