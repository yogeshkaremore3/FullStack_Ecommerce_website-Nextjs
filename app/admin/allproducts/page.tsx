'use client'
import React , {useEffect,useState} from 'react'
import theme from "../../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../../src/layouts/FullLayout";
import ProductPerfomance from '@/src/components/dashboard/AllProducts';
import { Grid } from '@mui/material';



const Allproducts = () => {

  const [products, setproducts] = useState([])

  useEffect(() => {
   
    fetch('http://localhost:3000/api/getproducts').then((response) => response.json()).then((data)=>{

          setproducts([...data.products]);

          // console.log([...data.products]);

    })

  }, [])
  
  console.log(products)

  return (
    <ThemeProvider theme={theme}> 
  
  <style jsx global>{`
  
  footer{
    display: none;
  }
  `}</style>
    <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ProductPerfomance products={products} />
      </Grid>
    </Grid>
    </FullLayout>
    </ThemeProvider>
  )
}

export default Allproducts