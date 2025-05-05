import { safeParse } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { strToBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}


export const addProduct = async(data: ProductData) => {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            const response = await axios.post(url, result.output);
            console.log(response);
            
        } else {
            throw new Error("Datos no válidos");
        }
        
    } catch (error) {
        console.log(error);
        
    }
    
}

export const getProducts = async() => {
    const url = `${import.meta.env.VITE_API_URL}/api/products`

    try {
        const {data} = await axios(url);
        
        
        const result = safeParse(ProductsSchema, data.data);
        if (result.success) {
            return result.output
            
        } else {
            throw new Error("ocurrio un error");
        }
        
    } catch (error) {
        console.log(error);
        
    }
    
}


export const getProductById = async(id: Product['id']) => {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`

    try {
        const {data} = await axios(url);
        const result = safeParse(ProductSchema, data.data);
        console.log(result);
        if (result.success) {
            return result.output
            
        } else {
            throw new Error("ocurrio un error");
        }
        
    } catch (error) {
        console.log(error);
        
    }
    
}

export const updateProduct = async(data: ProductData, id: Product['id']) => {

    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: Number(data.price),
            availability: strToBoolean(data.availability as string)
        })
        
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output);
            
            
        } else {
            throw new Error("Datos no válidos");
        }
        
    } catch (error) {
        console.log(error);
        
    }
    
}

export const deleteProduct = async( id: Product['id']) => {

    try {
        
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url);
            
    } catch (error) {
        console.log(error);
        
    }
    
}

export const updateAvailabilityProduct = async( id: Product['id']) => {

    try {
        
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url);
            
    } catch (error) {
        console.log(error);
        
    }
    
}
