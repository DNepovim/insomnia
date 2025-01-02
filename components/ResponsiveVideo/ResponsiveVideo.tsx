/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React, { useState } from "react"
import Image from "next/image"

export interface ResponsiveVideoProps {
  src: string
  width: number
  height: number
}

export const ResponsiveVideo: React.FC<ResponsiveVideoProps> = ({
  src,
  width,
  height,
}) => {
  const [isPlayed, setIsPlayed] = useState(false)
  return (
    (<figure
      css={css`
        position: relative;
        width: 100%;
        height: 0;
        padding-top: ${(height / width) * 100}%;
        margin: 0;
      `}
    >
      {isPlayed ? (
        <iframe
          css={css`
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          `}
          width={width}
          height={height}
          src={
            isPlayed
              ? `https://www.youtube.com/embed/${src}?rel=0&showinfo=0&autoplay=1`
              : ""
          }
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <>
          <Image
            src={`https://img.youtube.com/vi/${src}/sddefault.jpg`}
            alt="yt thumbnail"
            priority
            fill
            sizes="100vw"
            style={{
              objectFit: "cover"
            }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100px;
              height: 100px;
              cursor: pointer;
            `}
            onClick={() => setIsPlayed(true)}
            src="/icons/play.svg"
            alt="play"
          />
        </>
      )}
    </figure>)
  );
}
