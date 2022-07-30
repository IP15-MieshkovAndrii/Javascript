
const getRate = (req, res) => {
    const rate = {
        'tags': "rate",
        'summary': "Отримати поточний курс BTC до UAH",
        'description': "Запит має повертати поточний курс BTC до UAH використовуючи будь-який third party сервіс з публічним АРІ",
        'operationId': "rate",
        'produces':"application/json",
        'responses': {
            "200":{
            'description': "Повертається актуальний курс BTC до UAH",
            'schema' :{
                'type': "number",
            },
          },
          "400":
            {'description': "Invalid status value"},
        }}  
    res.send(rate)
}

module.exports = getRate;