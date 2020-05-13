import React from 'react';
import Button ,{ButtonSize,ButtonType}from './components/Button/button'
import Menu from './components/Menu/menu'
import  MenuItem from './components/Menu/menuItem'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex = {0} mode={'vertical'}>
          <MenuItem index={0}>
            cool link 1
          </MenuItem>
          <MenuItem index = {1}>
            cool link 2
          </MenuItem>
          <MenuItem index = {2}>
            cool link 3
          </MenuItem>
        </Menu>


        <br/>
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
