import users from '../api/users.js'
import files from '../api/files.js'

export function initializeRoutes(app)  {
    app.use((req, res, next) => {
        console.log('Запрос к апи по пути: ', req.path);
        next();
    });

    app.use(files);
    app.use(users);

    app.use((err, req, res, next) => {
        if(err){
          console.log('Возникла ошибка: ', err.message);
          return res.status(500).json({ message: err.message });
        }
        console.log('Необработанная ошибка: ', err.message);
        return res.status(500).json({ message: err.message });
    });
}