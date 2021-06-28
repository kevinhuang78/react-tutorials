import React from 'react';
import Message from './Message';
import Formulaire from './Formulaire';

class App extends React.Component {
	render() {
		return (
			<div className="box">
				<div>
					<div className="messages" >
						<Message />
					</div>
					<Formulaire />
				</div>
			</div>
		)
	}
}

export default App;