import React from 'react'

class ResourceCounter extends React.Component {
    render() {
        return (
            <div className="resource-counter mt-3">
                <h5>Wood: <span className="badge badge-info">{this.props.resourceStats.materials.wood}</span>
                    , Iron: <span className="badge badge-info">{this.props.resourceStats.materials.iron}</span>
                    , Stone: <span className="badge badge-info">{this.props.resourceStats.materials.stone}</span>
                    , Gold: <span className="badge badge-info">{this.props.resourceStats.materials.gold}</span>
                    , Diamond: <span className="badge badge-info">{this.props.resourceStats.materials.diamond}</span>
                    <br/><br/>
                    Free Workers: <span className="badge badge-light">{this.props.resourceStats.freeWorkers}</span>
                    <br/><br/>
                </h5>
            </div>
        );
    }
}

export default ResourceCounter;