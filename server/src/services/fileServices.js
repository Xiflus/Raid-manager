import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";

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
		if (!file || !file.data) {
			throw new Error("No se ha recibido ningún archivo o el archivo está vacío");
		}

		// Creamos un objeto de tipo Sharp con la imagen recibida. Para crear la imagen tipo Sharp
		// es necesario pasarle a Sharp el buffer de datos que estará en la propiedad "data" del archivo
		// en cuestión.
		console.log("Procesando el archivo...");
		const sharpFile = sharp(file.data);

		//redimension imagen
		sharpFile.resize(width);

		console.log(sharpFile);

		//generamos nombre
		const fileName = `${crypto.randomUUID()}.png`;

		console.log(fileName);

		//ruta de almacenamiento
		const filePath = path.join(uploadsDir, fileName);

		console.log(filePath);

		//guardamos en carpeta de subida
		await sharpFile.toFile(filePath);

		console.log("Archivo guardado correctamente", sharpFile);
		console.log("File name en fileServices", fileName);

		//return nombre del archivo
		return fileName;
	} catch (err) {
		console.log("Error en save file...", err);
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
		console.log("Error en deleteFile...", err);
		deleteFileError();
	}
};
