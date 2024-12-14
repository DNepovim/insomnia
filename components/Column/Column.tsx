/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import { tp } from "../../utils/tp"
import Image from "next/image"
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text"

export interface ColumnProps {
  title: string
  richText: TinaMarkdownContent
  icon: string
}

export const Column: React.FC<ColumnProps> = ({ title, richText, icon }) => (
  <article>
    <header
      css={css`
        display: flex;
        align-items: flex-end;
      `}
    >
      <Image
        css={css`
          width: 3em;
          height: 3em;
          margin-right: 8px !important;
        `}
        src={`/icons/${icon}.svg`}
        alt=""
        width={80}
        height={80}
        lazyBoundary="600px"
      />
      <h3
        css={css`
          margin: 0 0 10px;
        `}
      >
        {tp(title)}
      </h3>
    </header>
    <TinaMarkdown content={richText} />
  </article>
)
