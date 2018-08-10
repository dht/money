import React, { Component } from "react";
import "./Modal.css";

const isClickInRoot = (root, target) => {
    let run = 0;

    while (run < 10) {
        if (root === target) return true;

        if (target && target.parentNode) {
            target = target.parentNode;
        }
        run++;
    }
};

export class Modal extends Component {
    keydown = ev => {
        if (ev.which === 27) {
            this.props.onClose();
        }
    };

    componentDidMount() {
        window.addEventListener("keydown", this.keydown);

        setTimeout(() => {
            window.addEventListener("click", this.onClick);
        }, 100);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("click", this.onClick);
    }

    onClick = ev => {
        const root = this.refs["root"],
            target = ev.target;

        if (!isClickInRoot(root, target)) {
            this.props.onClose();
        }
    };

    render() {
        return (
            <div className="Modal-container">
                <div className="dialog" ref={"root"}>
                    <div className="modal-header">
                        <div className="title">{this.props.title}</div>
                        <div className="close">
                            <i
                                className="material-icons"
                                onClick={this.props.onClose}
                            >
                                close
                            </i>
                        </div>
                    </div>
                    <div className="content">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default Modal;
