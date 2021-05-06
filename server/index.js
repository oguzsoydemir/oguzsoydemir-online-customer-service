const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const PORT = process.env.PORT || 5000;
//const router = require("./router");
//const { createServer, getRoom, removeRoom, insertMessage, createRoom } = require("./ChatRooms");
const mysql = require("mysql");
const router = express.Router();
const io = require("socket.io")(http, { wsEngine: "ws" });
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "chat",
});

db.connect((err) =>
  err ? console.log(err) : console.log("db bağlantısı gerçekleşti")
);

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use("/", router);
app.get("/", (request, response) => {
  response.send("Server açık ve çalışmaya devam ediyor");
});

app.get("/admin/select", (req, res) => {
  const { name, password } = req.query;
  const select_admin = `SELECT * FROM ADMIN WHERE NAME='${name}' AND PASSWORD=${password}`;
  db.query(select_admin, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      {
        return res.json({ data: result });
      }
    }
  });
});

getRoom = ({ socketID }, callback) => {
  const select_room = `SELECT * FROM ROOM WHERE SOCKETID='${socket.id}'`;
  db.query(select_room, (err, result) => {
    if (err) throw err;
    return callback(result[0]);
  });
};

getUser = (query, callback) => {
  //const select_user = `SELECT * FROM USER WHERE NAME='${name}' AND SURNAME='${surname}' AND EMAIL='${email}'`;
  db.query(query, (err, result) => {
    if (err) throw err;
    return callback(result[0]);
  });
};

getRooms = (query, callback) => {
  db.query(query, (err, result) => {
    if (err) throw err;
    return callback(result);
  });
};

