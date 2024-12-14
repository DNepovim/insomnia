/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React, { PropsWithChildren } from "react"
import { theme } from "../../theme"

export interface BlockFields extends PropsWithChildren {
  id?: string | null
  withBackground?: boolean
}

export const Block: React.FC<BlockFields> = ({
  id,
  withBackground,
  children,
}) => (
  <section
    id={id ?? undefined}
    css={
      withBackground
        ? css`
            background-color: ${theme.color.beige};
          `
        : {}
    }
  >
    {children}
  </section>
)
