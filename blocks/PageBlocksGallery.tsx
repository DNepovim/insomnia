/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"
import { Container } from "../components/Container/Container"
import Image from "next/image"
import { theme } from "../theme"
import { Block, BlockFields } from "../components/Block/Block"
import { Button } from "../components/Button/Button"
import { PageBlocksGallery } from "../tina/__generated__/types"
import { isDefined } from "../utils/hooks/isDefined"

const gap = 16

const Gallery: React.FC<PageBlocksGallery> = ({ id, images, button }) => (
  <Block id={id}>
    <Container
      css={css`
        text-align: center;
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr;
          gap: ${gap}px;

          @media (min-width: 500px) {
            grid-template-columns: 1fr 1fr;
          }

          @media (min-width: 700px) {
            grid-template-columns: 1fr 1fr 1fr;
          }
        `}
      >
        {(images ?? []).filter(isDefined).map((image, i) => (
          <figure
            key={i}
            css={css`
              margin: 0;
              width: 100%;
            `}
          >
            <Image
              src={image}
              alt={`Fotka ${i}`}
              width={theme.layout.width / 3}
              height={(theme.layout.width / 3) * 0.7}
              lazyBoundary="600px"
              css={css`
                background-color: ${theme.color.brand};
                max-width: 100%;
              `}
              objectFit="cover"
              objectPosition="center"
            />
          </figure>
        ))}
      </div>
      {button && (
        <div
          css={css`
            display: inline-block;
            margin: 2rem auto;
          `}
        >
          <Button link={button.link} targetBlank>
            {button.label}
          </Button>
        </div>
      )}
    </Container>
  </Block>
)

export default Gallery
