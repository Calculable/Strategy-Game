import React from 'react'

class Workplace extends React.Component {
    render() {
        return (
            <div className={'building ' + this.props.className}>
                <p className="building-icon"><i className={this.props.icon}></i></p>
                <h1><strong>{this.props.displayName}<br/></strong>
                    {this.props.level &&
                    <small>Level {this.props.level}</small>
                    }
                </h1>

                <button type="button" className="btn btn-secondary" data-toggle="modal"
                        data-target={this.props.modalTarget}>
                    {this.props.buttonText}
                </button>

                {this.props.progress &&
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: this.props.progress + '%'}}
                         aria-valuenow={this.props.progress}
                         aria-valuemin="0" aria-valuemax="100">{this.props.progress}%
                    </div>

                </div>
                }

                {this.props.workers &&
                <p className={"worker-display"}><strong><span>Worker</span></strong>: <span
                    className="badge badge-light">{this.props.workers}</span></p>
                }
            </div>
        );
    }
}

export default Workplace;