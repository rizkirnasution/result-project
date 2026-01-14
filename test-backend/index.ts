import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

//in memory store
interface DataItem {
  id: number;
  data: any;
}

let dataItem: DataItem[] = [];
let currentId = 1;

//routes
app.get("/data", (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "Success",
    data: dataItem,
  });
});

app.post("/data", (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        status: 400,
        message: "Data is required",
        data: null,
      });
    }

    const newData: DataItem = {
      id: currentId++,
      data,
    };

    dataItem.push(newData);

    return res.status(201).json({
      status: 201,
      message: "Success created data",
      data: newData,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
});

app.put("/data/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { data } = req.body;

    const existingData = dataItem.find((item) => item.id === id);

    if (!existingData) {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
        data: null,
      });
    }

    existingData.data = data;

    return res.status(200).json({
      status: 200,
      message: "Updated Successfully",
      data: existingData,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: err,
    });
  }
});

app.delete("/data/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existDataIndex = dataItem.findIndex((item) => item.id === id);

    if (existDataIndex === -1) {
      return res.status(404).json({
        status: 404,
        message: "Data not found",
        data: null,
      });
    }

    dataItem.splice(existDataIndex, 1);

    return res.status(200).json({
      status: 200,
      message: "Data deleted",
      data: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: err,
    });
  }
});

app.use((err: Error, req: Request, res: Response) => {
  return res.status(400).json({
    status: 400,
    message: err.message || "Unexpected error",
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
