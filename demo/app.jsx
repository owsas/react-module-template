import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import Parse from 'parse';
import { DataBrowser as Data } from '@owsas/geopromos-private-api/out/DataBrowser';
import '@owsas/geopromos-web-css/build/geopromos.css';

import { ButtonLike, ButtonFollow, ButtonLogout, IntelligentCard } from '../src';


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

    const promo = new Parse.Object('Promo');
    promo.id = '123';
    promo.set('start', new Date());
    promo.set('pics', ['http://lorempixel.com/300/200']);
    promo.set('name', 'Promoción de prueba');
    promo.set('description', 'Esta es la descripción 🔥');

    const product = new Parse.Object('Product');
    product.id = '123';
    product.set('start', new Date());
    product.set('price', 12310);
    product.set('pics', ['http://lorempixel.com/300/200']);
    product.set('defaultName', 'Soy un producto');
    product.set('description', 'Esta es la descripción 🔥');

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

        <section>
          <h3>IntelligentCard</h3>
          <IntelligentCard obj={promo} />
          <div className="space" />
          <IntelligentCard obj={product} />
        </section>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
