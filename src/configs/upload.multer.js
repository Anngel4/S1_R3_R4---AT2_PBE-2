import multer from "multer"; // modulo que vou utilizar para manipular os arquivos que vou enviar
import path from 'path'; // bibliotéca que trabalha com a resolução de caminhos
import crypto from 'crypto'; // vou utilizar para gerar uma numeração extranumeral
import fs from 'fs'; // cria, edita, etc diretórios

const baseUploadDir = path.resolve(process.cwd(), 'uploads');

const verificaDir = (dir) => {
    if (!fs.existsSync(dir)) { // Aqui verifica se o diretório NÃO existe
        fs.mkdirSync(dir, { recursive: true }); // Se não existe, vai criar ele
    }
}

const createMulter = ({ pasta, tiposPermitidos, tamanhoArquivo }) => {
    const pastaFinal = path.join(baseUploadDir, pasta);
    verificaDir(pastaFinal);
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pastaFinal)
        },
        filename: (req, file, cb) => {
            const hash = crypto.randomBytes(12).toString('hex'); // Vai gerar um hash extradecimal
            cb(null, `${hash}-${file.originalname}`);
        }
    });
    const fileFilter = (req, file, cb) => {
        if (!tiposPermitidos.includes(file.mimetype)) {
            return cb(new Error("Tipo de arquivo não permitido"));
        }
        cb(null, true);
    }

    return multer({
        storage,
        limits: { tamanhoArquivo },
        fileFilter
    })
}

export default createMulter;