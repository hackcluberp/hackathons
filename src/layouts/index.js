import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider } from '@hackclub/design-system'

import favicon from 'static/favicon.ico'

const TemplateWrapper = ({ children }) => (
  <ThemeProvider>
    <Helmet>
      <title
      >{`${new Date().getFullYear()} High School Hackathon Calendar // Worldwide`}</title>
      <meta
        name="description"
        content="Community contributed high school hackathon schedule"
      />
      <link rel="icon" href={favicon} />
    </Helmet>
    {children()}
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
