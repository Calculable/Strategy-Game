import React from 'react'

class Workplace extends React.Component {
    render() {
        return (
            <div className={'building ' + this.props.className}>
                <p className="building-icon"><i className={this.props.icon}></i></p>
                <h1><strong>{this.props.displayName}<br/></strong>
                    {this.props.level !== "" &&
                    <small>Level: {this.props.level}</small>
                    }
                    <br></br>
                    {this.props.workers !== undefined &&
                    <small>Worker: {this.props.workers}</small>
                    }
                </h1>


                {!this.props.buttonDisabled &&
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal"
                        data-bs-target={this.props.modalTarget}>
                    {this.props.buttonText}
                </button>
                }

                {this.props.progress &&
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: this.props.progress + '%'}}
                         aria-valuenow={this.props.progress}
                         aria-valuemin="0" aria-valuemax="100">{this.props.progress}%
                    </div>

                </div>
                }


            </div>
        );
    }
}

export default Workplace;