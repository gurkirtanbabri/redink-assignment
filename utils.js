import mailjet from 'node-mailjet'


const  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validater = (req, next, validate) => {

  const errors = []

  validate.forEach(({ key, tester, message }) => {

    if (tester) {
      const error = tester(req.body[key])

      if (error) {

        errors.push({
          key,
          message: error
        })

        return
      }
    }
 
    if (!req.body[key]) {

      errors.push({
        key,
        message: message || `please provide ${key}`
      })
    }
    
  })

  req.errors = errors

  next()
}

export const validateEmail = (email) => {
  if (!email) {
    return 'Please provide email'
  }

  if(!emailRegex.test(email)) {
    return 'pease provide valid email'
  }

  return false
}       

export const sendEmail = async (emails, subject, text) => {

  
  const mail  = mailjet
  .connect(process.env.MAIL_API1, process.env.MAIL_API2)
  const request = mail
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "gurkirtans10@gmail.com",
          "Name": "gurkirtan"
        },
        "To": emails.map((email) => ({
            "Email": email,
            "Name": "gurkirtan"
          
        })),
        "Subject": subject,
        "TextPart": text,
        "HTMLPart": `<h3>  ${text} </h3>`,
        "CustomID": "AppGettingStartedTest"
      }
    ]
  })
  request
    .then((result) => {
      console.log('mail sent')
    })
    .catch((err) => {
      console.log(err)
    })
  
}