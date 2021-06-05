import React from 'react';
import CharactersService from '../services/charactersAPI';

require('dotenv');

const { REACT_APP_DEVELOPMENT, REACT_APP_HAWKINS_URL, REACT_APP_HAWKINS_TIMEOUT,
  REACT_APP_UPSIDEDOWN_URL, REACT_APP_UPSIDEDOWN_TIMEOUT } = process.env;

const getRealityClass = (hereIsTheUpsideDownWorld) => (
  hereIsTheUpsideDownWorld ? 'upside-down' : 'stranger-things'
);

const strangerThingsConfig = {
  url: REACT_APP_HAWKINS_URL,
  timeout: REACT_APP_HAWKINS_TIMEOUT,
};

const upsideDownConfig = {
  url: REACT_APP_UPSIDEDOWN_URL,
  timeout: REACT_APP_UPSIDEDOWN_TIMEOUT,
};

const charactersService = new CharactersService(strangerThingsConfig);
const charactersUpsideDownService = new CharactersService(upsideDownConfig);

class StrangerThings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hereIsTheUpsideDownWorld: false,
      characterName: '',
      characters: [],
      page: 1,
    };

    this.handleInput = this.handleInput.bind(this);
    this.changeRealityClick = this.changeRealityClick.bind(this);

    this.searchClick = this.searchClick.bind(this);
    this.searchCharacter = this.searchCharacter.bind(this);

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  handleInput(event) {
    this.setState({
      characterName: event.target.value,
    });
  }

  changeRealityClick() {
    const { hereIsTheUpsideDownWorld } = this.state;
    this.setState({
      hereIsTheUpsideDownWorld: !hereIsTheUpsideDownWorld,
      characters: [],
    });
  }

  searchClick() {
    this.setState(
      {
        page: 1,
      },
      this.searchCharacter(1),
    );
  }

  searchCharacter(pages) {
    const { characterName, hereIsTheUpsideDownWorld, page } = this.state;
    const service = hereIsTheUpsideDownWorld
      ? charactersUpsideDownService
      : charactersService;

    const numberOfPages = 10;
    service
      .getCharacters(characterName, pages || page, numberOfPages)
      .then(({ data: characters }) => {
        this.setState({
          characters,
        });
      });
  }

  nextPage() {
    const { page, characters } = this.state;

    if (!characters.length) return;
    this.setState(
      {
        page: page + 1,
      },
      () => this.searchCharacter(),
    );
  }

  previousPage() {
    const { page } = this.state;
    if (page <= 1) return;

    this.setState(
      {
        page: page - 1,
      },
      () => this.searchCharacter(),
    );
  }

  renderHeader() {
    return (
      <tr>
        <th>Nome</th>
        <th>Origem</th>
        <th>Status</th>
      </tr>
    );
  }

  renderCharacters(char) {
    return (
      <tr key={ char.name }>
        <td>{char.name}</td>
        <td>{char.origin}</td>
        <td>{char.status}</td>
      </tr>
    );
  }

  render() {
    const { hereIsTheUpsideDownWorld, characterName, characters, page } = this.state;
    return (
      <div className={ `reality ${getRealityClass(hereIsTheUpsideDownWorld)}` }>
        <div className="content strangerfy">
          { REACT_APP_DEVELOPMENT === 'true' ? <span>Em desenvolvimento</span> : null }
          <div className="change-reality">
            <button type="button" onClick={ this.changeRealityClick }>
              {' '}
              Mudar de Realidade
            </button>
          </div>
          <div>
            <input
              placeholder="Nome do Personagem"
              onChange={ this.handleInput }
              value={ characterName }
            />
            <button type="button" onClick={ this.searchClick }>Pesquisar</button>
          </div>
          <div>
            <table>
              <thead>
                {this.renderHeader()}
              </thead>
              <tbody>
                {characters.map(this.renderCharacters)}
              </tbody>
            </table>
          </div>
          <div>
            <p>
              Página atual:
              {page}
            </p>
          </div>
          <div>
            <button type="button" onClick={ this.previousPage }>Anterior</button>
            <button type="button" onClick={ this.nextPage }>Próximo</button>
          </div>
        </div>
      </div>
    );
  }
}

export default StrangerThings;
