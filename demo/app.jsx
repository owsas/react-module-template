import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';

import { DataBrowser as Data } from '@owsas/geopromos-private-api/out/DataBrowser';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    // iniciar sesión para que el componente
    // y todo lo demás que vayamos a mostrar
    // pueda acceder a los datos privados del
    // usuario con el que iniciarmemos sesión

    this.logIn();
    this.loadUserFeed();
  }

  async logIn() {
    const user = await Data.getCurrentUser();

    // Al iniciar sesión, se escribe en la consola la información del usuario
    console.log('logged in as ', user && user.toJSON());

    if (!user) {
      // se inicia sesión
      await Data.logIn('testuser@geopromos.co', 'testuser');
    }
    // aquí habremos iniciado sesión
    this.setState({ loading: false });
  }

  async loadUserFeed() {
    const feed = await Data.getUserFeedQuery()
      .find();

    console.log('feed', feed);
  }

  render() {
    if (this.state.loading) {
      return <div>Cargando...</div>;
    }

    return <div>Funcionó :)</div>;
  }
}

render(<App />, document.getElementById('root'));
