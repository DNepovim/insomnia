/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"
import { Container } from "../components/Container/Container"
import Image from "next/image"
import { Parallax } from "react-scroll-parallax"
import { theme } from "../theme"
import { Block, BlockFields } from "../components/Block/Block"
import { Button } from "../components/Button/Button"
import { PageBlocksGallery } from "../tina/__generated__/types"
import { isDefined } from "../utils/hooks/isDefined"

const gap = 16

// Subtle per-column drift so the thumbs read as parallax rather than one
// block sliding. Kept small: at 3 columns the widest spread is 1.5 -> 3,
// i.e. at most 30px of travel, well inside the grid gap.
const columnSpeeds = [3, 1.5, 2.5]
const thumbSpeed = (i: number): number => columnSpeeds[i % columnSpeeds.length]

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
            <Parallax speed={thumbSpeed(i)}>
              <Image
                src={image}
                alt={`Fotka ${i}`}
                width={theme.layout.width / 3}
                height={(theme.layout.width / 3) * 0.7}
                css={css`
                  background-color: ${theme.color.brand};
                  max-width: 100%;
                `}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover",
                  objectPosition: "center"
                }} />
            </Parallax>
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
