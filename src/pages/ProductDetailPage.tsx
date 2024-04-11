import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const StyleLink = styled(Link)`
  color: black;
  text-decoration: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  background-color: lightblue;
  &:hover{
    curser: pointer;
  }
`;

const ProductContainer = styled.div`
  width: 80%;
  padding-top: 20px;
`;

const ProductContent = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 15px;
`;

const ProductItem = styled.div`
  width: 50%;
  padding: 10px;
  border-radius: 4px;
`;

const ProductThumbnail = styled.img`
  width: 50%;
  height: auto;
  border-radius: 4px;
`;

const ProductEtc = styled.div`
  margin-top: 5px;
`;

const ProductImageWrapper = styled.div`
margin-top: 50px;
width: 100%;
display: flex;
overflow: scroll;
`;

const ProductImage = styled.img`
  height: 100%;
  margin-right: 10px;
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

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then((data: Product) => {
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  const handleGoBack = () => {
    navigate('back', { state: { from: location } });
  };

  return (
    <>
      {product ? (
        <ContentWrapper>
          <StyleLink to="/" onClick={handleGoBack}>목록으로 돌아가기</StyleLink>
          <ProductContainer>
            <ProductContent>
              <ProductThumbnail src={product.thumbnail} alt={product.title} />
              <ProductItem>
                <ProductEtc>brand : {product.brand}</ProductEtc>
                <ProductEtc>title : {product.title}</ProductEtc>
                <ProductEtc>price : {product.price}$</ProductEtc>
                <ProductEtc>{product.description}</ProductEtc>
              </ProductItem>
            </ProductContent>
            <ProductImageWrapper>
              {product.images.map((element, index) => (
                <ProductImage key={index} src={element} alt='product image' />
              ))}
            </ProductImageWrapper>
          </ProductContainer>
        </ContentWrapper>
      ) : (
        <div>로딩 중...</div>
      )}
    </>
  );
};

export default ProductDetailPage;