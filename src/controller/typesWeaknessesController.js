import { Router } from 'express';
import matchTypesWeaknesses from '../helper/matchTypesWeaknesses.js';

export default() => {
    let api = Router();

// 1) (GET) - Buscando as fraquezas dos tipos http://localhost:{port}/v1/types-weaknesses/{tipo1/tipo2}'
    api.get('/:tipo1/:tipo2?', async (req, res) => {

        const typesWeaknesses = await matchTypesWeaknesses(req.params.tipo1, req.params.tipo2);

        if (req.params.tipo2) {
            res.json(
                {
                    based_types: [
                        {name: `${req.params.tipo1}`},
                        {name: `${req.params.tipo2}`}
                    ],
                    weaknesses: typesWeaknesses
                }
            );
        } else {
            res.json(
                {
                    based_types: [
                        {name: `${req.params.tipo1}`},
                    ],
                    weaknesses: typesWeaknesses
                }
            );
        }
        
    });

    return api;
}