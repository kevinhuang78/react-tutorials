import React from 'react';
import { render } from 'react-dom'; // Seulement render car on n'a uniquement besoin de render
import './style/css/bootstrap.min.css'; // Import CSS
import './index.css';
import { sampleText } from './sampleText'; // JS Perso
import marked from 'marked';

class App extends React.Component {

	state = {
		text: sampleText
	};

	componentWillMount(){
		const localStorageText = localStorage.getItem('texteagarderenstorage'); // Regarder dans la console, Applications puis Local Storage puis http://localhost:3000
		if (localStorageText) {
			this.setState({ text: localStorageText });
		}
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('texteagarderenstorage', nextState.text);
	}

	editText = (event) => {
		const text = event.target.value;
		this.setState({ text }); // car {text: text} peut être raccourci en {text: text}
	};

	renderText = (text) => {
		const renderText = marked(text, {sanitize:true});
		return { __html: renderText };
	};

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<textarea 
							value={this.state.text} 
							rows="35" 
							className="form-control"
							onChange={(e) => this.editText(e)} />
					</div>
					<div className="col-sm-6">
						<div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
					</div>
				</div>
			</div>
		);
	}
}

render (
	<App />,
	document.getElementById('root')
);