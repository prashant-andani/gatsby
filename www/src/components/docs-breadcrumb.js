import React from "react"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import getActiveItem from "../utils/sidebar/get-active-item"
import getActiveItemParents from "../utils/sidebar/get-active-item-parents"
import { mediaQueries, space, colors, fontSizes } from "../utils/presets"
import { rhythm } from "../utils/typography"

const Separator = ({ character = `>` }) => (
  <span style={{ margin: `0px ${space[1]}` }} role="presentation">
    {character}
  </span>
)

const BreadcrumbNav = ({ children, mobile = false }) => (
  <nav
    aria-label="breadcrumb"
    css={{
      fontSize: fontSizes[1],
      display: `${mobile ? `inherit` : `none`}`,
      [mediaQueries.md]: {
        display: `${mobile ? `none` : `inherit`}`,
      },
      marginBottom: rhythm(1 / 2),
    }}
  >
    {children}
  </nav>
)

const Breadcrumb = ({ itemList, location }) => {
  const activeItem = getActiveItem(itemList.items, location, undefined)
  const activeItemParents = getActiveItemParents(itemList.items, activeItem, [])

  // return a shorter version of the breadcrumb on the intro page
  // because the docs intro page isn't generated from markdown
  if (activeItem.title === `Introduction`) {
    return (
      <>
        {/* only the breadcrumb nav of the proper viewport is displayed */}
        <BreadcrumbNav>
          <Link to="/">Home</Link>
          <Separator />
          Docs
        </BreadcrumbNav>
        <BreadcrumbNav mobile>
          <Separator character="<" />
          <Link to="/">Home</Link>
        </BreadcrumbNav>
      </>
    )
  }

  return (
    <>
      <BreadcrumbNav>
        <Link to="/">Home</Link>
        <Separator />
        <Link to="/docs/">Docs</Link>
        <Separator />
        {activeItemParents.reverse().map(item => (
          <React.Fragment key={item.title}>
            <span>
              <Link to={item.link}>{item.title}</Link>
            </span>
            <Separator />
          </React.Fragment>
        ))}
        {activeItem.title}
      </BreadcrumbNav>
      {activeItemParents && (
        <BreadcrumbNav mobile>
          <Separator character="<" />
          <Link
            to={
              activeItemParents[activeItemParents.length - 1]
                ? activeItemParents[activeItemParents.length - 1].link
                : `/docs/`
            }
          >
            {activeItemParents[activeItemParents.length - 1]
              ? activeItemParents[activeItemParents.length - 1].title
              : `Docs`}
          </Link>
        </BreadcrumbNav>
      )}
    </>
  )
}

export default Breadcrumb