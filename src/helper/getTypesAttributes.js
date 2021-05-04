import axios from 'axios';

export default async (type1, type2) => {

    const pokeApiUrl = "https://pokeapi.co/api/v2/type/";
    let counter = 0;
    let currentType = "";
    let typesAttributesPromises = [];
    let typesAttributes = [];
    
    do{
        counter === 0 ? currentType = type1 : currentType = type2;
        
        typesAttributesPromises.push(
            await axios.get(`${pokeApiUrl}${currentType}`)
                .then(response => response.data)
                .catch(error => {
                    console.log(`Ocorreu um erro ao buscas as informações do tipo ${currentType}...: ${error}`);
                })
        );
        
        counter++;
    }while(type2 && counter === 1);

    await Promise.all(typesAttributesPromises)
        .then(currentTypeAttributes => {
            typesAttributes.push(currentTypeAttributes)
        })
        .catch(error => {
            console.log(`Ocorreu um erro ao tentar resolver a promise...: ${error}`);
        });

    return typesAttributes[0];
}