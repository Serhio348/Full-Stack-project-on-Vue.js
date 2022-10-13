const express = require("express"); // подключение express
const app = express(); // создание объекта приложения
const path = require("path"); /// подключение модуля path в node.js для корректной работы с путями
const {v4}=require('uuid') //// подключение библиатеки генерирования id

let CONTACTS = [
  { id: v4(), name: "Serhio", value: "+375292430550", marked: false },
];

app.use(express.json())

//GET
app.get("/api/contacts", (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS);
  }, 1000);
});
//POST
app.post("/api/contacts",(req,res)=>{
const contact = {...req.body,id:v4(),marked:false}
CONTACTS.push(contact)
res.status(201).json(contact)
})

//DELETE

app.delete('/api/contacts/:id',(req,res)=>{
CONTACTS = CONTACTS.filter(c=>c.id!==req.params.id)
res.status(200).json({message:'Contact were delete'})
})

//PUT

app.put('/api/contacts/:id',(req,res)=>{
    const idx=CONTACTS.findIndex(c=>c.id===req.params.id)
    CONTACTS[idx]=req.body
    res.json(CONTACTS[idx])
})



app.use(express.static(path.resolve(__dirname, "client"))); /// добавляем новый middleware к объекту, котрый откроет нашу папку client (client становится статической)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.js"));
});

app.listen(3000, () => console.log("Server has been started on port 3000...")); // запуск данного сервера при помощи метода listen где первый параметр -
// - порт на котором запускается сервер
