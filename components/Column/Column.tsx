/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import { tp } from "../../utils/tp"
import Image from "next/image"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { PageBlocksColumnsColumns } from "../../tina/__generated__/types"

export const Column: React.FC<PageBlocksColumnsColumns> = ({
  title,
  richText,
  icon,
}) => (
  <article>
    <header
      css={css`
        --title-size: 1.17em;
        --title-line-height: 1.3;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      `}
    >
      <Image
        css={css`
          flex-shrink: 0;
          width: calc(2.4 * var(--title-line-height) * var(--title-size));
          height: calc(2.4 * var(--title-line-height) * var(--title-size));
          margin-right: 8px !important;
        `}
        src={`/icons/${icon}.svg`}
        alt=""
        width={80}
        height={80}
      />
      <h3
        css={css`
          margin: 0;
          font-size: var(--title-size);
          line-height: var(--title-line-height);
        `}
      >
        {tp(title ?? "")}
      </h3>
    </header>
    <TinaMarkdown content={richText} />
  </article>
)
