import { ActionFunctionArgs, Form, redirect, useNavigate, useFetcher } from "react-router"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    producto: Product
}

export async function action({ params}: ActionFunctionArgs){
    console.log(params);
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
    }
    return redirect('/');
}


export default function ProductDetails({producto}: ProductDetailsProps) {
    const fetcher = useFetcher();
    const navigate = useNavigate();

    const availability = producto.availability;
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {producto.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(producto.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        className={` cursor-pointer`}
                        type="submit"
                        name="id"
                        value={producto.id}
                    >
                        {availability ? 'Disponible':'No Disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-indigo-500 text-white w-full py-1 rounded-lg shadow cursor-pointer"
                        onClick={()=>navigate(`/productos/${producto.id}/editar`)}
                    >Editar</button>
                    <Form 
                        method="POST"
                        action={`productos/${producto.id}/eliminar`}
                        className="w-full"
                    >
                        <button
                            type="submit"
                            className="bg-red-500 text-white w-full py-1 rounded-lg shadow cursor-pointer"
                        >Eliminar</button>
                    </Form>
                </div>
            </td>
        </tr> 
    )
}
