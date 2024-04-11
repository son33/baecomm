import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSearchValueAndScrollPosition } from '../store/store';

const ProductListContainer = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductBrandTitle = styled.div`
  display: flex;
  padding-top: 20px;
`;

const ProductItem = styled.div`
  width: 45%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
    ${ProductBrandTitle}{
      color: blue;
    }
  }
`;

const StyleLink = styled(Link)`
  color: black;
  text-decoration-line: none;
`;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductBrand = styled.div`
  font-weight: bold;
`;

const ProductTitle = styled.div`
  margin-left: 20px;
`;

const ProductPrice = styled.div`
  margin-top: 5px;
`;

const MoreButton = styled.button`
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  background-color: lightblue;
  color: white;
  cursor: pointer;
  margin: 20px;
`;

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  thumbnail: string;
  images: string[];
}

const ProductListPage: React.FC = () => {
  const dispatch = useDispatch();
  const { searchValue, products, pages, scrollPosition } = useSelector((state: RootState) => state.search);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      if (searchValue !== '') {
        response = await fetch(`https://dummyjson.com/products/search?q=${searchValue}`);
      } else {
        response = await fetch(`https://dummyjson.com/products`);
      }
      const data = await response.json();
      dispatch(setSearchValueAndScrollPosition({ searchValue, products: data.products, pages, scrollPosition }));
    };
    fetchData();
  }, [searchValue, dispatch]);

  useEffect(() => {
    setVisibleProducts(products.slice(0, pages));
  }, [products, pages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollPosition !== 0) window.scrollTo(0, scrollPosition);
    }, 100);
    return () => clearTimeout(timer);
  }, [scrollPosition, dispatch]);

  const handleMoreButton = () => {
    dispatch(setSearchValueAndScrollPosition({ searchValue, products, pages: pages + 10, scrollPosition }));
    setVisibleProducts(p => {
      return products.slice(0, pages);
    });
  };

  const handleProductLink = () => {
    dispatch(setSearchValueAndScrollPosition({ searchValue, products, pages, scrollPosition: window.scrollY }));
  }

  return (
    <>
      <SearchBar onSearchSubmit={() => { }}></SearchBar>
      <ProductListContainer>
        {visibleProducts.map((product: Product, index: number) => (
          <ProductItem key={index}>
            <StyleLink to={`/product/${product.id}`} onClick={handleProductLink}>
              <ProductImage src={product.thumbnail} alt={product.title} />
              <ProductBrandTitle>
                <ProductBrand>{product.brand}</ProductBrand>
                <ProductTitle>{product.title}</ProductTitle>
              </ProductBrandTitle>
              <ProductPrice>price : {product.price}$</ProductPrice>
            </StyleLink>
          </ProductItem>
        ))}
      </ProductListContainer>
      {products.length > visibleProducts.length && <MoreButton onClick={handleMoreButton}>더보기</MoreButton>}
    </>
  );
};

export default ProductListPage;