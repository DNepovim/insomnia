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

// The frame keeps its place in the grid and clips; only the image drifts
// inside it. Parallax translates by +/- speed * 10px, so the image has to
// overhang the frame by at least that much on each edge or the drift exposes
// a gap. The extra few px absorb sub-pixel rounding at fractional scroll
// positions, which would otherwise show a sliver at the travel extremes.
const thumbSpeed = 3
const overhang = thumbSpeed * 10 + 4

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
              position: relative;
              overflow: hidden;
              aspect-ratio: 1 / 0.7;
              background-color: ${theme.color.brand};
            `}
          >
            <Parallax
              speed={thumbSpeed}
              css={css`
                position: absolute;
                left: 0;
                right: 0;
                top: -${overhang}px;
                bottom: -${overhang}px;
              `}
            >
              <Image
                src={image}
                alt={`Fotka ${i}`}
                fill
                sizes="(min-width: 700px) 33vw, (min-width: 500px) 50vw, 100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Parallax>
          </figure>
        ))}
      </div>
      {button?.link && (
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
