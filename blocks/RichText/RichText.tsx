/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"
import { tp } from "../../utils/tp"
import { Block, BlockFields } from "../../components/Block/Block"
import { Container } from "../../components/Container/Container"
import { Heading } from "../../components/Heading/Heading"

export interface RichTextProps extends BlockFields {
  title: string
  richText: string
  textAlign: string
}

export const RichText: React.FC<RichTextProps> = ({
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
      <Heading level={2}>{tp(title)}</Heading>
      <div dangerouslySetInnerHTML={{ __html: richText }} />
    </Container>
  </Block>
)
