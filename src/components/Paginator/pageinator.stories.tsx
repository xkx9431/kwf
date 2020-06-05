import React, {useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
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
  const lastIndex = MAX_ITEMS_PER_PAGE * currentPage;
  const firstIndex = lastIndex - MAX_ITEMS_PER_PAGE;
  return(
    <Paginator
    total={90}
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