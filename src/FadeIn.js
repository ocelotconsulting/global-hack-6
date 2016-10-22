import React from 'react'
import classnames from 'classnames'

const animate = (component) => {
  component.setState({ active: false })
  setTimeout(() => component.setState({ active: true }), 0)
}

export default class FadeIn extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { active: false }
  }

  componentWillReceiveProps({ context }) {
    if (this.props.context !== context) animate(this)
  }

  componentDidMount() {
    animate(this)
  }

  render() {
    const { active } = this.state
    return (
      <div className={classnames('fade-in', this.props.className, { active })}>
        {this.props.children}
      </div>
    )
  }
}
