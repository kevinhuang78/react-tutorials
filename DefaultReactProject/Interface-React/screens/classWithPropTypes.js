import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            isClicked: false
        };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({isClicked: false});
        }
    }

    render()
    {
        return(
            <div className={`dropdown ${this.props.className ? this.props.className : ""}`} ref={this.setWrapperRef}>
                <div onClick={() => this.setState({isClicked: !this.state.isClicked})}>
                    {this.props.children}
                </div>
                {
                    this.props.overlay && this.state.isClicked &&
                        <div className="dropdown__overlay">
                            {this.props.overlay}
                        </div>
                }
            </div>
        );
    }
}

Dropdown.propTypes = {
    className: PropTypes.string,
    overlay: PropTypes.element,
    children: PropTypes.element
};

export default Dropdown;