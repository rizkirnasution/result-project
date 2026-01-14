import Router from "koa-router";
import { getProducts, createProduct, updateProduct, deleteProduct} from "../controllers/product.controller";

const router = new Router({ prefix: "/products"});

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

