/** @jsxImportSource @emotion/react */
import React from "react"
import { Block } from "../components/Block/Block"
import { Container } from "../components/Container/Container"
import { ResponsiveVideo } from "../components/ResponsiveVideo/ResponsiveVideo"
import { PageBlocksVideo } from "../tina/__generated__/types"

const Video: React.FC<PageBlocksVideo> = ({ id, ...video }) => (
  <Block id={id}>
    <Container>
      <ResponsiveVideo {...video} />
    </Container>
  </Block>
)

export default Video
