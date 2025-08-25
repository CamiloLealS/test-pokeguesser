function ModalResult({
  result,
  color,
  giveup,
  answer,
}: {
  result: boolean | null;
  color: string;
  giveup: boolean;
  answer: string;
}) {
  return (
    <div className="nes-container is-rounded" style={{backgroundColor: color, textAlign: "center"}}>
      {giveup && <p>Te rendiste! La respuesta era {answer}.</p>}
      {!giveup && result && (
        <div>
          <p>Felicidades! Lo adivinaste!</p>
          <p>El pokemon era {answer}!</p>
        </div>
      )}
      {result === false && !giveup && <p>Sorry, that&apos;s incorrect. Try again!</p>}
    </div>
  );
}

export default ModalResult;
