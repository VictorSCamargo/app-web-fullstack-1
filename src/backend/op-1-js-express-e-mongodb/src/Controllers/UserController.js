const UserModel = require('../Models/UserModel.js');

class UserController {

  async verifyUser(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(404).json({ message: "Dados de cadastro incorretos"});
      }

      UserModel.findOne({ username : username }, function (err, user) {

        if(user) {
          console.log(user)
          if (user.password === password) {
            return res.status(200).json(user);
          }
          else {
            return res.status(400).json({ message: "Senha incorreta" });
          }
        }
        else {
          return res.status(404).json({ message: "Usuario nao encontrado na base" })
        }
        
      });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao encontrar usuario"})
    }
  }

  //criar usuarios
  async create(req, res) {

    try {
      const { username, password } = req.body;

      UserModel.findOne({ username : username }, async function (err, user) {

        if(!user) {
          const createdUser = await UserModel.create(req.body);

          return res.status(201).json(createdUser);
        }
        else {
          return res.status(400).json({ message: "Usuario com esse nome ja existe"});
        }

      });
      
    } catch (error) {
      return res.status(404).json({ message: "Falha ao criar usuario"});
    }
  }

  //listar usuarios
  async index(req, res) {
    try {
      const users = await UserModel.find();

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao listar usuarios"});
    }
  }

  //mostrar um usuario especifico
  async show(req, res) {
    try {
      const { id } = req.params;
    
      const user = await UserModel.findById(id);

      if(!user) {
        return res.status(404).json({ message: "Usuario nao existe"});
      }

      return res.status(200).json(user);
      
    } catch (error) {
      return res.status(404).json({ message: "Falha ao encontrar usuario"})
    }
  }

  //atualizar um usuario
  async update(req, res) {
    try {
      const { username, password } = req.body;

      let query = { username: username}
      let new_password = { password: password}

      // Conferir se tem um usuario com o nome passado
      UserModel.findOne(query, async function (err, user) {
        if(err) throw err

        // se tiver o usuario, encontrar ele e atualizar a senha
        if(user) {
          await UserModel.updateOne(query, new_password);

          return res.status(200).json({user});
        }
        else {
          return res.status(404).json({ message: "Usuario nao encontrado na base" })
        }     
      });
    } catch (error) {
      return res.status(404).json({ message: "Falha ao atualizar usuario"});
    }
  
  }

  //exclusão de um usuario
  async destroy (req, res) {
    try {
      const { id } = req.params;

      const userDeleted = await UserModel.findByIdAndDelete(id);

      if(!userDeleted){
        return res.status(404).json({ message: "Usuario não existe"});
      }

      return res.status(200).json({ message: "Usuario deletado"});
    
    } catch (error) {
      return res.status(404).json({ message: "Falha ao deletar usuario"});
    }
  }
}

module.exports = new UserController();