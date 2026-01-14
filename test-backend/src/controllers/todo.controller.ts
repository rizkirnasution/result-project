import { Request, Response } from "express";
import { todos } from "../data/todo.store";
import { Todo } from "../models/todo.model";

let currentId = 1;

export const getAllTodos = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: 200,
      message: "Success get todos",
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

export const getTodoById = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Todo not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Sucess get todo",
      data: todo,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        status: 400,
        message: "Title is required",
        data: null,
      });
    }

    const newTodo: Todo = {
      id: currentId++,
      title,
      completed: false,
    };

    todos.push(newTodo);

    res.status(201).json({
      status: 201,
      message: "Success Created todo",
      data: newTodo,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

export const updateTodo = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { title, completed } = req.body;

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: "Todo not found",
        data: null,
      });
    }

    if (title !== undefined) {
      todo.title = title;
    }

    if (completed !== undefined) {
      todo.completed = completed;
    }

    return res.status(200).json({
      status: 200,
      message: "Updated Successfully",
      data: todo,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};

export const deleteTodo = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        status: 404,
        message: "Todo not found",
        data: null,
      });
    }

    todos.splice(todoIndex, 1);

    return res.status(200).json({
      status: 200,
      message: "Todo deleted successfully",
      data: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};
