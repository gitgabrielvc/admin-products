import { createBrowserRouter } from "react-router";
import Layout from "./layouts/Layout";
import CreateProduct, {action as newProductAction} from "./views/CreateProduct";
import Products, {loader as productsLoader, action as updateAvailabilityAction} from "./views/Products";
import EditProduct, {loader as editLoader, action as updateProductAction} from "./views/EditProduct";
import {action as deleteAcion} from "./components/ProductDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Products/>,
        loader: productsLoader,
        action: updateAvailabilityAction
      },
      {
        path:"productos/nuevo",
        element: <CreateProduct/>,
        action: newProductAction
      },
      {
        path:"productos/:id/editar",
        element: <EditProduct/>,
        loader: editLoader,
        action: updateProductAction
      },
      {
        path:"productos/:id/eliminar",
        action: deleteAcion
      }
    ]
  },
]);
