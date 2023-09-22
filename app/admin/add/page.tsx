'use client'
import React ,{useState} from 'react'
import theme from "../../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../../src/layouts/FullLayout";
import BaseCard from '@/src/components/baseCard/BaseCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";


const AddProduct = () => {

  const [form, setForm] = useState({})

  const converbase64 =(e)=>{

    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = (e) => {
      setForm({...form, image: e.target.result})
    }
   }

  const handleChange = (e) => {

    setForm({...form, [e.target.name]: e.target.value})
   }

   const handleSubmit = async (e) => {
     e.preventDefault()
     const res = await fetch('http://localhost:3000/api/addproducts',{
      
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{brand:form.brand,title:form.title,slug:form.slug,price:form.price,desc:form.description,img:form.image,category:form.category,size:form.size,color:form.color,availableQty:form.quantity}]),
      })
      const data = await res.json()
       if(data.success)
       {
        toast.success('product successfully added to the database!', {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

         setForm({})
       }
       else{

        toast.error('some error occured!', {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });


       }
    
   }

  

  return (
    <ThemeProvider theme={theme}> 
    <style jsx global>
    {`
    footer {
      display: none;
    }
    
    `}
    </style>
    <FullLayout>
    <ToastContainer
position="bottom-left"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add a Product">
          <Stack spacing={3}>
            <TextField  onChange={handleChange}  value={form.brand ? form.brand:""} name="brand" label="brand" variant="outlined" />
            <TextField
              value={form.title?form.title:""}
              name="title"
              label="title"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField  onChange={handleChange}  value={form.category?form.category:""} name="category" label="category" variant="outlined" />
            <TextField  onChange={handleChange}  value={form.size?form.size:""} name="size" label="size" variant="outlined" />
            <TextField  onChange={handleChange}  value={form.color?form.color:""} name="color" label="color" variant="outlined" />
            <TextField  onChange={handleChange}  value={form.price?form.price:""} name="price" label="price" variant="outlined" />
            <TextField  onChange={handleChange}  value={form.quantity?form.quantity:"" } name="quantity" label="quantity" variant="outlined" />   
            <TextField  onChange={handleChange}  value={form.slug?form.slug:""} name="slug" label="slug" variant="outlined" />
            <TextField  onChange={converbase64}  variant="outlined"  name="img" type="file" />




           
            <TextField
              name="description"
              label="Description"
              value={form.description?form.description:""}
              onChange={handleChange}
              multiline
              rows={4}
              
            />
           
          </Stack>
          <br />
          <Button disabled={!(form.brand && form.title && form.slug && form.price && form.description && form.image && form.category && form.size && form.color && form.quantity)} onClick={handleSubmit} variant="outlined" mt={2}>
            Submit
          </Button>
        </BaseCard>
      </Grid>     
    </Grid>
    </FullLayout>
    </ThemeProvider>
  )
}

export default AddProduct