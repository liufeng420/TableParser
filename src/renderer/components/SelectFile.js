import React from 'react';

class SelectFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.initialCount };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.state.count += 1;
    console.log(`on click ${this.state.count}`);
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

SelectFile.propTypes = {
  name: React.PropTypes.string,
};

SelectFile.defaultProps = {
  name: 'Mary',
};

export default SelectFile;
