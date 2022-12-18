const PostModel = require('../Models/PostModel.js');

class PostController {

    // criação de posts
    async create(req, res) {
        try {
        const { username, titulo, texto } = req.body;

        if (!username || !titulo || !texto) {
            return res.status(400).json({ message: "Usuario, título e corpo do post são obrigatórios"});
        }
        
        const createdPost = await PostModel.create(req.body)    

        return res.status(200).json(createdPost);
        } catch (error) {
        return res.status(404).json({ message: "Falha ao criar post"});
        }
    }

    // listagem de todos os posts
    async index(req, res) {
        try {
        const posts = await PostModel.find();

        return res.status(200).json({ posts });
        } catch (error) {
            return res.status(404).json({ message: "Falha ao listar posts"});
        }
    }

    // mostrar um post especifico
    async show(req, res) {
        try {
        const { id } = req.params;
        
        const post = await PostModel.findById(id);

        if(!post) {
            return res.status(404).json({ message: "Post não existe"});
        }
        
        return res.status(200).json(post);
        
        } catch (error) {
        return res.status(404).json({ message: "Falha ao encontrar post"})
        }
    }

    // atualização de posts
    async update(req, res) {
        try {
            const { id } = req.params;

            await PostModel.findByIdAndUpdate(id, req.body);

            return res.status(200).json({ message: "Post atualizado"});
        } catch (error) {
            return res.status(404).json({ message: "Falha ao atualizar post"});
        }
    } 

    // exclusão de posts
    async destroy (req, res) {
        try {
            const { id } = req.params;

            const postDeleted = await PostModel.findByIdAndDelete(id);

            if(!postDeleted){
                return res.status(404).json({ message: "Post não existe"});
            }

            return res.status(200).json({ message: "Post deletado"});
        } catch (error) {
            return res.status(404).json({ message: "Falha ao deletar post"});
        }
    }

}

module.exports = new PostController();