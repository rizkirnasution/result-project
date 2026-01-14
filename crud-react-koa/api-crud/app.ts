import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import productRoutes from "./src/routes/product.route";

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(productRoutes.routes());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
export default app;