import multer from "multer";
import path from "path";

const upload = multer({
    storage: multer.diskStorage({}),

    fileFilter: (req: any, file: any, callback: any) => {

        const extension = path.extname(file.originalname).toLowerCase();
        
        if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
            callback(new Error('file not supported'), false);
            return;
        }
        callback(null, true);
    }
    

});


export {upload}