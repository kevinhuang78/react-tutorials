import React from 'react';
import Message from './Message';
import Formulaire from './Formulaire';

class App extends React.Component {

	state = {
  	messages: {}
  }

  addMessage = (message) => {
  	// 1 MAJ state
  	const messages = {...this.state.messages};
  	// 2 On ajoute le message avec une clé timestamp
  	const timestamp = Date.now();
  	messages[`message-${timestamp}`] = message;
  	// 3 Set State
  	this.setState({ messages });
  }

	render() {
		return (
			<div className="box">
				<div>
					<div className="messages" >
						<Message pseudo="antho" />
					</div>
					<Formulaire addMessage={this.addMessage} />
				</div>
			</div>
		)
	}
}

export default App;