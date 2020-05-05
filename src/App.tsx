import React from 'react';
import Button ,{ButtonSize,ButtonType}from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>nihao</Button>
        <Button btnType = {ButtonType.Primary} size ={ButtonSize.Large}> nihao</Button>
        <Button btnType = {ButtonType.Danger} > Danger </Button>
        <Button btnType = {ButtonType.Danger} size = {ButtonSize.Small} > Danger </Button>
        <Button btnType = {ButtonType.Link} href ="http://www.baidu.com" disabled={true}> Disabled</Button>
        <Button btnType = {ButtonType.Link} href ="http://www.baidu.com"> baidu.com</Button>
        
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

      </header>
    </div>
  );
}

export default App;
