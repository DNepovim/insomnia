/** @jsxImportSource @emotion/react */
import React from "react"
import Snowfall from "react-snowfall"
import { tp } from "../utils/tp"
import { css } from "@emotion/react"
import { ParallaxBanner } from "react-scroll-parallax"
import { Container } from "../components/Container/Container"
import { Block } from "../components/Block/Block"
import { Button } from "../components/Button/Button"
import { PageBlocksCover } from "../tina/__generated__/types"
import { theme } from "../theme"

const Cover: React.FC<PageBlocksCover> = ({
  id,
  title,
  subtitle,
  claim,
  button,
  isSnowfall,
}) => (
  <Block id={id}>
    <ParallaxBanner
      layers={[
        {
          image: "/images/cover.webp",
          speed: 0.2,
          opacity: [1.5, 0],
          translateY: [-20, 100],
        },
      ]}
      css={css`
        background-color: black;
      `}
    >
      {isSnowfall && <Snowfall />}
      <Container
        css={css`
          padding: 120px 16px;
        `}
      >
        {title && (
          <h1
            css={css`
              font-family: skautbold;
              font-size: 2.2em;
              color: white;
              margin: 0 0 4px;
            `}
          >
            {tp(title)}
          </h1>
        )}
        {subtitle && (
          <p
            css={css`
              font-family: skautbold;
              font-size: 1.8em;
              color: white;
              margin: 0 0 4px;
            `}
          >
            {subtitle}
          </p>
        )}
        {claim && (
          <p
            css={css`
              font-size: ${theme.font.sizes[2]};
              color: white;
              margin: 0 0 32px;
            `}
          >
            {claim}
          </p>
        )}
        {button?.showButton && (
          <Button link={button.link} targetBlank>
            {button.label}
          </Button>
        )}
      </Container>
    </ParallaxBanner>
  </Block>
)

export default Cover
