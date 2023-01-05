// import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../constans/constans';

export function Categories() {

  const [searchParams, setSearchParams] = useSearchParams();

  const onClickCategory = (category:string) => {

    const categories = searchParams.get('categories');
    const categoriesArray = categories?.split(',') || [];

    console.log(categoriesArray);
        
    if (categoriesArray.includes(category)) {
      const newCategories = categoriesArray.filter((el) => el != category);

      if (!newCategories.length) {
        setSearchParams({});
      } else {
        setSearchParams({ categories:newCategories.join(',') });
      }
      
    } else {
      const newCategories = [...categoriesArray, category];
      if (!newCategories.length) {        
          setSearchParams({});
      } else {
        setSearchParams({ categories:newCategories.join(',') });
      }
    }
  };  

  return (
    <div className="Categories w- 1/4">
       <ul>
        {CATEGORIES.map((category, i) => { 
          return (<>
            <button className='w-32 border ml-2 mt-2 px-2' onClick={( ) => onClickCategory(category)} key = {i}>{category}</button><br/>
          </>);            
        })}
      </ul> 
    </div>

  );
}