import React, { createContext, useContext, useReducer } from 'react';
import { useEffect } from 'react';
import { useProductContext } from './ProductContext';

const FilterContext = createContext();

const initialstate = {
  filter_products: [],
  all_products: [],
  sorting_value: 'lowest',
};

const filterReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOAD_FILTERED_PRODUCTS':
      return {
        ...state,
        filter_products: [...payload],
        all_products: [...payload],
      };

    case 'GET_SORT_VALUE':
      const sortValue = document.getElementById('sort').value; // Fetching sort value directly
      return {
        ...state,
        sorting_value: sortValue,
      };

    case 'SORTING_PRODUCTS':
      let newSortData = [...state.filter_products]; // Use the current filter_products for sorting

      // Only sort if filter_products has data
      if (newSortData.length > 0) {
        if (state.sorting_value === 'lowest') {
          newSortData = newSortData.sort((a, b) => a.price - b.price);
        }

        if (state.sorting_value === 'highest') {
          newSortData = newSortData.sort((a, b) => b.price - a.price);
        }

        if (state.sorting_value === 'a-z') {
          newSortData = newSortData.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          );
        }

        if (state.sorting_value === 'z-a') {
          newSortData = newSortData.sort((a, b) =>
            b.name.toLowerCase().localeCompare(a.name.toLowerCase())
          );
        }
      }

      return {
        ...state,
        filter_products: newSortData, // Update filtered products after sorting
      };

    default:
      return state;
  }
};

export default function FilterContextProvider({ children }) {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(filterReducer, initialstate);

  // Load products when they change
  useEffect(() => {
    if (products && products.length > 0) {
      dispatch({ type: 'LOAD_FILTERED_PRODUCTS', payload: products });
    }
  }, [products]);

  // Sort products when sorting value changes
  const sorting = () => {
    dispatch({ type: 'GET_SORT_VALUE' });
  };

  useEffect(() => {
    // Only trigger sorting if products are loaded
    if (state.filter_products.length > 0) {
      dispatch({ type: 'SORTING_PRODUCTS' });
    }
  }, [state.sorting_value]);

  return (
    <FilterContext.Provider value={{ ...state, sorting }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilterContext = () => useContext(FilterContext);
