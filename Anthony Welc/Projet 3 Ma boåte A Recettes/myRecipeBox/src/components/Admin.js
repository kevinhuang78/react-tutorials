import React from 'react';
import AjouterRecette from './AjouterRecette';
import base from '../base';

class Admin extends React.Component {

	state = {
		uid: null, // User ID
		owner: null
	}

	componentDidMount() {
		base.onAuth(user => {
			if(user) {
				this.traitementConnexion(null, {user});
			}
		})
	}

	traiterChangement = (event, key) => {
		const recette = this.props.recettes[key];
		const majRecette = {
			...recette,
			[event.target.name]: event.target.value
		};
		this.props.majRecette(key, majRecette);
	};

	connexion = provider => {
		base.authWithOAuthPopup(provider, this.traitementConnexion);
	};

	deconnexion = () => {
		base.unauth();
		this.setState({ uid: null });
	};

	traitementConnexion = (err, authData) => {
		if(err) {
			console.log(err);
			return;
		}

		// Récupérer le nom de la boîte
		const boxRef = base.database().ref(this.props.pseudo);
		// Demander à Firebase les données

		boxRef.once('value', snapshot => {
			const data = snapshot.val() || {}; // Si ça existe, data sinon rien
			// Attribuer la box si elle n'est à personne
			if(!data.owner) {
				boxRef.set({
					owner: authData.user.uid
				})
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.ower || authData.user.uid
			})
		})
	};

	renderAdmin = key => {
		const recette = this.props.recettes[key];
		return (
			<div className="card" key={key}>
				<form className="admin-form">
					<input type="text" name="nom" placeholder="Nom de la recette" onChange={e => this.traiterChangement(e, key)} value={recette.nom} />
					<input type="text" name="image" placeholder="Adresse de l'image" onChange={e => this.traiterChangement(e, key)} value={recette.image} />
					<textarea name="ingredients" rows="3" placeholder="Liste des ingrédients séparés par une virgule" onChange={e => this.traiterChangement(e, key)} value={recette.ingredients} ></textarea>
					<textarea name="instructions" rows="15" placeholder="Liste des instructions (une par ligne)" onChange={e => this.traiterChangement(e, key)} value={recette.instructions}></textarea>
				</form>
				<button onClick={() => this.props.supprimerRecette(key)}>Supprimer</button>
			</div>
		);
	};

	renderLogin = () => {
		return (
			<div className="login">
				<h2>Connecte toi pour créer tes recettes !</h2>
				<button className="facebook-button" onClick={() => this.connexion('facebook')} >Me connecter avec Facebook</button>
				<button className="twitter-button" onClick={() => this.connexion('twitter')} >Me connecter avec Twitter</button>
			</div>
		);
	};

	render() {

		const deconnexion = <button onClick={this.deconnexion}>Déconnexion !</button>

		// S'il existe un propriétaire
		if(!this.state.uid) {
			return (
				<div>{this.renderLogin()}</div>
			);
		}
		// Est-ce le propriétaire ?
		if(this.state.uid !== this.state.owner) {
			return(
				<div className="login">
					{this.renderLogin()}
					<p>⚠️ Tu n'es pas le propriétaire de cette boîte à recettes.</p>
				</div>
			);
		}

		const adminCards = Object
			.keys(this.props.recettes)
			.map(this.renderAdmin);

		return(
			<div className="cards">
				<AjouterRecette ajouterRecette={this.props.ajouterRecette} />
				{adminCards}
				<footer>
					<button onClick={this.props.chargerExemple}>Remplir</button>
					{deconnexion}
				</footer>
			</div>
		)
	}

	static propTypes = {
		recettes: React.PropTypes.object.isRequired,
		chargerExemple: React.PropTypes.func.isRequired,
		ajouterRecette: React.PropTypes.func.isRequired,
		majRecette: React.PropTypes.func.isRequired,
		supprimerRecette: React.PropTypes.func.isRequired,
		pseudo: React.PropTypes.string.isRequired
	}
}

export default Admin;