import React from 'react';
import Formulaire from './Formulaire';
import Message from './Message';
import base from '../base';
// CSS
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../animation.css';

class App extends React.Component {

	state = {
		messages: {}
	}

	componentWillMount() {
		this.ref = base.syncState('/', {
			context: this,
			state : 'messages'
		});
	}

	componentDidUpdate() {
		// Scroll à chaque envoi de message
		this.messages.scrollTop = this.messages.scrollHeight;
	}

	addMessage = (message) => {
		// Copier le state (... = récupère toutes les données que tu trouves dans ce que je vais te demander)
		const messages = {...this.state.messages};
		// On ajoute le message avec un clé timestamp et pseudo
		const timestamp = Date.now();
		const pseudo = this.props.params.pseudo;
		messages[`message-${pseudo}-${timestamp}`] = message;
		// On supprime si plus de 10 messages
		Object.keys(messages).slice(0, -10).map(key => messages[key] = null);
		// Mettre à jour notre state
		this.setState({ messages: messages }); // Même chose que this.setState({ messages }); car 2 fois le même nom
	};

	isUser = (pseudo) => {
		return pseudo === this.props.params.pseudo;
	};

	render() {

		const messages = Object
			.keys(this.state.messages)
			.map(key => <Message key={key} details={this.state.messages[key]} isUser={this.isUser} />)
		;

		return (
			<div className="box">
				<div>
					<div className="messages" ref={input => this.messages = input}>
						<ReactCSSTransitionGroup
							component="div"
							className="message"
							transitionName="message"
							transitionEnterTimeout={200}
							transitionLeaveTimeout={200}
						>
							{messages}
						</ReactCSSTransitionGroup>
					</div>
					<Formulaire addMessage={this.addMessage} pseudo={this.props.params.pseudo} length={140} />
				</div>
			</div>
		)
	}

	static propTypes = {
		params: React.PropTypes.object.isRequired
	};
}

export default App;