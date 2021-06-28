// Ajouter des fonctions

// REACT
import React from 'react';
import { render } from 'react-dom';
// CSS
import './index.css';
import './style/css/bootstrap.css';

// JS PERSO
import { sampleText } from './sampleText';

class App extends React.Component {

	render() {
		return (
			<div className="container">
				<div className="row">

				  <div className="col-sm-6">
				  	<textarea value={sampleText} rows="35" className="form-control">
				  	</textarea>
				  </div>

				  <div className="col-sm-6">
				  	<div>{sampleText}</div>
					</div>

				</div>
			</div>
		)
	}

}

render(
  <App />,
  document.getElementById('root')
);