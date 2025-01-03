/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"
import { ParallaxBanner } from "react-scroll-parallax"
import { Block } from "../components/Block/Block"
import { theme } from "../theme"
import { PageBlocksQuotation } from "../tina/__generated__/types"

const Quotation: React.FC<PageBlocksQuotation> = ({
  id,
  text,
  source,
  sourceUrl,
}) => (
  <Block id={id}>
    <ParallaxBanner
      css={css`
        background-color: ${theme.color.brand};
      `}
      layers={[
        {
          image: "/uploads/sky.webp",
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
        <blockquote
          css={css`
            color: white;
            font-style: italic;
            font-weight: 700;
            font-size: ${theme.font.sizes[2]};
            font-family: themix;

            &:before,
            &:after {
              color: ${theme.color.brand};
            }

            &:before {
              content: "„";
            }

            &:after {
              content: "“";
            }
          `}
        >
          {text}
        </blockquote>
        {source && (
          <a href={sourceUrl ?? ""} target="_blank" rel="noreferrer noopener">
            {source}
          </a>
        )}
      </div>
    </ParallaxBanner>
  </Block>
)

export default Quotation
