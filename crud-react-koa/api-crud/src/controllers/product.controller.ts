import { Context } from "koa";
import { pool } from "../config/db";
import { Product } from "../models/product.model";

export const getProducts = async (ctx: Context) => {
  try {
    const page = Number(ctx.query.page) || 1;
    const limit = Number(ctx.query.limit) || 10;
    const offset = (page - 1) * limit;

    const totalResult = await pool.query<{ count: string }>(
      "SELECT COUNT(*) FROM products"
    );
    const total = Number(totalResult.rows[0].count);

    const result = await pool.query<Product>(
      "SELECT * FROM products ORDER BY id ASC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    ctx.status = 200;
    ctx.body = {
      status: 200,
      message: "Success",
      data: result.rows,
      pagination: {
        total,
        limit,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
};

export const createProduct = async (ctx: Context) => {
  try {
    const { name, price, stock } = ctx.request.body as Partial<Product>;

    if (!name || price === undefined || stock === undefined) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: "name, price and stock are required",
        data: null,
      };
      return;
    }

    const result = await pool.query(
      `INSERT INTO products (name, price, stock)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [name, price, stock]
    );

    ctx.status = 201;
    ctx.body = {
      status: 201,
      message: "Product created successfully",
      data: result.rows[0],
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
};

export const updateProduct = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const { name, price, stock, is_active } = ctx.request
      .body as Partial<Product>;

    const result = await pool.query<Product>(
      `UPDATE products
         SET name=$1, price=$2, stock=$3, is_active=$4
         WHERE id=$5
         RETURNING id, name, price, stock, is_active, created_at, updated_at`,
      [name, price, stock, is_active, id]
    );

    if (result.rowCount === 0) {
      ctx.status = 404;
      ctx.body = {
        status: 404,
        message: "Product not found",
        data: null,
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: 200,
      message: "Product updated successfully",
      data: result.rows[0],
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
};

export const deleteProduct = async (ctx: Context) => {
  try {
    const { id } = ctx.params;

    const result = await pool.query("DELETE FROM products WHERE id=$1", [id]);

    if (result.rowCount === 0) {
      ctx.status = 404;
      ctx.body = {
        status: 404,
        message: "Product not found",
        data: null,
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: 200,
      message: "Product deleted successfully",
      data: null,
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
};
