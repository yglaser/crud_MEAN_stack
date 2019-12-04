const contactCtrl = {};
const mailcompania = 'fjfmailer@gmail.com';
const pass1 = 'Fjfmailer1234';
const toformangular = 'yaninaglaser@gmail.com';
const asuntoangular = 'hola liz';
const textoangular = 'este mail funciona';
const textPrefijado = 'Thank you for visit us, inmediately we send us an anwer.';
const tomimail = 'lizarq4@gmail.com';
contactCtrl.sendMail = async (req,res)=>
{
    
    var enviarmaila = req.body.email1;
    var formulario = req.body; 
    var send = require('gmail-send')({
      user: 'fjfmailer@gmail.com',
      pass: 'Fjfmailer1234',
      to:   enviarmaila,
      subject: 'form contact send',
      text:    textPrefijado ,
      //html:    '<b>html text</b>'            // HTML
    });
   
    send();

    res.json('send mail');
}

contactCtrl.getContact = (req,res)=>{
    res.send('request get');   
}







module.exports= contactCtrl;
