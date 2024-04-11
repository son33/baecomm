import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { RootState, setSearchValueAndScrollPosition } from '../store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  background-color: lightblue;
  color: white;
  cursor: pointer;
`;

interface SearchBarProps {
  onSearchSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchSubmit }) => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state: RootState) => state.search);
  const [inputValue, setInputValue] = useState<string>(searchValue);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchValueAndScrollPosition({ searchValue: inputValue, products: [], pages: 10, scrollPosition: 0}));
    onSearchSubmit();
  };
  
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(setSearchValueAndScrollPosition({ searchValue: inputValue, products: [], pages: 10, scrollPosition: 0}));
      onSearchSubmit();
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <SearchWrapper>
        <SearchInput type="text" placeholder="검색어를 입력해주세요" value={inputValue} onChange={handleSearchChange} onKeyDown={handleEnterPress} />
        <SearchButton type="submit">검색</SearchButton>
      </SearchWrapper>
    </form>
  );
};

export default SearchBar;