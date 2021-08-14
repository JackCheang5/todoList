import pandas
import sqlite3

def createConnetion(db):
    """ 
    Create connection to the database file
    :param db: Path to the database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db)
    except Exception as e:
        print(e)
    return conn

def queryTodo(conn):
    """
    Query the todo list
    :param conn: the Connection object
    :return:
    """
    todoList = []
    cur = conn.cursor()
    cur.execute("SELECT * FROM `todo`")
    rows = cur.fetchall()
    for row in rows :
        row = {
            "id": f"{row[0]}",
            "item": f"{row[2]}",
            "description": f"{row[3]}"
        }
        todoList.append(row)
    return todoList

async def insertRecord(conn, title: str, description: str):
    """
    Insert a new record into the todo list
    :param conn: Connection object to the database
    :param title: The title attribute
    :param description: The description attribute
    """
    sql_insert_row = """INSERT INTO `todo` (user_id, title, description)
                        VALUES(?, ?, ?)
                        """ 
    cur = conn.cursor()
    try:
        cur.execute(sql_insert_row, (0, title, description))
        conn.commit()
    except Exception as e:
        print(e)

async def deleteRecord(conn, id: int) -> bool:
    """
    Delete a record by the given id
    :param conn: Connection object to the database
    :param id: Selected id
    """
    sql_delete_record = """DELETE FROM `todo` WHERE id=?"""
    cur = conn.cursor()
    try:
        cur.execute(sql_delete_record, (id, ))
        conn.commit()
    except Exception as e:
        print(e)
