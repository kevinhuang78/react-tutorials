import React from 'react';
import Message from './Message';
import Formulaire from './Formulaire';
import base from '../base';

class App extends React.Component {

	state = {
  	messages: {}
  }

  componentWillMount() {
  	this.ref = base.syncState('/', {
  		context: this,
  		state: 'messages'
  	});
  }

  addMessage = (message) => {
  	// 1 MAJ state
  	const messages = {...this.state.messages};
  	// 2 On ajoute le message avec une clé timestamp
  	const timestamp = Date.now();
  	messages[`message-${timestamp}`] = message;
  	// On ne garde que les 10 derniers messages
		Object.keys(messages).slice(0, -10).map(key => messages[key] = null);
  	// 3 Set State
  	this.setState({ messages });
  }

	render() {
		const messages = Object
										.keys(this.state.messages)
										.map(key => <Message key={key} details={this.state.messages[key]} />);
		return (
			<div className="box">
				<div>
					<div className="messages" >
						{messages}
					</div>
					<Formulaire addMessage={this.addMessage} pseudo={this.props.params.pseudo} length={140} />
				</div>
			</div>
		)
	}
}

export default App;