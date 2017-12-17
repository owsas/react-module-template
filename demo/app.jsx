import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import { DataBrowser as Data } from '@owsas/geopromos-private-api/out/DataBrowser';
import '@owsas/geopromos-web-css/build/geopromos.css';

import { ButtonLike, ButtonFollow, ButtonLogout } from '../src';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: undefined,
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

    if (!user) {
      // se inicia sesión
      await Data.logIn('testuser@geopromos.co', 'testuser');
    }

    // Al iniciar sesión, se escribe en la consola la información del usuario
    console.log('logged in as ', user && user.toJSON());

    // aquí habremos iniciado sesión
    this.setState({ loading: false, user });
  }

  async logOut() {
    await Data.logOut();
    this.setState({ loading: false, user: undefined });
    this.forceUpdate();
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

    return (
      <div>
        <section>
          <h3>Hello {this.state.user && this.state.user.get('name')}</h3>
          {!this.state.user &&
            <button className="btn btn-default" onClick={() => { this.logIn(); }}>Iniciar sesión</button>
          }
        </section>
        <section>
          <h2>ButtonLike</h2>
          <ButtonLike
            onLogin={() => {}}
            className="Promo"
            objectId="E5SyTySkx5"
            interactionKey="promoId"
          />

          <pre>
            {`
<ButtonLike
  onLogin={() => {}}
  className="Promo"
  objectId="E5SyTySkx5"
  interactionKey="promoId"
/>
            `}
          </pre>
        </section>

        <section>
          <h2>ButtonFollow</h2>
          <ButtonFollow
            onLogin={() => { this.logIn(); }}
            className="Brand"
            objectId="rfTXdAPdWr"
            interactionKey="brandId"
          />

          <pre>
            {`
<ButtonFollow
  onLogin={() => {}}
  className="Brand"
  objectId="rfTXdAPdWr"
  interactionKey="brandId"
/>
            `}
          </pre>
        </section>

        <section>
          <h2>ButtonLogout</h2>
          <ButtonLogout onClick={() => { this.logOut(); }} />
          <pre>
            {`
<ButtonLogout onClick={() => { this.logOut() }} />
            `}
          </pre>
        </section>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
