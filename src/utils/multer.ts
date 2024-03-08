import multer from "multer";
import path from "path";

const storage = multer.diskStorage({})

const fileFilter =  (req: any, file: any, callback: any) => {

    const extension = path.extname(file.originalname).toLowerCase();
    
    if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
         callback(false,('file not supported' ));
        return;
    }
    callback(null, true);
}

const upload = multer({
    storage,
    fileFilter
});


export {upload}