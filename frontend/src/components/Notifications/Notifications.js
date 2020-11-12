import React from "react";

class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workflow_state: "{{ note.workflow_state }}", // set based on the model
        };
    }

    // instance of websocket connection as a class property
    ws = new WebSocket("ws://localhost:8000/api/v1/notifications/");

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log("connected");
        };

        this.ws.onmessage = (evt) => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data);
            if (message["note_id"] === 1) {
                //{{ note.id }}) {
                this.setState(message);
            }
            console.log(message);
        };

        this.ws.onclose = () => {
            console.log("disconnected");
            // automatically try to reconnect on connection loss
        };
    }

    retracted = () => {
        console.log("got a message that we are now draft");
        this.setState({ workflow_state: "draft" });
    };
    published = () => {
        console.log("got a message that we are now published");
        this.setState({ workflow_state: "published" });
    };
    retract = () => {
        console.log("Retracting");
        // fetch('{% url 'Note-retract' pk=note.id %}')
        //     .then((response) => {
        //       return response.json();
        //     })
        //     .then((data) => {
        //       console.log(data);
        //     });

        // this.setState({workflow_state: 'draft'})
    };
    publish = () => {
        console.log("Publishing");
        // fetch('{% url 'Note-publish' pk=note.id %}')
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log(data);
        //     });

        // this.setState({workflow_state: 'published'})
    };
    render() {
        const wf_state = this.state.workflow_state;
        const can_publish = wf_state === "draft";
        const can_retract = wf_state === "published";
        return (
            <div>
                <button
                    className={
                        "btn" +
                        (can_publish
                            ? " btn-outline-secondary disabled"
                            : " btn-primary")
                    }
                    disabled={can_publish}
                    aria-disabled={can_publish}
                    type="button"
                    onClick={this.retract}
                >
                    Retract
                </button>
                <button
                    className={
                        "btn" +
                        (can_retract
                            ? " btn-outline-secondary disabled"
                            : " btn-primary")
                    }
                    disabled={can_retract}
                    aria-disabled={can_retract}
                    type="button"
                    onClick={this.publish}
                >
                    Publish
                </button>
            </div>
        );
    }
}

export default Notifications;

// const mount = document.getElementById("workflow-widget");
// const workflowStatus = <WorkflowStatus />;
// ReactDOM.render(workflowStatus, mount);
