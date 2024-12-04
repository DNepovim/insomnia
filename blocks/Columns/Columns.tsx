/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import { tp } from "../../utils/tp"
import { theme } from "../../theme"
import { Container } from "../../components/Container/Container"
import { Column } from "../../components/Column/Column"
import { Heading } from "../../components/Heading/Heading"
import { Block, BlockFields } from "../../components/Block/Block"

export enum Icons {
  Sky = "sky",
  Person = "person",
  Hand = "hand",
  Stars = "stars",
  Arrow = "arrow",
  Moon = "moon",
  Mark = "mark",
  Star = "star",
  Check = "check",
}

export interface ColumnsProps extends BlockFields {
  title: string
  columns: {
    title: string
    richText: string
    icon: Icons
  }[]
}

export const Columns: React.FC<ColumnsProps> = ({ id, title, columns }) => (
  <Block id={id} withBackground>
    <Container>
      <Heading level={2}>{tp(title)}</Heading>
      <div
        css={css`
          margin: 0 -16px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        `}
      >
        {columns?.map((column, i) => (
          <div
            key={i}
            css={css`
              width: ${theme.layout.width / 3 - 8}px;
              padding: 4px 16px;
              box-sizing: border-box;
              margin-bottom: 16px;
            `}
          >
            <Column {...column} />
          </div>
        ))}
      </div>
    </Container>
  </Block>
)