io.on("connection", (socket) => {
  socket.on("join", ({ name, surname, email, title }, callback) => {
    const insert_room = `INSERT INTO ROOM (SOCKETID, ROOMID, DATE, TITLE, ISACTIVE, ISADMIN) VALUES ('${socket.id}', UUID(), NOW(), '${title}', TRUE, FALSE)`;
    db.query(insert_room, (err, result) => {
      if (err) {
        console.log("Error: " + err);
      }

      const select_room = `SELECT * FROM ROOM WHERE SOCKETID='${socket.id}'`;
      db.query(select_room, (err, dbRoom) => {
        if (err) {
          console.log(err);
        }
        socket.join(dbRoom[0].roomID);
        const insert_user = `INSERT INTO USER (NAME, SURNAME, EMAIL) VALUES ('${name}', '${surname}', '${email}')`;
        db.query(insert_user, (err, insertUser) => {
          if (err) {
            console.log(err);
          }
          const select_user = `SELECT * FROM USER WHERE NAME='${name}' AND SURNAME='${surname}' AND EMAIL='${email}' ORDER BY USERID DESC`;
          db.query(select_user, (err, dbUser) => {
            if (err) {
              console.log(err);
            }
            const insert_user_socket = `INSERT INTO USER_SOCKET (USERID, SOCKETID) VALUES (${dbUser[0].userID}, '${dbRoom[0].socketID}')`;
            db.query(insert_user_socket, (err, insertUserSocket) => {
              if (err) {
                return callback(error);
              }

              socket.join(dbRoom[0].roomID);
              socket.emit("room", dbRoom[0].roomID);

              socket.emit("message", {
                user: "admin",
                text: `${name} ${surname} hoşgeldiniz.`,
              });
              updateRoomList();
              callback();
            });
          });
        });
      });
    });
  });

  socket.on("adminJoin", ({ adminID }, callback) => {
    const select_admin_socket = `SELECT * FROM ADMIN_SOCKET WHERE ADMINID=${adminID}`;
    db.query(
      select_admin_socket,
      (errSelectAdminSocket, selectAdminSocketResult) => {
        if (errSelectAdminSocket) console.log("126",errSelectAdminSocket);
        
        if (!selectAdminSocketResult) {
          const update_admin_socket = `UPDATE ADMIN_SOCKET SET SOCKETID="${socket.id}" WHERE ADMINID=${adminID}`;

          for (let index = 0; index < selectAdminSocketResult.length; index++) {
            var update_message_sender_socketid = `UPDATE MESSAGES SET SENDERSOCKETID="${socket.id}" WHERE SENDERSOCKETID="${selectAdminSocketResult[index].socketID}"`;
            db.query(
              update_admin_socket,
              (errUpdateMessage, resultUpdateMessage) => {
                if (errUpdateMessage) console.log(errUpdateMessage);
              }
            );
          }

          db.query(
            update_message_sender_socketid,
            (errUpdateAdminSocket, resultUpdateAdminSocket) => {
              if (errUpdateAdminSocket) console.log(errUpdateAdminSocket);
            }
          );
        } else {
          const insert_admin_socket = `INSERT INTO ADMIN_SOCKET(ADMINID,SOCKETID) VALUES (${adminID},"${socket.id}")`;
          db.query(
            insert_admin_socket,
            (errInsertAdminSocket, resultInsertAdminSocket) => {
              if (errInsertAdminSocket) console.log(errInsertAdminSocket);
            }
          );
        }
      }
    );

    const insert_admin_socket = `INSERT INTO ADMIN_SOCKET(ADMINID,SOCKETID) VALUES(${adminID},'${socket.id}')`;
    db.query(insert_admin_socket, (err, sonuc) => {
      /*console.log(insert_admin_socket);
      console.log(sonuc);*/
      if (err) console.log(err);
      updateRoomList();
    });

    callback();
  });

  updateRoomList = () => {
    const select_active_room = `SELECT * FROM ROOM
    INNER JOIN USER_SOCKET ON ROOM.SOCKETID=USER_SOCKET.SOCKETID
    INNER JOIN USER ON USER.USERID=USER_SOCKET.USERID 
    WHERE ROOM.ISACTIVE=TRUE AND ISADMIN=FALSE
    ORDER BY ROOM.DATE DESC`;
    db.query(select_active_room, (errActiveRooms, resultActiveRooms) => {
      if (errActiveRooms) console.log(errActiveRooms);
      for (let index = 0; index < resultActiveRooms.length; index++) {
        const inser_room_admin = `INSERT INTO ROOM (SOCKETID, ROOMID, DATE, TITLE, ISACTIVE, ISADMIN) VALUES ('${socket.id}', '${resultActiveRooms[index].roomID}', NOW(), '${resultActiveRooms[index].title}', TRUE, TRUE)`;
        db.query(inser_room_admin);
        socket.join(resultActiveRooms[index].roomID);
      }
      socket.emit("getRooms", { rooms: resultActiveRooms });
    });
  };

  socket.on("selectRoom", (oda, callback) => {
    const select_room = `SELECT message as text,name as user
    FROM MESSAGES
    WHERE ROOMID="${oda}"
    GROUP BY (MESSAGE)`;
    //console.log(select_room);
    db.query(select_room, (err, result) => {
      if (err) {
        console.log(err);
      }
      const selectRoomInfo = `SELECT * FROM ROOM WHERE ROOMID="${oda}"`;
      db.query(selectRoomInfo, (err, resultRoom) => {
        if (err) {
          console.log(err);
        }
        //console.log(resultRoom);
        socket.emit("messagesOfRoom", {
          messages: result,
          roomInfo: resultRoom[0],
        });
      });
    });
  });

  socket.on("sendMessage", ({ message, name, roomID }, callback) => {
    console.log("roomID=>", roomID, name, message);
    /*
    io.to(roomID).emit("message", {
      user: name,
      text: message,
    });*/

    const insert_message = `INSERT INTO MESSAGES(MESSAGE, ROOMID, SENDERSOCKETID, NAME, DATE) VALUES ('${message}', '${roomID}', '${socket.id}', '${name}', NOW())`;
    db.query(insert_message, (errIns, insertMessage) => {
      if (errIns) console.log(errIns);
    });
    /*socket.emit("messages", {
      user: name,
      text: message,
      senderRoomID: roomID,
    });*/
    io.to(roomID).emit("message", {
      user: name,
      text: message,
      senderRoomID: roomID,
    });
    callback();
  });

  {
    /*sendToAdmin = (message, roomID, socketID) => {
    const select_message = `SELECT M.MESSAGE AS "MESSAGE",
          M.SENDERSOCKETID AS "SENDERSOCKETID", 
          M.DATE AS  "DATE",
          US.SOCKETID AS "USERSOCKETID",
          U.NAME AS "USERNAME",
          A_S.SOCKETID AS "ADMINSOCKETID",
          A.NAME AS "ADMINNAME"
          FROM MESSAGES AS M
          LEFT JOIN USER_SOCKET AS US ON M.SENDERSOCKETID=US.SOCKETID
          LEFT JOIN ADMIN_SOCKET AS A_S ON M.SENDERSOCKETID=A_S.SOCKETID
          LEFT JOIN ADMIN AS A ON A.ADMINID=A_S.ADMINID
          LEFT JOIN USER AS U ON US.USERID=U.USERID
          LEFT JOIN ROOM AS R ON M.ROOMID=R.ROOMID
          WHERE M.ROOMID="${roomID}"
          GROUP BY (M.MESSAGE)`;
    db.query(select_message, (errSelectMessage, selectMessageResult) => {
      if (errSelectMessage) console.log(errSelectMessage);
      socket.emit("adminMessage", {
        message: selectMessageResult,
      });

      /*io.to(roomID).emit("message", {
              user: selectMessageResult[0].ADMINNAME,
              text: message,
            });
    });
  };

   socket.on("sendAdminMessage", ({ roomID, message }, callback) => {
    const insert_message = `INSERT INTO MESSAGES(MESSAGE, ROOMID, SENDERSOCKETID, DATE) VALUES ('${message}', '${roomID}', '${socket.id}', NOW())`;

    db.query(insert_message, (err, resultInserRoom) => {
      if (err) console.log(err);
      const select_message = `SELECT M.MESSAGE AS "MESSAGE",M.SENDERSOCKETID AS "SENDERSOCKETID", 
      M.DATE AS  "DATE",US.SOCKETID AS "USERSOCKETID",U.NAME AS "USERNAME",
      A_S.SOCKETID AS "ADMINSOCKETID",A.NAME AS "ADMINNAME"
      FROM MESSAGES AS M
      LEFT JOIN USER_SOCKET AS US ON M.SENDERSOCKETID=US.SOCKETID
      LEFT JOIN ADMIN_SOCKET AS A_S ON M.SENDERSOCKETID=A_S.SOCKETID
      LEFT JOIN ADMIN AS A ON A.ADMINID=A_S.ADMINID
      LEFT JOIN USER AS U ON US.USERID=U.USERID
      LEFT JOIN ROOM AS R ON M.ROOMID=R.ROOMID
      WHERE M.ROOMID="${roomID}"
      GROUP BY (M.MESSAGE)`;
      db.query(select_message, (errSelectMessage, selectMessageResult) => {
        if (err) console.log(errSelectMessage);
        socket.emit("adminMessage", {
          message: selectMessageResult,
        });
        io.to(roomID).emit("message", {
          user: selectMessageResult[0].ADMINNAME,
          text: message,
        });
      });
      callback();
    });
  });
*/
  }

  socket.on("disconnect", () => {
    const dc_room = `UPDATE ROOM SET ISACTIVE=FALSE WHERE ISACTIVE=TRUE AND SOCKETID="${socket.id}"`;
    db.query(dc_room, (errDC, resultDC) => {
      if (errDC) console.log(errDC);
    });
  });
});

http.listen(PORT, () =>
  console.log(`Sunucu ${PORT} nolu portta çalışmaya başladı.`)
);
