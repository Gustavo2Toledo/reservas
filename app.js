const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/reservas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado no banco 'reservas'"))
  .catch(err => console.error("Erro ao conectar no MongoDB", err));

const UserSchema = new mongoose.Schema({
    nome: String,
    email: { type: String, unique: true },
    senha: String
});
const User = mongoose.model('User', UserSchema);

const autenticar = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: "Acesso negado" });
    
    jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(400).json({ error: "Token inválido" });
        req.user = decoded;
        next();
    });
};

const SalaSchema = new mongoose.Schema({
    nome: String,
    capacidade: Number
});
const Sala = mongoose.model('Sala', SalaSchema);

const ReservaSchema = new mongoose.Schema({
    sala: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala' },
    coordenador: String,
    data: Date
});
const Reserva = mongoose.model('Reserva', ReservaSchema);

app.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    
    try {
        const user = new User({ nome, email, senha: senhaHash });
        await user.save();
        res.status(201).json({ message: "Usuário registrado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
        return res.status(400).json({ error: "Credenciais inválidas" });
    }
    const token = jwt.sign({ id: user._id, nome: user.nome }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.post('/salas', autenticar, async (req, res) => {
    try {
        const sala = new Sala(req.body);
        await sala.save();
        res.status(201).json(sala);
    } catch (error) {
        res.status(400).json({ error: "Sala já existe!"});
    }
});

app.get('/reservas', autenticar, async (req, res) => {
    res.json(await Reserva.find().populate('sala'));
});

app.post('/reservas', autenticar, async (req, res) => {
    const { sala, coordenador, data } = req.body;
    if (await Reserva.findOne({ sala, data })) {
        return res.status(400).json({ error: "Sala já reservada" });
    }
    try {
        const reserva = new Reserva({ sala, coordenador, data });
        await reserva.save();
        res.status(201).json(reserva);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/reservas/:id', autenticar, async (req, res) => {
    try {
        await Reserva.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));