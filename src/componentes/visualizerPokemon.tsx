import {useState, useEffect} from "react";

import random from "../api";
import {Pokemon} from "../types";
import CompareName from "../logic/CompareName";

import ModalResult from "./ModalResult";

function VisualizerPokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [brightness, setBrightness] = useState<string>("0%");
  const [guess, setGuess] = useState<string>("");
  const [guessed, setGuessed] = useState<boolean | null>(null);
  const [giveup, setGiveup] = useState<boolean>(false);
  const [aciertos, setAciertos] = useState<number>(0);
  const [errores, setErrores] = useState<number>(0);

  useEffect(() => {
    const storedAciertos = localStorage.getItem("aciertos");
    const storedErrores = localStorage.getItem("errores");

    if (storedAciertos) {
      setAciertos(parseInt(storedAciertos, 10));
    }
    if (storedErrores) {
      setErrores(parseInt(storedErrores, 10));
    }
  }, []);

  const fetchRandomPokemon = async () => {
    const result = await random.random();

    setPokemon([result]);
  };

  const startGame = () => {
    fetchRandomPokemon();
  };

  const handleClick = () => {
    if (CompareName(pokemon[0]?.name, guess)) {
      setGuessed(true);
      setBrightness("100%");
      setGuess("");
      setAciertos(aciertos + 1);
      localStorage.setItem("aciertos", (aciertos + 1).toString());
      setTimeout(() => {
        setBrightness("0%");
        setGuessed(null);
        fetchRandomPokemon();
      }, 3000);
    } else {
      setGuessed(false);
      setGuess("");
      setBrightness("0%");
      setErrores(errores + 1);
      localStorage.setItem("errores", (errores + 1).toString());
      setTimeout(() => {
        setGuessed(null);
      }, 2000);
    }
  };

  const handleClickAnother = () => {
    setGuessed(false);
    setBrightness("100%");
    setGiveup(true);
    setGuess("");
    setErrores(errores + 1);
    localStorage.setItem("errores", (errores + 1).toString());
    setTimeout(() => {
      setGiveup(false);
      fetchRandomPokemon();
      setBrightness("0%");
      setGuessed(null);
    }, 2000);
  };

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 20}}>
      {giveup ? (
        <ModalResult answer={`${pokemon[0]?.name}`} color="red" giveup={true} result={guessed} />
      ) : (
        guessed != null && (
          <ModalResult
            answer={`${pokemon[0]?.name}`}
            color={guessed ? "green" : "red"}
            giveup={false}
            result={guessed}
          />
        )
      )}

      <div
        className="nes-container with-title is-centered"
        style={{width: 600, backgroundColor: "white"}}
      >
        <p key={pokemon[0]?.id} className="title">
          ¿Quién es este Pokemon?
        </p>
        {pokemon.length > 0 ? (
          <img
            draggable={false}
            height={300}
            src={pokemon[0]?.image}
            style={{filter: `brightness(${brightness})`}}
            width={300}
          />
        ) : (
          <img draggable={false} height={300} src="../assets/screenshot-0.jpg" />
        )}
        <div style={{marginTop: 20}}>
          <div>
            {pokemon.length > 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    marginBottom: 10,
                    marginTop: 50,
                  }}
                >
                  <input
                    className="nes-textarea"
                    id="textarea_field"
                    style={{backgroundColor: "white"}}
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                  />
                  <button className="nes-btn is-primary" onClick={handleClick}>
                    Adivinar!
                  </button>
                  <button
                    className="nes-btn is-error"
                    style={{marginLeft: 10}}
                    onClick={handleClickAnother}
                  >
                    Pasar
                  </button>
                </div>
              </>
            ) : (
              <button className="nes-btn is-primary" onClick={startGame}>
                Jugar!
              </button>
            )}
          </div>
        </div>
      </div>
      {pokemon.length > 0 && (
        <div>
          <p>
            Aciertos: {aciertos} - Errores: {errores}
          </p>
        </div>
      )}
    </div>
  );
}

export default VisualizerPokemon;
