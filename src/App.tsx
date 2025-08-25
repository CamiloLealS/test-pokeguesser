import VisualizerPokemon from "./componentes/visualizerPokemon";

function App() {
  return (
    <div className="App">
      <div
        style={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 50}}
      >
        <i className="nes-pokeball" style={{marginRight: "10px"}} />
        <h1>Pokemon Guesser</h1>
      </div>
      <VisualizerPokemon />
    </div>
  );
}

export default App;
