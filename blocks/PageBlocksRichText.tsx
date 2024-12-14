/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"
import { tp } from "../utils/tp"
import { Block, BlockFields } from "../components/Block/Block"
import { Container } from "../components/Container/Container"
import { Heading } from "../components/Heading/Heading"
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text"
import { PageBlocksRichText } from "../tina/__generated__/types"

const RichText: React.FC<PageBlocksRichText> = ({
  id,
  title,
  richText,
  textAlign,
}) => (
  <Block id={id}>
    <Container
      css={css`
        text-align: ${textAlign};
      `}
    >
      {title && <Heading level={2}>{tp(title)}</Heading>}
      <TinaMarkdown content={richText} />
    </Container>
  </Block>
)

export default RichText
