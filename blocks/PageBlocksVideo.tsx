/** @jsxImportSource @emotion/react */
import React from "react"
import { Block } from "../components/Block/Block"
import { Container } from "../components/Container/Container"
import { ResponsiveVideo } from "../components/ResponsiveVideo/ResponsiveVideo"
import { PageBlocksVideo } from "../tina/__generated__/types"

const Video: React.FC<PageBlocksVideo> = ({ id, src, width, height }) =>
  src && width && height ? (
    <Block id={id}>
      <Container>
        <ResponsiveVideo src={src} width={width} height={height} />
      </Container>
    </Block>
  ) : null

export default Video
