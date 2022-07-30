
const addMail = (req, res) => {
    const mail = {
        'tags':"subscription",
        'summary': "Підписати емейл на отримання поточного курсу",
        'description': "Запит має перевірити, чи немає данної електронної адреси в поточній базі даних (файловій) і, в разі її відсутності, записувати її. Пізніше, за допомогою іншого запиту ми будемо відправляти лист на ті електронні адреси, які будуть в цій базі. ",
        'operationId': "subscribe",
        'consumes':"application/x-www-form-urlencoded",
        'produces':"application/json",
        'parameters':{
            'name': "email",
            'in': "formData",
            'description': "Електронна адреса, яку потрібно підписати",
            'required': true,
            'type': "string",
        },
        'responses':{
            '200': {'description': "E-mail додано"},
            
            '409':{'description': "Повертати, якщо e-mail вже є в базі даних (файловій)"}
        }
}
    res.send(mail)
}

module.exports = {
    addMail,
};