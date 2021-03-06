const express = require('express')
const bodyParser = require('body-parser')
.urlencoded({extended:false}); 
const app = express();
app.set('view engine','ejs')
app.use(bodyParser)

const { 
    Singer, 
    avatarLink, 
    profileLink, 
    listSinger 
} = require('./model/Singer')

app.get('/',(req,res)=>{
    res.render('home', { listSinger, avatarLink, profileLink });
})

app.get('/add-singer',(req,res)=>{
    res.render('add-singer');
})
app.post('/add-singer',(req,res)=>{
    // const txtName = req.body.name;
    const { name, link, avatar } = req.body
    const id =  Math.floor(Math.random() * 100)
    const singer = new Singer(id, name, link, avatar)
    listSinger.unshift(singer);
    res.redirect('/')
})
app.get('/update/:id',(req,res)=>{
    //find singer by id
    // const id = req.param('id')
    const id = +req.params.id
    const singer = listSinger.find(singer=>singer.id===id)
    if(!singer) {
        return res.send({error: 'Cannot find singer!'})
    }
    res.render('update',{singer})
})
app.post('/update',(req,res)=>{
    const { id, name, link, avatar } = req.body
    const singer = listSinger.find(singer=>singer.id==id)
    if(!singer) res.send({error:'Cannot find singer!'})

    // singer.name = name;
    // singer.link = link;
    // singer.avatar = avatar;
    singer.updateData(name,link,avatar);
    res.redirect('/');
})
app.get('/delete/:id',(req,res)=>{
    const id = req.params.id
    const index = listSinger.findIndex(singer=> singer.id==id)
    if(index<0) res.send({error:'Cannot find singer!'})
    listSinger.splice(index,1);
    res.redirect('/');

})

app.listen(3000);