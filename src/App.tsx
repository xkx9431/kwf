import React,{useState} from 'react';
import Button ,{ButtonSize,ButtonType}from './components/Button/button'
import Menu from './components/Menu/menu'
import  MenuItem from './components/Menu/menuItem'
import SubMenu  from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import Paginator from './components/Paginator/pageinator'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)





function App() {
  //
const list = Array.from({ length: 90 }).map((v, i) => i + 1);
const MAX_ITEMS_PER_PAGE = 10;

const [currentPage, setCurrentPage] = useState(1);
const lastIndex = MAX_ITEMS_PER_PAGE * currentPage;
const firstIndex = lastIndex - MAX_ITEMS_PER_PAGE;
//
  return (
    <div className="App">
      <Icon icon='arrow-down' size='lg' theme ='danger'/>
      <header className="App-header">
        <Menu defaultIndex = '0' mode='vertical' defaultOpenSubMenuProps={['1']} >
          <MenuItem >
            cool link 1
          </MenuItem>
          <MenuItem >
            cool link 2
          </MenuItem>
          <SubMenu title = 'dropdown'>
            <MenuItem>
              dropdown1
            </MenuItem>
            <MenuItem>
              dropdown2
            </MenuItem>
          </SubMenu>
          <MenuItem >
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
      <Paginator
        total={list.length}
        currentPage={currentPage}
        itemsPerPage={MAX_ITEMS_PER_PAGE}
        onChangePage={ (page:number) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
}

export default App;
