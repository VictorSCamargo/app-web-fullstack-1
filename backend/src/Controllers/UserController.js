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
          if (user.password === password) {
            return res.status(200).json(user);
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

          return res.status(200).json(createdUser);
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
      const { username, password } = req;

      let doc = await UserModel.findOneAndUpdate({ username : username }, { password: password }, {
        new: true
      });
      console.log(doc)

      return res.status(200).json({ message: "Usuario atualizado"});
    } catch (error) {
      return res.status(404).json({ message: "Falha ao atualizar usuario"});
    }
  
  }

  //deletar um usuario
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