import React, {PropTypes as T} from "react";
import AuthService from "./auth/AuthService";
import Navigation from "./Navigation";

export default class App extends React.Component {
    static contextTypes = {
        router: T.object
    }

    static propTypes = {
        children: T.node,
        auth: T.instanceOf(AuthService)
    }

    render() {
        return (
            this.props.auth.loggedIn() ?
                <div>
                    <Navigation auth={this.props.auth}/>
                    {this.props.children}
                </div>
            :
                <div className="login-prompt">
                    <img src="/LargeIconColor.png"/>
                    <div> You must <a href="#" onClick={(e) => {e.preventDefault(); this.props.auth.login();}}>login</a> using your gmail or facebook account to continue.</div>
                </div>
        )
    }
}
