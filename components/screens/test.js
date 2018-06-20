fetch('http://localhost:8000/api/media', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTI5NDMzNDkxLCJqdGkiOiI4MDIzNTBjYjI1N2I0Y2I5OWIxZGRiN2Y5ZGFiNmI2NyIsInVzZXJfaWQiOjF9.gg-sfRAkLtoUPOkfQdwkLEzuIPdmZEtHHHtBA8cIj5w'
  },
  body: JSON.stringify({
    "filename": "test",
    "mediatype": "test",
    "uri": "test"
  })
})
.then(res => res.json())
  .catch(err => console.log(err))
// .then(res => console.log(res))
.then(data => console.log(data))
