/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image, { ImageProps } from "next/image"
import { theme } from "../../theme"
import { css } from "@emotion/react"
import { Container } from "../Container/Container"
import styled from "@emotion/styled"
import Hamburger from "hamburger-react"
import { useWindowWidth } from "@react-hook/window-size"

interface NavigationItem {
  title: string
  link: string
}

const BREAKPOINT = 600

export const Navigation: React.FC<{logo: ImageProps["src"], data: NavigationItem[]}> = ({logo, data}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const width = useWindowWidth()

  useEffect(() => {
    setIsMobile(width < BREAKPOINT)


  }, [width])

  return (
    <NavBar>
      <Container css={css`
        padding-top: 0;
        padding-bottom: 0;
      `}>
        <Nav>
          <Link href="/">
            <a>
              <Image
                css={css`padding: 8px;`}
                src={logo}
                alt="Insomnia – logo"
                width={90}
                height={90}
              />
            </a>
          </Link>
          {!isMobile && (
            <NavList>
              {data.map(item => (
                <NavItem key={item.link}>
                  <Link href={item.link}>
                    <NavLink>{item.title}</NavLink>
                  </Link>
                </NavItem>
              ))}
            </NavList>
            )
          }
          {isMobile && (
            <NavListMobile isOpened={isOpened}>
              {data.map(item => (
                <NavItem key={item.link}>
                  <Link href={item.link}>
                    <NavLinkMobile>{item.title}</NavLinkMobile>
                  </Link>
                </NavItem>
              ))}
            </NavListMobile>
            )
          }
          {isMobile && <Hamburger color={theme.color.brand} onToggle={() => setIsOpened(!isOpened)} />}
        </Nav>
      </Container>
    </NavBar>
  )
}

const NavBar = styled("div")`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${theme.color.background};
  width: 100vw;
`

const Nav = styled("nav")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavList = styled("ul")`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`

const NavItem = styled("li")`
  margin-left: 4px;
`

const NavLink = styled("a")`
  position: relative;
  display: block;
  padding: 0.4rem;
  transition: color 300ms;
  color: black;
  cursor: pointer;

  &:after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    transition: width 300ms;
    background-color: ${theme.color.brand};
  }

  &:hover {
    text-decoration: none;
    color: ${theme.color.brand};

    &:after {
      width: 100%;
    }
  }
`

const NavListMobile = styled.ul((props: { isOpened: boolean }) => `
  background-color: white;
  position: absolute;
  top: 100%;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 0 0 4px;
  transform: translateX(${props.isOpened ? 0 : 100}%);
  transition: transform 200ms;
`)

const NavLinkMobile = styled("a")`
  display: block;
  color: black;
  padding: 0.6em 1.6em;
`