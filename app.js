const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

let certificates = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Certificate.html'));
});

app.get('/issue', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Cpage2.html'));
});


app.post('/submit', (req, res) => {
    const { certificateID,courseName, candidateName, grade, date } = req.body;

    certificates.push({ certificateID, courseName, candidateName, grade, date });

    res.redirect('/thank-you');
});

app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.get('/certificate', (req,res) => {
    res.json(certificates);
})

app.get("/certificate/:id", (req, res) => {
  const id = req.params.id;
  const certificate = certificates.find((cert) => cert.certificateID == id);
  if (!certificate) {
    return res.status(404).send("Certificate not found");
  }

  res.sendFile(path.join(__dirname, 'public', 'Cpage3.html'));
  
});

app.get('/api/certificate/:id', (req, res) => {
    const id = req.params.id;
    const certificate = certificates.find(cert => cert.certificateID == id);
    if (!certificate) {
        return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(certificate);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});