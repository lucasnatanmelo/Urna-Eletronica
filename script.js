
//Atribuição de variáveis - Controles de interface
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

//Variáveis para controle de ambiente

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];


function comecarEtapa(){

    //Define a etapa atual
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    //Irá mostrar a interaface para inserir os números

    for(let i=0; i<etapa.numeros;i++){
        if(i === 0){
            numeroHTML += '<div class= "numero pisca"></div>';    
        }else{
            numeroHTML += '<div class= "numero"></div>';
        }
        
    }

    //Define o título do que será votado
    cargo.innerHTML = etapa.titulo;

    //Irá definir os itens como apagados ou aparecendo
    seuVotoPara.style.display = 'none';
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    
    //Retorna para numeros o seu valor 
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){ //Verifica a característica do tamanho da imagem
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            } else{
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            }
            
        }
        lateral.innerHTML = fotosHtml
    } else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`;
    }

    console.log("Candidato", candidato);
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`; //Adiciona n digitado ao número

        elNumero.classList.remove('pisca');
        //Irá atribuir a função pisca para o elemento seguinte
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else{
            atualizaInterface();
        }
    }
    
}
function branco(){
    if(numero === ''){ //Verifica se o número está vazio para votar em branco
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`;
    } else{
        alert("Para votar em BRANCO, não poderá ser digitado nenhum número");
    }
}
function corrige(){
    comecarEtapa();
}
function confirma(){
    console.log("Apertou confirma")
    let etapa = etapas[etapaAtual];

    let votoConfirmado  = false;
    
    if(votoBranco === true){
        votoConfirmado = true;
        console.log("Confirmando como BRANCO...");
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        console.log(`Candidato ${numero} não existente!`);
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }
    if(votoConfirmado === true){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
            console.log("chegou ate aqui")
        } else{
            document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM</div>`;;
            console.log("FIM");
            console.log(votos);
        }
    }
}

comecarEtapa();