import * as React from 'react';

const cards = [{ key: 1, title: 'one', content: 'one content' },
{ key: 2, title: 'two', content: 'two content' },
{ key: 3, title: 'three', content: 'three content' },
{ key: 4, title: 'four', content: 'four content' }];

export function App() {
  const list = ['Marleine', 'Andrew'];
  const [index, setIndex] = React.useState(0);
  const [counterValue, setCounterValue] = React.useState<number | undefined>(undefined);

  const onClickChangeName = React.useCallback(() => {
    setIndex((index + 1) % list.length)
  }, [index, list.length]);

  const name = `${list[index]} ${counterValue !== undefined ? counterValue : ''}`;
  const changeValue = React.useCallback(() => {
    setCounterValue(undefined);
  }, []);

  return (
    <>
      <AppHeader title={name} />
      <button onClick={changeValue}>Change Value</button>
      <button onClick={onClickChangeName}> Change Name </button>
      {counterValue === undefined && <AppCounter onSubmit={setCounterValue} />}
      <div className={"app-card-list"}>
        {
          cards.map(card => <Card key={card.key} title={card.title} content={card.content} />)
        }
      </div>
      <div className="App">
        <header className="App-header">


        </header>
      </div>
    </>
  );
}

interface AppHeaderProps {
  title?: string;
}

export function AppHeader(props: AppHeaderProps) {
  const { title } = props;
  return <h1>Title: {title}</h1>;
}

function AppCounter(props: { onSubmit: (value: number) => void }) {
  const { onSubmit } = props;
  const [counterValue, setCounterValue] = React.useState(0);

  const onClickPlus = React.useCallback(() => {
    setCounterValue(counterValue + 1)
  }, [counterValue]);

  const onClickMinus = React.useCallback(() => {
    setCounterValue(counterValue - 1)
  }, [counterValue]);

  const onSubmitInternal = React.useCallback(() => {
    onSubmit(counterValue);
  }, [onSubmit, counterValue])
  return <>
    <h4>Counter value: {counterValue}</h4>
    <button onClick={onClickPlus}>+</button>
    <button onClick={onClickMinus}>-</button>
    <button onClick={onSubmitInternal}>Submit</button>
  </>;
}

function Card(props: { title: string, content?: string }) {
  const { title, content } = props;
  const logTitleToConsole = React.useCallback(() => {
    console.log(title);
  }, [title]);
  return <div className={"app-card"} onClick={logTitleToConsole}>
    <div className={"app-card-title"}>
      {title}
    </div>
    <div className={"app-card-content"}>
      {content}
    </div>
  </div>;
}
