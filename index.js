const { MTProto } = require('telegram-mtproto');

const inquirer = require('inquirer')
const question = {
  type: 'input',
  name: 'twoFA',
  message: 'Enter your 2FA code',
}

const phone = {
  num:   , // basically it is your phone number
}

const client = MTProto({})

async function connect() {
  const { phone_code_hash } = await client('auth.sendCode', {
    phone_number: phone.num,
    current_number: false,
    api_id:  , // obtain your api_id from telegram
    api_hash:  // obtain api_hash from telegram
  })
  const { twoFA } = await inquirer.prompt(question);   // type your 2FA code in console

  const { user } = await client('auth.signIn', {
    phone_number: phone.num,
    phone_code_hash: phone_code_hash,
    phone_code: twoFA
  })

  console.log(client.on('dialogFilter', data => console.log(data)));
  console.log(client.on('messages.getDialogFilters', data => console.log(data)));
  console.log(client.on('updates', data => console.log(data)));
}

connect();

