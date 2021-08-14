from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import todoDBOp as todoDB

app = FastAPI()

origins = [
    "http://localhost:3000", #development
    "localhost:3000",
    "http://localhost:5000", #production
    "localhost:5000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/todo", tags=["todos"])
async def get_list() -> dict:
    conn = todoDB.createConnetion("./database/database.db")
    todoList = todoDB.queryTodo(conn)
    conn.close()
    return {"todoList": todoList}

@app.post("/api/todo", tags=["todos"])
async def add_list(data: dict) -> dict:
    conn = todoDB.createConnetion("./database/database.db")
    await todoDB.insertRecord(conn, data["item"], data["description"])
    conn.close()
    return {"response": "Added"}

@app.delete("/api/todo/{item_id}", tags=["todos"])
async def delete_todo(item_id: int):
    conn = todoDB.createConnetion("./database/database.db")
    await todoDB.deleteRecord(conn, item_id)
    conn.close()
    return {"response": "Deleted"}

@app.get("/", tags=["root"])
async def get_root():
    return {"response": "Hello World"}