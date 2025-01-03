/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import { tp } from "../utils/tp"
import { Container } from "../components/Container/Container"
import { Heading } from "../components/Heading/Heading"
import Image from "next/image"
import { Block, BlockFields } from "../components/Block/Block"
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text"
import { PageBlocksPersons } from "../tina/__generated__/types"
import { isDefined } from "../utils/hooks/isDefined"

const Persons: React.FC<PageBlocksPersons> = ({
  id,
  title,
  subtitle,
  persons,
}) => (
  <Block id={id}>
    <Container>
      {title && <Heading level={2}>{tp(title)}</Heading>}
      {subtitle && (
        <p
          css={css`
            text-align: center;
            margin-bottom: 64px;
          `}
        >
          {tp(subtitle)}
        </p>
      )}
    </Container>
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        max-width: 1600px;
        padding: 0 32px;
        justify-content: center;
      `}
    >
      {(persons ?? []).filter(isDefined).map((person, i) => (
        <article
          key={i}
          css={css`
            max-width: 900px;
            margin: 0 0 32px;
            @media (min-width: 500px) {
              margin: 0 32px 32px;
            }
            @media (min-width: 1000px) {
              width: 390px;
            }
          `}
        >
          <figure
            css={css`
              margin: 0 1em 0 0;
              shape-outside: circle(50%);
              @media (min-width: 500px) {
                float: left;
              }
            `}
          >
            {person.image && (
              <Image
                css={css`
                  width: 5em;
                  height: 5em;
                  border-radius: 50%;
                  margin: 1em auto;
                `}
                src={person.image}
                alt={person.nick}
                width={170}
                height={170}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            )}
          </figure>
          <h3
            css={css`
              font-size: 1.8rem;
              margin: 0;
            `}
          >
            {tp(person.nick)}
          </h3>
          <p
            css={css`
              margin-top: 0;
            `}
          >
            <strong>{tp(person.name)}</strong>
          </p>
          <TinaMarkdown content={person.richText} />
        </article>
      ))}
    </div>
  </Block>
)

export default Persons
