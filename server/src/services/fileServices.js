import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

import { UPLOADS_DIR } from "../../env.js";

import { deleteFileError, saveFileError } from "./errorService.js";

export const saveFile = async (file, width) => {
	try {
		// Ruta absoluta al directorio de subida de archivos.
		const uploadsDir = path.join(process.cwd(), UPLOADS_DIR);
		try {
			// Creamos la carpeta de subida de archivos si no existe con la ayuda del método "access".
			await fs.access(uploadsDir);
		} catch {
			// Si el método anterior lanza un error quiere decir que el directorio no existe.
			// En ese caso entraríamos en el catch y lo crearíamos.
			await fs.mkdir(uploadsDir);
		}
		// Creamos un objeto de tipo Sharp con la imagen recibida. Para crear la imagen tipo Sharp
		// es necesario pasarle a Sharp el buffer de datos que estará en la propiedad "data" del archivo
		// en cuestión.
		const sharpFile = sharp(file.data);

		//redimension imagen
		sharpFile.resize(width);

		//generamos nombre
		const fileName = `${crypto.randomUUID()}.png`;

		//ruta de almacenamiento
		const filePath = path.join(uploadsDir, fileName);

		//guardamos en carpeta de subida
		await sharpImg.toFile(filePath);

		//return nombre del archivo
		return fileName;
	} catch (err) {
		console.log(err);
		saveFileError();
	}
};

export const deleteFile = async (fileName) => {
	try {
		const filePath = path.join(process.cwd(), UPLOADS_DIR, fileName);

		try {
			await fs.access(filePath);
		} catch {
			return;
		}

		//Eliminamos el fichero
		await fs.unlink(filePath);
	} catch (err) {
		console.log(err);
		deleteFileError();
	}
};
