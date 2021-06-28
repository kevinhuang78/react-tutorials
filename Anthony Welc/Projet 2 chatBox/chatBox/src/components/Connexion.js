import React from 'react';

class Connexion extends React.Component {

	goToChat = (event) => {
		event.preventDefault();
		const pseudo = this.pseudoInput.value; // Récupérer pseudo
		this.context.router.transitionTo(`/ReactJS/messagerie/pseudo/${pseudo}`); // Redirect URL
	};

	render() {
		return (
			<div className="connexionBox">
				<form className="connexion" onSubmit={(e) => this.goToChat(e)}>
					<input 
						type="text" 
						placeholder="Pseudo" 
						required 
						ref={(input) => {this.pseudoInput = input}} 
					/>
					<button type="submit">GO</button>
				</form>
			</div>
		)
	}

	static contextTypes = {
		router: React.PropTypes.object
	}
}

export default Connexion;