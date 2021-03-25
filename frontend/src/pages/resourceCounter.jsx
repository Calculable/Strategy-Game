import React from 'react'

class ResourceCounter extends React.Component {
    render() {
        return (
            <div className="resource-counter">
                <h5>Wood: <span className="badge badge-info">8</span>
                    , Iron: <span className="badge badge-info">34</span>
                    , Stone: <span className="badge badge-info">2</span>
                    , Gold <span className="badge badge-info">3</span>
                    , Diamont: <span className="badge badge-info">0</span>
                    <br/><br/>
                    Free Workers: <span className="badge badge-light">10</span>
                    <br/><br/>
                    Money: <span className="badge badge-light">$99</span>
                </h5>
            </div>
        );
    }
}

export default ResourceCounter;