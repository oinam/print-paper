import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(join(__dirname, 'public')));

// Rather than delivering a 404, any unknown path delivers the index.html
// file. That works well with our single page app.
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => console.log(`Listening on port ${port}!`));