import { CircularProgress, Stack, Pagination, Box } from '@mui/material';
import { useGetProductByNameQuery } from '../../Redux/product';
import MainHeader from './MainHeader';
import ProductsContainer from './ProductsContainer';
import { useContext, useState } from 'react';

const Main = () => {
  const [page, setPage] = useState(1);
  const [endPoint, setEndPoint] = useState(
    `&filters[desc][$ne]=a`);
  const { data, error, isLoading } = useGetProductByNameQuery(`/products?populate=*&pagination[page]=${page}&pagination[pageSize]=12${endPoint}`);
  const totalPages = data?.meta?.pagination?.pageCount;
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0,950)
  };

  return (
    <section 
    style={{
      paddingBottom: "70px"
    }}>
        <MainHeader setEndPoint={setEndPoint} setPage={setPage} />
        { isLoading ? (
        <Stack justifyContent="center" alignItems="center" py={5}>
          <CircularProgress size="6rem" /> 
        </Stack> )
        : <ProductsContainer products={data?.data} />}
        <Box display="flex" justifyContent="center" mt={6}>
      <Pagination count={totalPages} variant="outlined" color="primary"
      page={page} onChange={handleChange}
      />
    </Box>
    </section>
  )
}

export default Main