import React, {useState } from 'react'
import { storiesOf } from '@storybook/react'
import Paginator from './pageinator'


  //        
  // currentPage,
  // itemsPerPage,
  // maxItems = Infinity,
  // onChangePage,
  // total

const PaginatorSample = ()=>{
  const list = Array.from( { length:90 } ).map( (v,i)=>i+1 );
  const MAX_ITEMS_PER_PAGE = 10;
  
  const [currentPage, setCurrentPage] = useState(1);
  return(
    <Paginator
    total={list.length}
    currentPage={currentPage}
    itemsPerPage={MAX_ITEMS_PER_PAGE}
    onChangePage={ (page:number) => {
      setCurrentPage(page);
    }}
  />
  )
}

storiesOf('Pageinator component',module)
    .add('Pageinator', PaginatorSample )