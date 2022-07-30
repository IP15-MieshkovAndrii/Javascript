const createPath = require('../helpers/create-path')
const fs = require('fs');

const getAddMail = (req, res) => {
    const title = 'Subscription';
    res.render(createPath('subscription'), { title });
}

const addMail = (req, res) => {
    //post
    const email = req.body.title;
    const mail = {
        email,
    }
    
    if(mail.email == ''){
        const title = 'Error Page';
        res
            .status(404)
            .render(createPath('error'), {title});
    }
    else{
        const title = 'Mail';
        const path = 'base.json'
        let mails = [];
        try {
          if (fs.existsSync(path)) {
            mails = JSON.parse(fs.readFileSync(path));
            console.log(mails);
            console.log(mail.email);
          }
          const result = mails.find(({ email }) => email === mail.email)
        console.log(result);
          if(!result){
            mails.push(mail);
            fs.writeFile(path, JSON.stringify(mails), (err)=>{
                if(err) console.log(err)
                else console.log('File saved')
                });
            res.render(createPath('mail'), { mail, title })
          } else{
            res
              .status(409)
              .render(createPath('error409'), { title })
          }
          
        } catch(err) {
          console.error(err)
        }
    }
}


module.exports = {
    getAddMail,
    addMail,
};