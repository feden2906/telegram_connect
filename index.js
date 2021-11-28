const { MTProto } = require('telegram-mtproto');
require('dotenv');
const inquirer = require('inquirer')
const question = {
  type: 'input',
  name: 'twoFA',
  message: 'Enter your 2FA code',
}

const config = {
  number: process.env.PHONE,                              // basically it is your phone number
  api_id: process.env.API_ID,                             // obtain your api_id from telegram
  api_hash: process.env.API_HASH                          // obtain api_hash from telegram
}

const client = MTProto({})

async function connect() {
  const { phone_code_hash } = await client('auth.sendCode', {
    phone_number: config.number,
    current_number: false,
    api_id: config.api_id,
    api_hash: config.api_hash
  })
  const { twoFA } = await inquirer.prompt(question);      // type your 2FA code in console

  const { user } = await client('auth.signIn', {
    phone_number: config.number,
    phone_code_hash: phone_code_hash,
    phone_code: twoFA
  })

  // console.log(client.on('dialogFilter', data => console.log(data)));
  // console.log(client.on('messages.getDialogFilters', data => console.log(data)));
  // console.log(client.on('updates', data => console.log(data)));
}

connect();
