const express = require('express');

const server = express();

server.use(express.json());

const cursos =[ 'nodejs', 'reactjs','html'];

server.use((req,res,next)=>{ 
    console.log(`url chamada: ${req.url}`);

    return next();
});

function checkCurso(req,res,next){
    if(!req.body.nome){
        return res.status(400).json({error: "Nome do curso é obrigatório"})
    };

    return next();

};

function checkIndex(req,res,next){
    const curso = cursos[req.params.index];
    if(!curso){
        return res.status(400).json({error: "Não foi possível localizar esse endereço."})
    };
    return next();
}


server.get ('/cursos',(req, res)=>{
    return res.json(cursos);
})


server.get('/cursos/:index', checkIndex,(req, res)=>{

    const {index} = req.params;

    return res.json(cursos[index]);
});

//criando um novo curso
server.post('/cursos', checkCurso,(req,res)=>{
    const {nome} = req.body;
    cursos.push(nome);

    return res.json(cursos);
});

//atualizando um curso
server.put('/cursos/:index', checkCurso, checkIndex,(req,res)=>{
    const {index} = req.params;
    const{nome} = req.body;

    cursos [index] = nome;

    return res.json(cursos);
});

//excluindo um curso

server.delete('/cursos/:index', checkIndex, (req,res)=>{
    const {index} = req.params; 
    cursos.splice(index, 1);

    res.json(cursos);

});

server.listen(3000);

